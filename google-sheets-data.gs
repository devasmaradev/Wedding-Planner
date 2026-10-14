/**
 * Paste into Extensions > Apps Script in the destination spreadsheet.
 * Data spreadsheet only. Run setupWeddingPlannerData once; authorize access to this spreadsheet.
 * Creates the storage template only, without importing or syncing app data.
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

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Wedding Planner')
    .addItem('Buat / rapikan template utama', 'setupWeddingPlannerData')
    .addToUi();
}

function wpHeaders_(name) {
  return WP_TABLES[name].concat(name === 'Meta' ? [] : WP_COMMON);
}

function setupWeddingPlannerData() {
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
  if (table === 'Timeline' && field === 'period') return ['12plus', '6to12', '3to6', '1to3', '2to4weeks', '1week', 'dayof'];
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


