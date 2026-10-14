/**
 * Paste into Extensions > Apps Script in the destination spreadsheet.
 * Data spreadsheet only. Run setupWeddingPlannerData once; authorize access to this spreadsheet.
 * Creates tables and provides the cloud API without login.
 * Existing rows are retained. Incompatible headers abort before any changes.
 */
const WP_COMMON = ['sortOrder', 'updatedAt', 'revision', 'deletedAt'];
const WP_TABLES = {
  Settings: ['brideName', 'groomName', 'weddingDate', 'location', 'currency', 'targetBudget', 'targetGuests', 'venueName'],
  Options: ['id', 'type', 'value', 'active'],
  Timeline: ['id', 'period', 'task', 'deadline', 'assignee', 'priority', 'category', 'completed', 'notes'],
  Rundown: ['id', 'activity', 'startTime', 'endTime', 'location', 'pic', 'vendor', 'notes', 'date'],
  Events: ['id', 'name', 'date', 'time', 'location', 'notes'],
  Packing: ['id', 'name', 'category', 'quantity', 'carrier', 'destination', 'packed', 'notes'],
  Vendors: ['id', 'name', 'category', 'contact', 'social', 'price', 'rating', 'package', 'pros', 'cons', 'status', 'notes'],
  Contacts: ['id', 'name', 'category', 'company', 'phone', 'whatsapp', 'email', 'instagram', 'address', 'notes'],
  Budget: ['id', 'category', 'description', 'vendor', 'budget', 'actualCost', 'paid', 'dueDate', 'status', 'fundSource', 'notes'],
  Guests: ['id', 'name', 'tag', 'side', 'phone', 'guestCount', 'address', 'rsvp', 'table', 'invitationSent', 'souvenirGiven', 'notes'],
  WeddingParty: ['id', 'name', 'role', 'contact', 'attire', 'tasks', 'notes'],
  Venues: ['id', 'name', 'location', 'capacity', 'price', 'type', 'contact', 'facilities', 'pros', 'cons', 'selected', 'notes'],
  FoodDrinks: ['id', 'name', 'category', 'vendor', 'price', 'quantity', 'selected', 'notes'],
  Seating: ['id', 'name', 'capacity'],
  SeatingAssignments: ['id', 'tableId', 'guestId'],
  Photos: ['id', 'shot', 'category', 'priority', 'time', 'location', 'notes', 'completed'],
  Gifts: ['id', 'giver', 'type', 'value', 'dateReceived', 'thankYouSent', 'thankYouDate', 'notes'],
  KUAChecklist: ['id', 'section', 'name', 'checked', 'notes'],
  HoneymoonDestination: ['country', 'city', 'departureDate', 'returnDate', 'currency', 'budget'],
  HoneymoonItinerary: ['id', 'activity', 'date', 'time', 'location', 'cost', 'notes'],
  HoneymoonExpenses: ['id', 'date', 'category', 'description', 'amount'],
  // These structures have no complete active form schema in the app yet.
  // Keep raw JSON for lossless future migration instead of guessing fields.
  CalendarEvents: ['id', 'payloadJson'],
  HoneymoonBookings: ['id', 'bookingType', 'payloadJson'],
  Meta: ['key', 'value']
};
const WP_BOOLEAN = new Set(['active', 'completed', 'packed', 'invitationSent', 'souvenirGiven', 'selected', 'thankYouSent', 'checked']);
const WP_NUMBER = new Set(['targetBudget', 'targetGuests', 'quantity', 'price', 'rating', 'budget', 'actualCost', 'paid', 'guestCount', 'capacity', 'cost', 'amount', 'sortOrder', 'revision']);
const WP_DATE = new Set(['weddingDate', 'deadline', 'date', 'dueDate', 'dateReceived', 'thankYouDate', 'departureDate', 'returnDate']);

// API configuration stores the spreadsheet ID on the server.
function configureWeddingPlannerApi() {
  wpRequireOwner_();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Jalankan dari editor spreadsheet utama.');
  const props = PropertiesService.getScriptProperties();
  props.setProperty('WP_SHEET_ID', ss.getId());
  props.deleteProperty('WP_SALT');
  props.deleteProperty('WP_PASSWORD_HASH');
  const meta = ss.getSheetByName('Meta');
  if (meta) meta.getDataRange().getValues().forEach((row,index) => {
    if (row[0] === 'integrationStatus') meta.getRange(index+1,2).setValue('api_configured');
    if (row[0] === 'setupNote') meta.getRange(index+1,2).setValue('API tanpa login. _State adalah sumber data dan riwayat; tabel modul merupakan proyeksi baca.');
  });
  SpreadsheetApp.getUi().alert('Koneksi Sheet dikonfigurasi tanpa login. Perbarui deployment Web App.');
}



function wpApiRequest(request) {
  if (!request || typeof request !== 'object') throw new Error('Permintaan tidak valid.');
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('WP_SHEET_ID')) throw new Error('Jalankan configureWeddingPlannerApi dahulu.');
  if (!['load','save'].includes(request.action)) throw new Error('Aksi tidak tersedia.');
  const ss = SpreadsheetApp.openById(props.getProperty('WP_SHEET_ID'));
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('Data sedang diproses. Coba lagi.');
  try {
    let state = ss.getSheetByName('_State');
    const revision = state ? Math.max(0, state.getLastRow() - 1) : 0;
    if (request.action === 'load') {
      if (!revision) return { revision: 0, payload: null };
      const row = state.getRange(state.getLastRow(), 1, 1, state.getLastColumn()).getValues()[0];
      const payload = JSON.parse(row.slice(2).join(''));
      return { revision: revision, payload: payload };
    }
    if (request.action !== 'save') throw new Error('Aksi tidak tersedia.');
    if (request.revision !== revision) throw new Error('CONFLICT: Data berubah di sesi lain. Export perubahan Anda lalu muat ulang.');
    const payload = request.payload;
    if (!payload || payload.version !== 1 || !payload.data || !payload.data.settings) throw new Error('Format data tidak valid.');
    const text = JSON.stringify(payload);
    if (text.length > 1500000) throw new Error('Data terlalu besar untuk penyimpanan ini.');
    const modules = wpDataRows_(payload.data); // Validate relationships before committing.
    const chunks = text.match(/[\s\S]{1,30000}/g);
    const next = revision + 1;
    if (!state) {
      state = ss.insertSheet('_State');
      state.getRange(1, 1, 1, 3).setValues([['revision', 'savedAt', 'jsonChunks']]);
    }
    const width = Math.max(state.getMaxColumns(), chunks.length + 2);
    if (state.getMaxColumns() < width) state.insertColumnsAfter(state.getMaxColumns(), width - state.getMaxColumns());
    if (state.getMaxRows() < next + 1) state.insertRowsAfter(state.getMaxRows(), next + 1 - state.getMaxRows());
    const values = [next, new Date().toISOString()].concat(chunks.map(chunk => /^[=+@-]/.test(chunk) ? "'" + chunk : chunk));
    while (values.length < width) values.push('');
    // A single row commit is authoritative; older snapshots remain recoverable.
    state.getRange(next + 1, 1, 1, width).setNumberFormat('@').setValues([values]);
    let warning = '';
    try { wpMirror_(ss, modules, next); } catch (error) { warning = 'Data tersimpan, tetapi tabel tampilan belum lengkap: ' + error.message; }
    return { revision: next, warning: warning };
  } finally { lock.releaseLock(); }
}

function wpMirror_(ss, modules, revision) {
  Object.keys(modules).forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (!sheet) throw new Error('Jalankan setupWeddingPlannerData: tab ' + name + ' belum ada.');
    const fields = wpHeaders_(name);
    const actual = sheet.getRange(1, 1, 1, fields.length).getValues()[0];
    if (JSON.stringify(actual) !== JSON.stringify(fields)) throw new Error('Header ' + name + ' berbeda.');
    const rows = modules[name].map((record, index) => fields.map(field => {
      const value = field === 'revision' ? revision : field === 'sortOrder' ? index + 1 : field === 'updatedAt' ? new Date().toISOString() : record[field] == null ? '' : record[field];
      return typeof value === 'string' && /^[=+@-]/.test(value) ? "'" + value : value;
    }));
    if (sheet.getMaxRows() < rows.length + 1) sheet.insertRowsAfter(sheet.getMaxRows(), rows.length + 1 - sheet.getMaxRows());
    if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, fields.length).clearContent();
    if (rows.length) sheet.getRange(2, 1, rows.length, fields.length).setValues(rows);
  });
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Wedding Planner')
    .addItem('Buat / rapikan template utama', 'setupWeddingPlannerData')
    .addItem('Konfigurasi koneksi Sheet', 'configureWeddingPlannerApi')
    .addToUi();
}

function wpHeaders_(name) {
  return WP_TABLES[name].concat(name === 'Meta' ? [] : WP_COMMON);
}

function setupWeddingPlannerData() {
  wpRequireOwner_();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Jalankan dari Apps Script yang dibuka melalui Google Sheet tujuan.');
  const lock = LockService.getDocumentLock();
  if (!lock || !lock.tryLock(30000)) throw new Error('Template sedang diproses. Coba lagi sebentar.');
  try {
    // Validate every existing table before creating or formatting anything.
    Object.keys(WP_TABLES).forEach(name => {
      const sheet = ss.getSheetByName(name);
      if (!sheet || sheet.getLastRow() === 0) return;
      const expected = wpHeaders_(name);
      const actual = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
        throw new Error('Header tab ' + name + ' berbeda. Tidak ada perubahan dilakukan. Gunakan spreadsheet kosong atau sesuaikan header dahulu.');
      }
    });

    Object.keys(WP_TABLES).forEach(name => {
      const headers = wpHeaders_(name);
      const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
      if (sheet.getMaxRows() < 501) sheet.insertRowsAfter(sheet.getMaxRows(), 501 - sheet.getMaxRows());
      if (sheet.getMaxColumns() < headers.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
      if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, headers.length, 150);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#6B553D').setFontColor('#FFFFFF').setFontWeight('bold')
        .setWrap(true).setVerticalAlignment('middle');
      sheet.setRowHeight(1, 36);
      const rowCount = sheet.getMaxRows() - 1;
      sheet.getRange(2, 1, rowCount, headers.length).setVerticalAlignment('top');
      headers.forEach((field, index) => {
        const range = sheet.getRange(2, index + 1, rowCount, 1);
        let format = '@';
        if (WP_NUMBER.has(field)) format = field === 'rating' ? '0.0' : '#,##0';
        if (WP_DATE.has(field)) format = 'yyyy-mm-dd';
        if (field === 'updatedAt' || field === 'deletedAt') format = 'yyyy-mm-dd hh:mm:ss';
        if (WP_BOOLEAN.has(field)) {
          format = 'General';
          // Validation does not replace existing values (unlike insertCheckboxes).
          range.setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().setAllowInvalid(false).build());
        }
        range.setNumberFormat(format);
        if (['notes', 'pros', 'cons', 'facilities', 'tasks', 'address', 'payloadJson'].includes(field)) {
          range.setWrap(true);
          sheet.setColumnWidth(index + 1, 300);
        }
        const values = wpDropdown_(name, field);
        if (values) range.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(false).build());
        if (['time', 'startTime', 'endTime'].includes(field)) {
          sheet.getRange(1, index + 1).setNote('Teks HH:mm, contoh 09:30; jangan masukkan objek waktu/tanggal.');
        }
        if (field === 'id') sheet.getRange(1, index + 1).setNote('ID permanen. Pertahankan ID dari aplikasi; jangan memakai nomor baris. Untuk record baru, isi ID unik.');
      });
      if (!sheet.getFilter()) sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).createFilter();
    });
    wpSeedMeta_(ss.getSheetByName('Meta'));
    SpreadsheetApp.flush();
    ss.toast('24 tab siap. Template belum berisi data aplikasi dan belum terhubung ke website.', 'Wedding Planner', 10);
  } finally {
    lock.releaseLock();
  }
}

function wpDropdown_(table, field) {
  if (table === 'Options' && field === 'type') return ['guestTags', 'weddingRoles', 'fundSources'];
  if (table === 'KUAChecklist' && field === 'section') return ['persiapanAwal', 'formulirNikah', 'dokumenTambahan', 'pendaftaran'];
  if (table === 'HoneymoonBookings' && field === 'bookingType') return ['flights', 'hotels', 'transport', 'activities', 'restaurants'];
  if (table === 'Timeline' && field === 'period') return ['12plus', '6to12', '3to6', '1to3', '2to4weeks', '1week', 'dayof', 'after'];
  if (['Timeline', 'Photos'].includes(table) && field === 'priority') return ['Sangat Tinggi', 'Tinggi', 'Sedang', 'Rendah', 'Sangat Rendah'];
  return null; // Other statuses/categories remain editable until import maps exact options.
}

function wpSeedMeta_(sheet) {
  const existing = sheet.getLastRow() > 1
    ? new Set(sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat()) : new Set();
  const rows = [
    ['sheetSchemaVersion', '1'],
    ['appDataVersion', '1'],
    ['integrationStatus', 'template_only'],
    ['dateTimezone', 'Asia/Jakarta'],
    ['relationshipMode', 'app_names_except_seating_ids'],
    ['setupNote', 'Tidak ada import, API, atau sinkronisasi otomatis. Singleton Settings/Destination: satu baris. Gifts.value tetap teks. Relasi vendor/PIC masih nama sesuai aplikasi. ID seating perlu adapter migrasi. Waktu memakai teks HH:mm.'],
    ['createdAt', new Date().toISOString()]
  ].filter(row => !existing.has(row[0]));
  if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 2).setValues(rows);
}



function wpDataRows_(data) {
  const mappings = { Timeline: 'timeline', Rundown: 'rundown', Events: 'events', Packing: 'packing', Vendors: 'vendors', Contacts: 'contacts', Budget: 'budget', Guests: 'guests', WeddingParty: 'weddingParty', Venues: 'venues', FoodDrinks: 'foodDrinks', Photos: 'photos', Gifts: 'gifts' };
  const result = Object.fromEntries(Object.entries(mappings).map(([table, key]) => [table, data[key] || []]));
  result.Settings = [data.settings];
  result.Options = ['guestTags', 'weddingRoles', 'fundSources'].flatMap(type => (data.settings[type] || []).map((value, index) => ({ id: type + '_' + index, type, value, active: true })));
  result.KUAChecklist = Object.entries(data.kuaChecklist).flatMap(([section, items]) => items.map(item => ({ ...item, section })));
  result.Seating = data.seating.map(({ guests, ...table }) => table);
  result.SeatingAssignments = data.seating.flatMap(table => (table.guests || []).map((name, index) => {
    const matches = data.guests.filter(guest => guest.name === name);
    if (matches.length !== 1) throw new Error('Nama tamu ambigu/tidak ditemukan: ' + name);
    return { id: table.id + '_' + index, tableId: table.id, guestId: matches[0].id };
  }));
  result.HoneymoonDestination = [data.honeymoon.destination];
  result.HoneymoonItinerary = data.honeymoon.itinerary;
  result.HoneymoonExpenses = data.honeymoon.expenses;
  result.CalendarEvents = (data.calendarEvents || []).map((record, index) => ({ id: record.id || 'calendar_' + index, payloadJson: JSON.stringify(record) }));
  result.HoneymoonBookings = Object.entries(data.honeymoon.bookings).flatMap(([bookingType, records]) => records.map((record, index) => ({ id: record.id || bookingType + '_' + index, bookingType, payloadJson: JSON.stringify(record) })));
  return result;
}


// Public HTML transport for the configured origins; data access requires no login.
function doGet(e) {
  const allowed = ['https://devasmaradev.github.io', 'http://localhost:5500', 'http://127.0.0.1:5500'];
  const origin = e && e.parameter && e.parameter.origin;
  const channel = e && e.parameter && e.parameter.channel;
  if (!allowed.includes(origin) || !/^[a-f0-9]{32}$/.test(channel || '')) return HtmlService.createHtmlOutput('Wedding Planner API ready. Open the configured website.');
  const config = JSON.stringify({origin:origin,channel:channel}).replace(/</g, '\u003c');
  const html = '<!doctype html><meta charset="utf-8"><script>const c=' + config + ';function send(x){window.top.postMessage(Object.assign({channel:c.channel},x),c.origin);}window.addEventListener("message",function(e){if(e.source!==window.top||e.origin!==c.origin||!e.data||e.data.channel!==c.channel||e.data.type!=="request")return;const id=e.data.id;google.script.run.withSuccessHandler(function(result){send({type:"response",id:id,result:result});}).withFailureHandler(function(error){send({type:"response",id:id,error:error.message||"API gagal"});}).wpApiRequest(e.data.request);});send({type:"ready"});<\/script>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function wpRequireOwner_() {
  const active = Session.getActiveUser().getEmail();
  const owner = Session.getEffectiveUser().getEmail();
  if (!active || !owner || active !== owner) throw new Error("Jalankan fungsi administrasi dari editor Apps Script sebagai pemilik.");
}
