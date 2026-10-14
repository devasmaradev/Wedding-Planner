/** Standalone script for the SAMPLE spreadsheet only.
 * Paste into its own bound Apps Script project. Run setupWeddingPlannerSamples.
 * Each run appends a fresh batch; never clears prior batches. No API or sync. */
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

function wpHeaders_(name) {
  return WP_TABLES[name].concat(name === "Meta" ? [] : WP_COMMON);
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Wedding Planner Samples")
    .addItem("Tambahkan batch (13 skenario)", "setupWeddingPlannerSamples").addToUi();
}

// SAMPLE DATA: dedicated spreadsheet; each run appends a new batch.
const wpSample_DEFAULT_GUEST_TAGS = ["Keluarga Pengantin Wanita","Teman Pengantin Wanita","Teman Kerja Pengantin Wanita","Keluarga Pengantin Pria","Teman Pengantin Pria","Teman Kerja Pengantin Pria","Teman Pasangan","Pengiring Pria","Pengiring Wanita"];
const wpSample_DEFAULT_WEDDING_ROLES = ["Pengantin Wanita","Pengantin Pria","Pendamping Pengantin Wanita","Pendamping Pengantin Pria","Pembawa Cincin","Pembawa Bunga","Pembawa Kitab Suci","Saksi","Wali Nikah","Pembawa Seserahan"];
const wpSample_DEFAULT_FUND_SOURCES = ["Pengantin","Orang Tua Pengantin Wanita","Orang Tua Pengantin Pria","Keluarga","Lainnya"];
const wpSample_DEFAULT_TIMELINE_TASKS = [{"period":"12plus","task":"Tentukan tanggal pernikahan","priority":"Sangat Tinggi"},{"period":"12plus","task":"Buat anggaran kasar","priority":"Sangat Tinggi"},{"period":"12plus","task":"Pilih wedding organizer","priority":"Tinggi"},{"period":"6to12","task":"Booking venue","priority":"Sangat Tinggi"},{"period":"6to12","task":"Pilih fotografer dan videografer","priority":"Tinggi"},{"period":"6to12","task":"Pilih makeup artist","priority":"Tinggi"},{"period":"6to12","task":"Pilih catering","priority":"Tinggi"},{"period":"3to6","task":"Order undangan","priority":"Tinggi"},{"period":"3to6","task":"Pilih busana pengantin","priority":"Tinggi"},{"period":"3to6","task":"Booking dekorasi","priority":"Tinggi"},{"period":"1to3","task":"Kirim undangan","priority":"Sangat Tinggi"},{"period":"1to3","task":"Finalisasi daftar tamu","priority":"Sangat Tinggi"},{"period":"1to3","task":"Meeting dengan vendor","priority":"Tinggi"},{"period":"2to4weeks","task":"Final fitting busana","priority":"Tinggi"},{"period":"2to4weeks","task":"Konfirmasi jumlah tamu ke catering","priority":"Sangat Tinggi"},{"period":"1week","task":"Final meeting dengan semua vendor","priority":"Sangat Tinggi"},{"period":"1week","task":"Persiapkan barang-barang yang dibawa","priority":"Tinggi"},{"period":"dayof","task":"Nikah","priority":"Sangat Tinggi"}];
const wpSample_KUA_CHECKLIST = {"persiapanAwal":[{"id":"ktp_suami","name":"Fotokopi KTP Calon Suami","checked":false},{"id":"ktp_istri","name":"Fotokopi KTP Calon Istri","checked":false},{"id":"kk","name":"Fotokopi KK","checked":false},{"id":"akta_lahir","name":"Fotokopi Akta Kelahiran","checked":false},{"id":"pas_foto","name":"Pas Foto","checked":false},{"id":"surat_belum_nikah","name":"Surat Keterangan Belum Menikah","checked":false},{"id":"surat_rt_rw","name":"Surat Pengantar RT/RW","checked":false},{"id":"surat_kelurahan","name":"Surat Pengantar Kelurahan/Desa","checked":false}],"formulirNikah":[{"id":"n1","name":"N1 - Surat Pengantar Nikah","checked":false},{"id":"n2","name":"N2 - Surat Keterangan Asal-Usul","checked":false},{"id":"n3","name":"N3 - Surat Persetujuan Calon Pengantin","checked":false},{"id":"n4","name":"N4 - Surat Keterangan tentang Orang Tua","checked":false},{"id":"n5","name":"N5 - Surat Izin Orang Tua (jika berlaku)","checked":false}],"dokumenTambahan":[{"id":"surat_cerai","name":"Surat Cerai (jika pernah menikah)","checked":false},{"id":"surat_kematian","name":"Surat Kematian Pasangan Sebelumnya (jika janda/duda)","checked":false},{"id":"dispensasi_usia","name":"Dispensasi Usia (jika diperlukan)","checked":false},{"id":"surat_izin_atasan","name":"Surat Izin Atasan (untuk PNS/TNI/Polri)","checked":false},{"id":"rekomendasi_kua","name":"Surat Rekomendasi Nikah dari KUA Asal","checked":false}],"pendaftaran":[{"id":"persiapkan_dokumen","name":"Persiapkan Dokumen","checked":false},{"id":"daftar_kua","name":"Daftar ke KUA Kecamatan","checked":false},{"id":"daftar_online","name":"Atau Pendaftaran Online melalui SIMKAH","checked":false},{"id":"tentukan_lokasi","name":"Tentukan Lokasi Akad","checked":false},{"id":"konfirmasi_jadwal","name":"Konfirmasi Jadwal","checked":false},{"id":"pembayaran","name":"Pembayaran (jika diperlukan)","checked":false}]};
const wpSample_PACKING_CATEGORIES = ["Pengantin Pria","Pengantin Wanita","Akad","Resepsi","Vendor","Honeymoon","Lainnya"];
const wpSample_RSVP_STATUSES = ["Belum Dikonfirmasi","Hadir","Tidak Hadir","Mungkin"];
const wpSample_PAYMENT_STATUSES = ["Belum Dibayar","DP","Sebagian","Lunas"];
const wpSample_FOOD_CATEGORIES = ["Appetizer","Main Course","Dessert","Stall","Minuman","Wedding Cake","Lainnya"];
const wpSample_PHOTO_CATEGORIES = ["Persiapan Pengantin","Detail","Akad","Keluarga","Bridesmaid/Groomsman","Couple","Resepsi","Dekorasi","Candid","Special Request"];
const wpSample_PRIORITIES = ["Sangat Tinggi","Tinggi","Sedang","Rendah","Sangat Rendah"];
const wpSample_SAMPLE_SCENARIOS = [{"id":"empty","label":"Kosong","description":"Modul kosong, onboarding, empty state dan tombol tambah."},{"id":"unconfigured","label":"Tanggal belum diatur","description":"Data terisi, profil/tanggal kosong: welcome panel dan countdown tanpa angka."},{"id":"normal","label":"Persiapan normal","description":"H-75, semua modul terisi, status campuran dan catatan dengan/tanpa isi."},{"id":"warnings","label":"Peringatan & jatuh tempo","description":"Over-budget, tugas/tagihan terlambat, KUA belum lengkap dan tamu belum mendapat meja."},{"id":"h30","label":"H-30","description":"Countdown 30 hari dan notifikasi pengingat vendor/DP."},{"id":"h7","label":"H-7","description":"Countdown satu minggu dan notifikasi rundown/RSVP."},{"id":"h1","label":"H-1","description":"Countdown satu hari dan pengingat menjelang pernikahan."},{"id":"today","label":"Hari pernikahan","description":"Pesan Hari Pernikahan, notifikasi ucapan dan acara pada kalender hari ini."},{"id":"past","label":"Setelah pernikahan","description":"Tanggal lampau, hadiah, countdown selesai dan honeymoon."},{"id":"complete","label":"Semua selesai","description":"Progress 100%, tagihan lunas, dokumen/foto selesai dan ucapan terkirim."},{"id":"dense","label":"Daftar panjang","description":"Seluruh modul berisi daftar panjang, status campuran, catatan multiline, dan agenda per tanggal untuk menguji scroll/filter/detail."}];

function wpSample_formatCurrency(value) { return "Rp " + Number(value || 0).toLocaleString("id-ID"); }

function setupWeddingPlannerSamples() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getDocumentLock();
  if (!ss || !lock || !lock.tryLock(30000)) throw new Error('Buka melalui spreadsheet tujuan atau coba lagi sebentar.');
  try {
    const tables = Object.keys(WP_TABLES).filter(name => name !== 'Meta');
    const headers = Object.fromEntries(tables.map(name => [name, ['scenarioId', 'batchId'].concat(wpHeaders_(name), ['extraJson'])]));
    headers.Catalog = ['scenarioId', 'batchId', 'label', 'description', 'generatedAt', 'baseDate', 'recordCount', 'appDataVersion'];
    Object.keys(headers).forEach(name => {
      const sheet = ss.getSheetByName(name);
      if (!sheet || !sheet.getLastRow()) return;
      const actual = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (JSON.stringify(actual) !== JSON.stringify(headers[name])) throw new Error('Header ' + name + ' tidak cocok. Tidak ada data ditulis.');
    });
    const batchId = Utilities.getUuid();
    const generatedAt = new Date().toISOString();
    const rows = Object.fromEntries(Object.keys(headers).map(name => [name, []]));
    wpSampleScenarios_().forEach(scenario => {
      const data = wpSampleScenarioData_(scenario.id);
      const modules = wpSampleRows_(data);
      let recordCount = 0;
      tables.forEach(table => {
        (modules[table] || []).forEach((record, index) => {
          const known = wpHeaders_(table);
          const extras = Object.fromEntries(Object.entries(record).filter(([key]) => !known.includes(key)));
          const values = known.map(field => field === 'sortOrder' ? index + 1 : field === 'revision' ? 1 : field === 'updatedAt' ? generatedAt : record[field] ?? '');
          rows[table].push([scenario.id, batchId].concat(values, [JSON.stringify(extras)]));
          recordCount++;
        });
      });
      rows.Catalog.push([scenario.id, batchId, scenario.label, scenario.description, generatedAt, wpSample_getSampleDate(0), recordCount, 1]);
    });
    // Build every fixture before writing. Preserve live tabs and previous batches.
    Object.keys(headers).forEach(name => {
      const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
      const fields = headers[name];
      const requiredRows = Math.max(2, sheet.getLastRow() + rows[name].length + (sheet.getLastRow() ? 0 : 1));
      if (sheet.getMaxColumns() < fields.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), fields.length - sheet.getMaxColumns());
      if (sheet.getMaxRows() < requiredRows) sheet.insertRowsAfter(sheet.getMaxRows(), requiredRows - sheet.getMaxRows());
      if (!sheet.getLastRow()) sheet.getRange(1, 1, 1, fields.length).setValues([fields]);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, fields.length, 150);
      sheet.getRange(1, 1, 1, fields.length).setBackground('#405D4C').setFontColor('#FFFFFF').setFontWeight('bold').setWrap(true);
      if (rows[name].length) {
        const first = sheet.getLastRow() + 1;
        const values = rows[name].map(row => row.map(value => typeof value === 'string' && /^[=+@-]/.test(value) ? "'" + value : value));
        const range = sheet.getRange(first, 1, values.length, fields.length);
        // Dates/times/phones remain ISO/text in sample storage, avoiding timezone conversion.
        range.setNumberFormat('@').setValues(values).setVerticalAlignment('top');
        fields.forEach((field, col) => {
          const column = sheet.getRange(first, col + 1, values.length, 1);
          if (WP_NUMBER.has(field) || ['recordCount', 'appDataVersion'].includes(field)) column.setNumberFormat('#,##0');
          if (WP_BOOLEAN.has(field)) column.setNumberFormat('General').setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().setAllowInvalid(false).build());
          if (['notes', 'description', 'extraJson', 'payloadJson'].includes(field)) { column.setWrap(true); sheet.setColumnWidth(col + 1, 300); }
        });
      }
      if (!sheet.getFilter()) sheet.getRange(1, 1, sheet.getMaxRows(), fields.length).createFilter();
    });
    SpreadsheetApp.flush();
    ss.toast('13 skenario ditambahkan ke 24 tab spreadsheet sample. Batch: ' + batchId + '. Batch sebelumnya dipertahankan.', 'Sample Wedding Planner', 10);
  } finally { lock.releaseLock(); }
}

function wpSampleScenarios_() {
  return wpSample_SAMPLE_SCENARIOS.concat([
    { id: 'without_notes', label: 'Tanpa catatan opsional', description: 'Data valid terisi dengan catatan, pro/kontra, dan fasilitas kosong untuk menguji alignment dan detail fallback.' },
    { id: 'long_text', label: 'Teks panjang & karakter khusus', description: 'Catatan multiline, Unicode, ampersand, dan teks mirip HTML untuk menguji wrapping, escaping, filter dan detail.' }
  ]);
}

function wpSampleScenarioData_(id) {
  const data = wpSample_buildSampleData(id === 'long_text' || id === 'without_notes' ? 'normal' : id);
  if (id === 'long_text' || id === 'without_notes') {
    function visit(value) {
      if (!value || typeof value !== 'object') return;
      Object.keys(value).forEach(key => {
        if (['notes', 'pros', 'cons', 'facilities'].includes(key)) {
          value[key] = id === 'without_notes' ? '' : 'Simulasi pengujian — koordinasi keluarga & vendor.\nKarakter: é, 日本語, “kutipan”, <b>teks literal</b>.\n' + 'Konfirmasi akses kursi roda, rencana hujan, jadwal kru, kebutuhan vegetarian, dan penanggung jawab lapangan sebelum finalisasi. '.repeat(6);
        } else visit(value[key]);
      });
    }
    visit(data);
  }
  return data;
}

function wpSampleRows_(data) {
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

function wpSample_getDefaultData() {
    return {
        settings: {
            groomName: '',
            brideName: '',
            weddingDate: '',
            location: '',
            currency: 'Rp',
            targetBudget: 0,
            targetGuests: 0,
            guestTags: [...wpSample_DEFAULT_GUEST_TAGS],
            weddingRoles: [...wpSample_DEFAULT_WEDDING_ROLES],
            fundSources: [...wpSample_DEFAULT_FUND_SOURCES]
        },
        timeline: wpSample_DEFAULT_TIMELINE_TASKS.map((t, i) => ({
            id: wpSample_generateId(),
            period: t.period,
            task: t.task,
            deadline: '',
            assignee: '',
            priority: t.priority ||'Sedang',
            category: '',
            completed: false,
            notes: ''
        })),
        rundown: [],
        events: [],
        packing: [],
        vendors: [],
        contacts: [],
        calendarEvents: [],
        budget: [],
        guests: [],
        weddingParty: [],
        venues: [],
        foodDrinks: [],
        seating: [],
        photos: [],
        gifts: [],
        honeymoon: {
            destination: {
                country: '',
                city: '',
                departureDate: '',
                returnDate: '',
                currency: '',
                budget: 0
            },
            itinerary: [],
            bookings: {
                flights: [],
                hotels: [],
                transport: [],
                activities: [],
                restaurants: []
            },
            expenses: []
        },
        kuaChecklist: JSON.parse(JSON.stringify(wpSample_KUA_CHECKLIST))
    };
}

function wpSample_generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function wpSample_enrichSampleData(data) {
    const relativeDate = days => {
        const date = new Date(data.settings.weddingDate + 'T12:00:00');
        date.setDate(date.getDate() + days);
        return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
    };
    data.vendors.forEach(vendor => {
        if (vendor.category === 'Foto & Video') vendor.category = 'Fotografer';
        if (vendor.category === 'MUA') vendor.category = 'Makeup Artist';
        if (/Wedding Organizer/i.test(vendor.name)) vendor.category = 'Wedding Organizer';
    });
    data.venues.push({ id: wpSample_generateId(), name: 'Taman Arunika (Venue Simulasi)', location: 'Jakarta Selatan', capacity: 350, price: 55000000, type: 'Outdoor', contact: '081200000030', facilities: 'Taman, ruang rias, parkir, dan opsi tenda cadangan', pros: 'Cahaya sore dan akses kursi roda', cons: 'Memerlukan rencana cadangan hujan', selected: false, notes: 'Alternatif pembanding; biaya dan fasilitas merupakan data simulasi.' });
    data.foodDrinks.push({ id: wpSample_generateId(), name: 'Air Mineral dan Teh Melati', category: 'Minuman', vendor: 'Puspa Catering Services', price: 12000, quantity: 600, selected: true, notes: 'Termasuk kebutuhan keluarga, vendor, dan kru.' });
    data.foodDrinks.push({ id: wpSample_generateId(), name: 'Pilihan Menu Vegetarian', category: 'Main Course', vendor: 'Puspa Catering Services', price: 50000, quantity: 40, selected: false, notes: 'Alternatif untuk tamu vegetarian; konfirmasi kebutuhan saat RSVP.' });
    data.budget.push({ id: wpSample_generateId(), category: 'Catering', description: 'Kue pernikahan dekoratif dan sajian keluarga', vendor: 'Le Novelle Cake', budget: 15000000, actualCost: 15000000, paid: 5000000, dueDate: relativeDate(-7), status: 'DP', fundSource: data.settings.fundSources[0], notes: 'Biaya contoh terpisah dari paket catering utama.' });
    data.photos.push({ id: wpSample_generateId(), shot: 'Foto keluarga lengkap sebelum resepsi', category: 'Keluarga', priority: 'Tinggi', time: '18:30', location: 'Pelaminan', completed: false, notes: 'Daftar urutan keluarga dibawa koordinator agar sesi efisien.' });
    data.photos.forEach((item, i) => { item.completed = i % 4 === 0; });
    data.packing.forEach((item, i) => {
        if (!wpSample_PACKING_CATEGORIES.includes(item.category)) item.category = 'Lainnya';
        if (!item.notes) item.notes = 'Periksa jumlah, kondisi, dan label pemilik sebelum dimasukkan ke tas.';
        if (!item.carrier) item.carrier = 'Koordinator perlengkapan';
        if (!item.destination) item.destination = 'Ruang persiapan venue';
        item.packed = i % 3 === 0;
    });
    data.budget.forEach((item, i) => {
        item.dueDate = relativeDate(-14 + i % 12);
    });
    const requiredVendors = new Map();
    data.budget.forEach(item => { if (item.vendor) requiredVendors.set(item.vendor, item.actualCost); });
    data.foodDrinks.forEach(item => { if (item.vendor && !requiredVendors.has(item.vendor)) requiredVendors.set(item.vendor, item.price * item.quantity); });
    data.rundown.forEach(item => { if (item.vendor && !requiredVendors.has(item.vendor)) requiredVendors.set(item.vendor, 0); });
    requiredVendors.forEach((price, name) => {
        if (!data.vendors.some(vendor => vendor.name === name)) data.vendors.push({ id: wpSample_generateId(), name, category: /Ballroom/.test(name) ? 'Venue' : 'Lainnya', contact: '081200000031', social: 'https://example.com/vendor', price, rating: 4, package: 'Paket layanan contoh sesuai kebutuhan acara', pros: 'PIC tersedia saat koordinasi', cons: 'Jadwal dan biaya perlu dikonfirmasi', status: 'Terpilih', notes: 'Vendor simulasi untuk menguji hubungan anggaran/menu/rundown.' });
    });
    const contactNames = new Set([...data.rundown.map(item => item.pic), ...data.vendors.map(item => item.name), ...data.weddingParty.map(item => item.name)].filter(Boolean));
    contactNames.forEach(name => {
        if (!data.contacts.some(contact => contact.name === name)) data.contacts.push({ id: wpSample_generateId(), name, category: data.vendors.some(vendor => vendor.name === name) ? 'Vendor' : 'Keluarga', company: data.vendors.find(vendor => vendor.name === name)?.name || 'Tim keluarga dan pendamping', phone: '', whatsapp: '', email: '', instagram: '', address: 'Jakarta', notes: 'Kontak simulasi untuk koordinasi persiapan dan hari acara.' });
    });
    data.contacts.forEach((contact, i) => {
        contact.phone = '0812000' + String(i+1).padStart(5,'0');
        contact.whatsapp = contact.phone;
        contact.email = 'kontak' + (i+1) + '@example.com';
        if (!contact.instagram) contact.instagram = 'https://example.com/kontak/' + (i+1);
        if (!contact.company) contact.company = 'Koordinator keluarga';
        if (!contact.address) contact.address = 'Jakarta';
    });
    data.vendors.forEach(vendor => { vendor.contact = data.contacts.find(contact => contact.name === vendor.name).phone; });
    data.weddingParty.forEach(member => { member.contact = data.contacts.find(contact => contact.name === member.name).phone; });
    data.settings.weddingRoles = [...new Set([...data.settings.weddingRoles, ...data.weddingParty.map(member => member.role)])];
    data.guests.forEach((guest, i) => {
        guest.phone = '0812100' + String(i+1).padStart(5,'0');
        if (!guest.notes) guest.notes = 'Konfirmasi kehadiran, jumlah rombongan, dan kebutuhan aksesibilitas.';
    });
    data.honeymoon.destination.currency = data.settings.currency;
    data.honeymoon.destination.budget = 75000000;
    data.honeymoon.expenses.push({ id: wpSample_generateId(), date: wpSample_getSampleDate(-1), category: 'Transportasi', description: 'Transfer bandara dan penginapan untuk dua orang (simulasi)', amount: 4000000 });
    data.honeymoon.expenses.push({ id: wpSample_generateId(), date: wpSample_getSampleDate(-1), category: 'Aktivitas', description: 'Pemesanan awal snorkeling dan wisata lokal (simulasi)', amount: 2500000 });
    data.honeymoon.itinerary.forEach(item => { item.notes += '\nRencana simulasi; cek cuaca, jam layanan, dan konfirmasi reservasi.'; });
    return data;
}

function wpSample_customizeSampleData(data, scenario) {
    const today = wpSample_getSampleDate(0);
    const actual = data.budget.reduce((sum, b) => sum + (b.actualCost || 0), 0);
    data.settings.targetBudget = Math.max(data.settings.targetBudget, Math.ceil(actual * 1.2));
    ['Dipertimbangkan', 'Dihubungi', 'Meeting', 'Ditolak'].forEach((status, i) => {
        const original = data.vendors[i];
        data.vendors.push({ ...original, id: wpSample_generateId(), name: 'Alternatif '+original.category+' '+(i+1)+' (simulasi)', status, notes: 'Pembanding vendor untuk uji shortlist, filter, dan detail; belum menjadi kontrak utama.' });
    });
    data.guests.slice(-wpSample_RSVP_STATUSES.length).forEach((guest, i) => { guest.rsvp = wpSample_RSVP_STATUSES[i]; });
    data.budget.slice(-wpSample_PAYMENT_STATUSES.length).forEach((item, i) => {
        item.status = wpSample_PAYMENT_STATUSES[i];
        item.paid = item.status === 'Lunas' ? item.actualCost : item.status === 'Belum Dibayar' ? 0 : Math.floor(item.actualCost / 2);
    });
    Object.values(data.kuaChecklist).forEach(items => items.forEach((item, i) => {
        item.checked = i % 3 === 0;
        item.notes = i % 2 ? '' : 'Verifikasi '+item.name+'. Siapkan dokumen asli dan salinan, lalu konfirmasi kepada petugas. Catatan simulasi, bukan daftar persyaratan resmi.';
    }));
    if (scenario === 'empty') {
        const empty = wpSample_getDefaultData();
        Object.keys(empty).forEach(key => { if (Array.isArray(empty[key])) empty[key] = []; });
        Object.keys(empty.kuaChecklist).forEach(key => { empty.kuaChecklist[key] = []; });
        return empty;
    }
    if (scenario === 'unconfigured') {
        data.settings.groomName = '';
        data.settings.brideName = '';
        data.settings.weddingDate = '';
        data.settings.location = '';
    }
    if (scenario === 'warnings') {
        data.settings.targetBudget = Math.max(1, Math.floor(actual / 2));
        data.timeline.forEach((t, i) => { t.completed = false; t.deadline = wpSample_getSampleDate(-i - 1); });
        data.budget.forEach((b, i) => { b.paid = 0; b.status = 'Belum Dibayar'; b.dueDate = wpSample_getSampleDate(-i - 1); });
        Object.values(data.kuaChecklist).flat().forEach(item => { item.checked = false; });
        data.seating.forEach(table => { table.guests = []; });
        data.guests.forEach(guest => { guest.table = ''; });
        data.honeymoon.destination.budget = 1;
        if (data.seating.length) {
            data.seating.forEach(table => { table.capacity = 1; });
            data.guests.slice(0, 6).forEach(guest => {
                data.seating[0].guests.push(guest.name);
                guest.table = data.seating[0].name;
            });
        }
    }
    if (scenario === 'complete') {
        data.timeline.forEach(t => { t.completed = true; });
        data.budget.forEach(b => { b.paid = b.actualCost; b.status = 'Lunas'; });
        data.packing.forEach(item => { item.packed = true; });
        data.photos.forEach(item => { item.completed = true; });
        data.gifts.forEach(item => { item.thankYouSent = true; item.thankYouDate = today; });
        Object.values(data.kuaChecklist).flat().forEach(item => { item.checked = true; });
        data.seating.forEach(table => { table.guests = []; });
        data.guests.forEach((guest, i) => {
            guest.guestCount = 1;
            guest.rsvp = 'Hadir';
            const table = data.seating[i % data.seating.length];
            table.guests.push(guest.name);
            table.capacity = Math.max(table.capacity, table.guests.length);
            guest.table = table.name;
        });
    }
    if (scenario === 'dense') {
        for (let i = 0; i < 16; i++) {
            data.timeline.push({ ...data.timeline[0], id: wpSample_generateId(), task: 'Konfirmasi rombongan ' + (i + 1) + ': kedatangan, transportasi, dan kebutuhan aksesibilitas', completed: false, deadline: wpSample_getSampleDate(i + 1) });
            data.budget.push({ ...data.budget[0], id: wpSample_generateId(), description: 'Transportasi dan logistik rombongan ' + (i + 1), vendor: 'Mitra logistik rombongan ' + (i + 1), category: 'Transportasi', budget: 2000000+i*100000, actualCost: 2000000+i*100000, paid: 0, status: 'Belum Dibayar', dueDate: wpSample_getSampleDate(i + 1) });
            data.vendors.push({ ...data.vendors[0], id: wpSample_generateId(), name: 'Mitra logistik rombongan ' + (i + 1), category: 'Transportasi', price: 2000000+i*100000, notes: 'Vendor simulasi; biaya kendaraan dan pengantaran perlengkapan.', status: 'Terpilih' });
            data.events.push({ id: wpSample_generateId(), name: 'Koordinasi rombongan ' + (i + 1), date: today, time: String(8+Math.floor(i/4)).padStart(2,'0')+':'+String((i%4)*15).padStart(2,'0'), location: 'Ruang koordinasi keluarga', notes: i % 2 ? '' : 'Contoh catatan acara.' });
        }
    }
    if (scenario === 'dense') wpSample_enrichDenseSample(data);
    data.vendors.forEach((vendor, i) => {
        let contact = data.contacts.find(contact => contact.name === vendor.name);
        if (!contact) {
            const phone = '0812400'+String(i+1).padStart(5,'0');
            contact = { id: wpSample_generateId(), name: vendor.name, category: 'Vendor', company: vendor.name, phone, whatsapp: phone, email: 'vendor'+(i+1)+'@example.com', instagram: 'https://example.com/vendor/'+(i+1), address: 'Jakarta', notes: 'Kontak simulasi untuk pengujian hubungan vendor dan acara.' };
            data.contacts.push(contact);
        }
        vendor.contact = contact.phone;
    });
    data.venues.forEach((venue, i) => {
        let contact = data.contacts.find(contact => contact.name === venue.name);
        if (!contact) {
            const phone = '0812500'+String(i+1).padStart(5,'0');
            contact = { id: wpSample_generateId(), name: venue.name, category: 'Venue', company: venue.name, phone, whatsapp: phone, email: 'venue'+(i+1)+'@example.com', instagram: 'https://example.com/venue/'+(i+1), address: venue.location, notes: 'Kontak venue simulasi untuk pengujian; bukan kontak resmi.' };
            data.contacts.push(contact);
        }
        venue.contact = contact.phone;
        const payment = data.budget.find(item => item.vendor === venue.name);
        venue.notes = venue.selected && payment
            ? 'Venue terpilih. Status pembayaran: '+payment.status+'. Dibayar '+wpSample_formatCurrency(payment.paid)+'. Sisa '+wpSample_formatCurrency(payment.actualCost-payment.paid)+'.'
            : 'Alternatif venue pembanding; belum dipilih atau belum memiliki tagihan.';
        venue.notes += '\nData simulasi; harga, fasilitas, dan kontak bukan penawaran atau informasi resmi.';
    });
    data.budget.forEach(item => {
        const deadline = item.status === 'Lunas' ? 'pembayaran selesai' : item.dueDate ? item.dueDate < today ? 'terlewat' : item.dueDate === today ? 'hari ini' : 'mendatang' : 'belum diatur';
        const payment = item.status === 'Lunas' ? 'Lunas; tidak ada sisa pembayaran.' : 'Dibayar '+wpSample_formatCurrency(item.paid)+', sisa tagihan '+wpSample_formatCurrency(item.actualCost-item.paid)+'.';
        item.notes = 'Simulasi biaya '+item.description+'.\nStatus: '+item.status+'. '+payment+'\nJatuh tempo: '+(item.dueDate || '-')+' ('+deadline+').';
    });
    data.settings.guestTags = [...new Set([...data.settings.guestTags, ...data.guests.map(guest => guest.tag)])];
    data.settings.weddingRoles = [...new Set([...data.settings.weddingRoles, ...data.weddingParty.map(member => member.role)])];
    data.guests.forEach(guest => { guest.table = data.seating.find(table => table.guests?.includes(guest.name))?.name || ''; });
    return data;
}

function wpSample_getSampleDate(offset) {
    return Utilities.formatDate(new Date(Date.now() + offset * 86400000), 'Asia/Jakarta', 'yyyy-MM-dd');
}

function wpSample_buildSampleData(scenario = 'normal') {
    const weddingData = wpSample_getDefaultData();
    const d = wpSample_getDefaultData();
    const offsets = { normal: 75, unconfigured: 75, warnings: 7, h30: 30, h7: 7, h1: 1, today: 0, past: -7, complete: -7, dense: 75, empty: 75 };
    const offset = offsets[scenario] ?? 75;
    const sampleFutureDate = days => wpSample_getSampleDate(days + offset - 75);
    const wedDate = sampleFutureDate(75); // H-75: memicu countdown realistis & alert KUA H-90

    // 1. Settings
    weddingData.settings = {
        groomName: 'Dimas Arya Pratama',
        brideName: 'Nabila Safira Anindya',
        weddingDate: wedDate,
        location: 'Grand Ballroom Hotel Mulia Senayan, Jakarta Pusat',
        currency: 'Rp',
        targetBudget: 400000000,
        targetGuests: 500,
        guestTags: d.settings.guestTags,
        weddingRoles: d.settings.weddingRoles,
        fundSources: ['Tabungan Bersama', 'Keluarga Pengantin Pria', 'Keluarga Pengantin Wanita', 'Amplop Sumbangan']
    };

    // 2. Venues
    const venueId1 = wpSample_generateId();
    const venueId2 = wpSample_generateId();
    weddingData.venues = [
        {
            id: venueId1,
            name: 'Grand Ballroom Hotel Mulia',
            location: 'Jl. Asia Afrika Senayan, Gelora, Jakarta Pusat',
            capacity: 1000,
            price: 165000000,
            type: 'Indoor',
            contact: '081250000001',
            facilities: 'Full AC, Ruang Rias VIP (2 unit), Sound System 10.000W, Parkir Valet gratis 50 mobil, Listrik 40.000W',
            pros: 'Lokasi bintang 5 prestisius, akses prima, ceiling megah 8 meter, karpet bersih',
            cons: 'Biaya charge vendor non-rekanan 15%',
            selected: true,
            notes: 'DP 50% sudah lunas dibayar via transfer. Technical meeting disepakati H-14.'
        },
        {
            id: venueId2,
            name: 'Gedung Dhanapala Kemenkeu',
            location: 'Jl. Senen Raya No.1, Ps. Baru, Jakarta Pusat',
            capacity: 800,
            price: 45000000,
            type: 'Indoor',
            contact: '081250000002',
            facilities: 'Ruang rias ber-AC luas, karpet merah pelaminan, area parkir 500 kendaraan',
            pros: 'Lokasi sentral, parkir sangat luas, biaya sewa relatif ekonomis',
            cons: 'Catering wajib rekanan internal, jadwal weekend cepat penuh',
            selected: false,
            notes: 'Tanggal pilihan sudah terisi oleh acara kedinasan.'
        }
    ];

    // 3. Vendors
    const woId = wpSample_generateId();
    const photoId = wpSample_generateId();
    const muaId = wpSample_generateId();
    const caterId = wpSample_generateId();
    const decorId = wpSample_generateId();
    const attireId = wpSample_generateId();
    const musicId = wpSample_generateId();
    const inviteId = wpSample_generateId();
    const giftVendorId = wpSample_generateId();

    weddingData.vendors = [
        {
            id: woId,
            name: 'The Signature Wedding Organizer',
            category: 'Lainnya',
            contact: '081299887766',
            social: '@signature.wedding',
            price: 45000000,
            rating: 4.9,
            package: 'Full Planning & D-Day Coordination (12 Crew)',
            pros: 'Tim sangat berpengalaman, rundown detail per 15 menit, standby H-1',
            cons: 'Biaya overtime crew Rp 1.500.000/jam',
            status: 'Terpilih',
            notes: 'PIC: Mbak Rina Wijaya. Sudah meeting konsep adat & resepsi.'
        },
        {
            id: caterId,
            name: 'Puspa Catering Services',
            category: 'Catering',
            contact: '081388776655',
            social: '@puspacatering',
            price: 135000000,
            rating: 4.8,
            package: 'Buffet 500 Pax + 6 Food Stalls (Kambing Guling, Zuppa, Salmon, dll)',
            pros: 'Rasa autentik lezat, porsi aman, staf penyaji higienis berseragam rapi',
            cons: 'Pesanan stall tambahan minimal 200 porsi per menu',
            status: 'Terpilih',
            notes: 'Food tasting selesai, menu favorit: Kambing Guling & Salmon En Croute.'
        },
        {
            id: decorId,
            name: 'Stupa Caspea Decoration',
            category: 'Dekorasi',
            contact: '081288889999',
            social: '@stupacaspea',
            price: 65000000,
            rating: 4.9,
            package: 'Modern Elegant White & Pastel with Fresh Florals',
            pros: 'Portofolio megah, rangkaian bunga segar impor wangi, lighting dramatis',
            cons: 'Bongkar pasang butuh waktu minimal 6 jam',
            status: 'Terpilih',
            notes: 'Pelaminan 18 meter, lorong masuk pergola bunga kanopi.'
        },
        {
            id: photoId,
            name: 'Lumina Pictures',
            category: 'Foto & Video',
            contact: '081355443322',
            social: '@luminapictures',
            price: 25000000,
            rating: 4.8,
            package: 'Prewedding + Same Day Edit (SDE) + 2 Album Teakwood',
            pros: 'Warna hangat natural (earth-tone), pilot drone certified, video cinematic',
            cons: 'File RAW tidak diberikan, kurasi album 30 hari kerja',
            status: 'Terpilih',
            notes: 'SDE video tayang saat resepsi sesi kedua.'
        },
        {
            id: attireId,
            name: 'Wong Hang Distinguished Tailor',
            category: 'Busana',
            contact: '081733221100',
            social: '@wonghangtailor',
            price: 20000000,
            rating: 4.9,
            package: 'Tuxedo Pengantin Pria (Wool Scabal) & Beskap Tradisional',
            pros: 'Jahitan sangat presisi, potongan pas di badan (bespoke)',
            cons: 'Fitting wajib minimal 3 kali',
            status: 'Terpilih',
            notes: 'Fitting final dijadwalkan H-14.'
        },
        {
            id: muaId,
            name: 'Bennu Sorumba Makeup',
            category: 'MUA',
            contact: '081211112222',
            social: '@bennusorumba',
            price: 18000000,
            rating: 5.0,
            package: 'Bridal Flawless Glow + 2 Ibu Pengantin',
            pros: 'Riasan tahan air mata 12 jam, complexion ringan, aura manglingi',
            cons: 'Harus standby mulai pukul 04:30 subuh',
            status: 'Terpilih',
            notes: 'Sudah test makeup & fitting veil.'
        },
        {
            id: giftVendorId,
            name: 'Kencana Luxury Souvenir',
            category: 'Souvenir',
            contact: '081277665544',
            social: '@kencanasouvenir',
            price: 15000000,
            rating: 4.8,
            package: '500 Pcs Reed Diffuser Aromatherapy (Amber Glass Bottle)',
            pros: 'Wangi lavender & sandalwood mewah, kemasan rapi siap bagi',
            cons: 'Waktu produksi 3 minggu',
            status: 'Terpilih',
            notes: 'Sampel wangi disetujui, kirim ke venue H-1.'
        },
        {
            id: musicId,
            name: 'Lala Entertainment & Orchestra',
            category: 'Entertainment',
            contact: '081133445566',
            social: '@lala.music',
            price: 14000000,
            rating: 4.7,
            package: 'Mini Chamber Orchestra (6 Pcs: Piano, Cello, 2 Biola, Saksofon, Vokal)',
            pros: 'Musisi lulusan ISI, aransemen pop romantis elegan, vokal jernih',
            cons: 'Sound system harus konfirmasi ke banquet hotel',
            status: 'Terpilih',
            notes: 'Lagu grand entrance: A Thousand Years.'
        },
        {
            id: inviteId,
            name: 'Byru Invitation & Digital',
            category: 'Undangan',
            contact: '081511223344',
            social: '@byruinvitation',
            price: 6000000,
            rating: 4.6,
            package: '300 Hardcover Foil Gold + Website Undangan Online Interaktif',
            pros: 'Desain elegan emboss, website undangan responsif ada RSVP & musik',
            cons: 'Revisi desain maksimal 3 kali',
            status: 'Terpilih',
            notes: 'Sample cetak sudah di-acc, sedang naik cetak.'
        }
    ];

    // 4. Contacts (Cross-linked to Rundown PICs & Vendors)
    weddingData.contacts = [
        { id: wpSample_generateId(), name: 'Mbak Rina Wijaya', category: 'Vendor', company: 'The Signature Wedding Organizer', phone: '081299887766', whatsapp: '081299887766', email: 'rina@signature.co.id', instagram: '@rina.signature', address: '', notes: 'PIC Utama Wedding Organizer D-Day' },
        { id: wpSample_generateId(), name: 'Bapak Surya Atmaja', category: 'Vendor', company: 'Hotel Mulia Senayan', phone: '081100001111', whatsapp: '081100001111', email: 'surya.banquet@hotelmulia.com', instagram: '', address: '', notes: 'Banquet & Venue Manager Hotel Mulia' },
        { id: wpSample_generateId(), name: 'Ibu Hj. Yuni Astuti', category: 'Keluarga Pengantin Wanita', company: 'Keluarga Besar Anindya', phone: '081244556677', whatsapp: '081244556677', email: 'yuni.astuti@gmail.com', instagram: '', address: 'Bintaro Jaya Sektor 7', notes: 'Koordinator Seragam & Konsumsi Keluarga Inti' },
        { id: wpSample_generateId(), name: 'Bpk. Dr. H. Bambang Susanto, M.M.', category: 'Keluarga Pengantin Wanita', company: 'Ayah / Wali Nikah', phone: '081122334455', whatsapp: '081122334455', email: '', instagram: '', address: 'Pondok Indah, Jakarta Selatan', notes: 'Wali Nikah Pengantin Wanita' },
        { id: wpSample_generateId(), name: 'Dimas Prasetyo', category: 'Pengiring Pria', company: 'Sahabat Pengantin Pria', phone: '081555667788', whatsapp: '081555667788', email: '', instagram: '@dimas.pras', address: 'Kemang, Jaksel', notes: 'Best Man / PIC Cincin Kawin' },
        { id: wpSample_generateId(), name: 'Ust. Ahmad Fauzi (KUA Tanah Abang)', category: 'KUA', company: 'KUA Kecamatan Tanah Abang', phone: '081399881122', whatsapp: '081399881122', email: '', instagram: '', address: 'Jl. KH. Mas Mansyur, Tanah Abang', notes: 'Penghulu Petugas Akad Nikah Resmi SIMKAH' }
    ];

    // 5. Budget (Cross-linked with vendors & demonstrates over-budget alert)
    weddingData.budget = [
        { id: wpSample_generateId(), category: 'Venue', description: 'Grand Ballroom Hotel Mulia Senayan', vendor: 'Grand Ballroom Hotel Mulia', budget: 165000000, actualCost: 165000000, paid: 82500000, dueDate: wpSample_getPastDate(15), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Sisa pelunasan H-14' },
        { id: wpSample_generateId(), category: 'Catering', description: 'Paket Buffet 500 Pax + 6 Food Stall Pilihan', vendor: 'Puspa Catering Services', budget: 120000000, actualCost: 135000000, paid: 40000000, dueDate: sampleFutureDate(20), status: 'DP', fundSource: 'Keluarga Pengantin Pria', notes: 'Penambahan 100 porsi kambing guling (Over budget)' },
        { id: wpSample_generateId(), category: 'Dekorasi', description: 'Dekorasi Pelaminan 18m, Foyer, & Lorong Bunga Masuk', vendor: 'Stupa Caspea Decoration', budget: 60000000, actualCost: 65000000, paid: 30000000, dueDate: sampleFutureDate(35), status: 'DP', fundSource: 'Keluarga Pengantin Wanita', notes: 'Rangkaian fresh flower impor wangi' },
        { id: wpSample_generateId(), category: 'Lainnya', description: 'Wedding Organizer Full Day Service (12 Crew)', vendor: 'The Signature Wedding Organizer', budget: 45000000, actualCost: 45000000, paid: 45000000, dueDate: wpSample_getPastDate(30), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Lunas kontrak kerja' },
        { id: wpSample_generateId(), category: 'Foto & Video', description: 'Dokumentasi Prewedding, Liputan D-Day & SDE Video', vendor: 'Lumina Pictures', budget: 25000000, actualCost: 25000000, paid: 15000000, dueDate: wpSample_getPastDate(3), status: 'Sebagian', fundSource: 'Tabungan Bersama', notes: 'Termin dokumentasi dan serah terima album' },
        { id: wpSample_generateId(), category: 'Busana', description: 'Jas Pengantin Bespoke & Beskap Tradisional', vendor: 'Wong Hang Distinguished Tailor', budget: 20000000, actualCost: 20000000, paid: 20000000, dueDate: wpSample_getPastDate(45), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Lunas saat fitting bahan' },
        { id: wpSample_generateId(), category: 'MUA', description: 'Rias Pengantin Akad, Resepsi, & 2 Ibu Pengantin', vendor: 'Bennu Sorumba Makeup', budget: 18000000, actualCost: 18000000, paid: 9000000, dueDate: sampleFutureDate(50), status: 'DP', fundSource: 'Keluarga Pengantin Wanita', notes: 'DP 50% terbayar' },
        { id: wpSample_generateId(), category: 'Souvenir', description: '500 Pcs Reed Diffuser Aromatherapy Amber Bottle', vendor: 'Kencana Luxury Souvenir', budget: 15000000, actualCost: 15000000, paid: 7500000, dueDate: sampleFutureDate(10), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Pelunasan saat barang tiba di venue' },
        { id: wpSample_generateId(), category: 'Entertainment', description: 'Mini Chamber Orchestra 6 Pcs & Sound System', vendor: 'Lala Entertainment & Orchestra', budget: 14000000, actualCost: 14000000, paid: 5000000, dueDate: sampleFutureDate(40), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Sisa H-3 acara' },
        { id: wpSample_generateId(), category: 'Undangan', description: '300 Hardcover Foil Gold + Website Undangan Online', vendor: 'Byru Invitation & Digital', budget: 6000000, actualCost: 6000000, paid: 6000000, dueDate: wpSample_getPastDate(20), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Selesai cetak dan lunas' },
        { id: wpSample_generateId(), category: 'KUA', description: 'Biaya Pencatatan Nikah Luar Balai & Transport Penghulu', vendor: 'KUA Kecamatan Tanah Abang', budget: 1000000, actualCost: 1000000, paid: 600000, dueDate: wpSample_getPastDate(10), status: 'Sebagian', fundSource: 'Tabungan Bersama', notes: 'PNBP Rp 600.000 sudah disetor ke bank via SIMKAH' }
    ];

    // 6. Guests (Demonstrates WhatsApp integration & table assignment)
    const g1 = wpSample_generateId(), g2 = wpSample_generateId(), g3 = wpSample_generateId(), g4 = wpSample_generateId(), g5 = wpSample_generateId(), g6 = wpSample_generateId(), g7 = wpSample_generateId(), g8 = wpSample_generateId(), g9 = wpSample_generateId(), g10 = wpSample_generateId();
    weddingData.guests = [
        { id: g1, name: 'Bpk. Dr. H. Bambang Susanto & Ibu', tag: 'Keluarga Pengantin Wanita', side: 'Wanita', phone: '081122334455', guestCount: 4, address: 'Jl. Bukit Hijau No. 12, Pondok Indah, Jaksel', rsvp: 'Hadir', table: 'VIP 1 (Keluarga Inti)', invitationSent: true, souvenirGiven: false, notes: 'Wali Nikah & Keluarga Inti Nabila' },
        { id: g2, name: 'Bpk. H. Rahmat Rahardjo & Keluarga', tag: 'Keluarga Pengantin Pria', side: 'Pria', phone: '081233445566', guestCount: 6, address: 'Jl. Dharmahusada Indah No. 8, Surabaya', rsvp: 'Hadir', table: 'VIP 2 (Keluarga Inti)', invitationSent: true, souvenirGiven: false, notes: 'Keluarga Inti Dimas (Kamar Hotel 1204)' },
        { id: g3, name: 'Prof. Dr. Ir. Hendra Gunawan & Istri', tag: 'Keluarga Pengantin Pria', side: 'Pria', phone: '081388990011', guestCount: 2, address: 'Kebayoran Baru, Jakarta Selatan', rsvp: 'Hadir', table: 'VIP 1 (Keluarga Inti)', invitationSent: true, souvenirGiven: false, notes: 'Saksi Nikah Resmi dari Pihak Pria' },
        { id: g4, name: 'Dr. Sisca Wijaya, Sp.A & Suami', tag: 'Teman Pengantin Wanita', side: 'Wanita', phone: '081288991122', guestCount: 2, address: 'Pantai Indah Kapuk, Jakarta Utara', rsvp: 'Hadir', table: 'Meja 1 (Sahabat SMA)', invitationSent: true, souvenirGiven: false, notes: 'Sahabat SMA Nabila' },
        { id: g5, name: 'Reza Pratama, S.E. & Pasangan', tag: 'Teman Pengantin Pria', side: 'Pria', phone: '081377889900', guestCount: 2, address: 'Kuningan, Jakarta Selatan', rsvp: 'Hadir', table: 'Meja 1 (Sahabat SMA)', invitationSent: true, souvenirGiven: false, notes: 'Sahabat Kuliah Dimas' },
        { id: g6, name: 'Dimas Prasetyo (Groomsman)', tag: 'Pengiring Pria', side: 'Pria', phone: '081555667788', guestCount: 1, address: 'Kemang, Jakarta Selatan', rsvp: 'Hadir', table: 'Meja 2 (Bridesmaid & Groomsmen)', invitationSent: true, souvenirGiven: true, notes: 'Best Man / Pembawa Cincin' },
        { id: g7, name: 'Nadine Aurelia (Bridesmaid)', tag: 'Pengiring Wanita', side: 'Wanita', phone: '081677889900', guestCount: 1, address: 'Senopati, Jakarta Selatan', rsvp: 'Hadir', table: 'Meja 2 (Bridesmaid & Groomsmen)', invitationSent: true, souvenirGiven: true, notes: 'Maid of Honor / Pendamping Pengantin' },
        { id: g8, name: 'Andi Setiawan & Tim Kantor', tag: 'Teman Kerja Pengantin Pria', side: 'Pria', phone: '081299883344', guestCount: 4, address: 'SCBD Sudirman, Jakarta', rsvp: 'Mungkin', table: '', invitationSent: true, souvenirGiven: false, notes: 'Rekan Divisi Tech & Product' },
        { id: g9, name: 'Keluarga Bpk. H. Sukardi', tag: 'Keluarga Pengantin Wanita', side: 'Wanita', phone: '081255443322', guestCount: 5, address: 'Dago, Bandung', rsvp: 'Tidak Hadir', table: '', invitationSent: true, souvenirGiven: true, notes: 'Kirim karangan bunga & transfer kado' },
        { id: g10, name: 'Rekan Divisi Brand Marketing', tag: 'Teman Kerja Pengantin Wanita', side: 'Wanita', phone: '081344556677', guestCount: 8, address: 'Mega Kuningan, Jakarta', rsvp: 'Belum Dikonfirmasi', table: '', invitationSent: false, souvenirGiven: false, notes: 'Undangan fisik akan diantar langsung' }
    ];

    // 7. Seating (Demonstrates unassigned banner: 3 groups not assigned yet)
    weddingData.seating = [
        { id: wpSample_generateId(), name: 'VIP 1 (Keluarga Inti)', capacity: 8, guests: ['Bpk. Dr. H. Bambang Susanto & Ibu', 'Prof. Dr. Ir. Hendra Gunawan & Istri'] },
        { id: wpSample_generateId(), name: 'VIP 2 (Keluarga Inti)', capacity: 8, guests: ['Bpk. H. Rahmat Rahardjo & Keluarga'] },
        { id: wpSample_generateId(), name: 'Meja 1 (Sahabat SMA)', capacity: 8, guests: ['Dr. Sisca Wijaya, Sp.A & Suami', 'Reza Pratama, S.E. & Pasangan'] },
        { id: wpSample_generateId(), name: 'Meja 2 (Bridesmaid & Groomsmen)', capacity: 6, guests: ['Dimas Prasetyo (Groomsman)', 'Nadine Aurelia (Bridesmaid)'] },
        { id: wpSample_generateId(), name: 'Meja 3 (Kolega Kantor)', capacity: 10, guests: [] }
    ];

    // 8. Gifts
    weddingData.gifts = [
        { id: wpSample_generateId(), giver: 'Dr. Sisca Wijaya, Sp.A & Keluarga', type: 'Transfer', value: 'Rp 25.000.000', dateReceived: wpSample_getPastDate(2), thankYouSent: true, thankYouDate: wpSample_getPastDate(1), notes: 'Via BCA, ucapan selamat via WhatsApp' },
        { id: wpSample_generateId(), giver: 'Keluarga Besar Bpk. H. Rahmat Rahardjo', type: 'Barang', value: 'Logam Mulia Emas Antam 25 Gram', dateReceived: wpSample_getPastDate(10), thankYouSent: true, thankYouDate: wpSample_getPastDate(8), notes: 'Kado pernikahan dari keluarga besar ayah Dimas' },
        { id: wpSample_generateId(), giver: 'Rekan Divisi Brand Marketing & Tech', type: 'Barang', value: 'Dyson Airwrap Multi-Styler & Vacuum', dateReceived: wpSample_getPastDate(1), thankYouSent: false, thankYouDate: '', notes: 'Hadiah patungan dikirim ke alamat rumah baru' }
    ];

    // 9. Wedding Party
    weddingData.weddingParty = [
        { id: wpSample_generateId(), name: 'Dimas Prasetyo', role: 'Pendamping Pengantin Pria', contact: '081555667788', attire: 'Jas Dark Charcoal (Wong Hang) + Dasi Champagne', tasks: 'Membawa cincin kawin saat akad, koordinasi mobil pengantin & foto groomsmen', notes: 'Ukuran Jas: L (Fitting selesai)' },
        { id: wpSample_generateId(), name: 'Nadine Aurelia', role: 'Pendamping Pengantin Wanita', contact: '081677889900', attire: 'Gaun Silk Lilac Sage + Corsage Mawar Putih', tasks: 'Memegang hand bouquet pengantin, merapikan train gaun, koordinasi ruang rias', notes: 'Ukuran Gaun: M (Sudah diambil)' },
        { id: wpSample_generateId(), name: 'Bpk. Dr. H. Bambang Susanto, M.M.', role: 'Wali Nikah', contact: '081122334455', attire: 'Beskap Tradisional Jawa Solo Modern + Blangkon', tasks: 'Mengikrarkan ijab qabul di depan penghulu KUA', notes: 'Ayah kandung Nabila' },
        { id: wpSample_generateId(), name: 'Prof. Dr. Ir. Hendra Gunawan', role: 'Saksi', contact: '081388990011', attire: 'Jas Formal Gelap + Peci Hitam', tasks: 'Menandatangani buku nikah sebagai saksi pihak pria', notes: 'Paman dari pihak ayah Dimas' },
        { id: wpSample_generateId(), name: 'Raffi & Rayyan', role: 'Pembawa Cincin', contact: '081244556677 (Ibu Yuni)', attire: 'Setelan Jas Mini Tuxedo', tasks: 'Membawa kotak cincin ukir akrilik saat prosesi cincin', notes: 'Keponakan pengantin wanita (usia 6 tahun)' }
    ];

    // 10. Packing List
    weddingData.packing = [
        { id: wpSample_generateId(), name: 'Buku Nikah Asli (2 Buku) & Map Dokumen KUA', category: 'Akad', quantity: 2, carrier: 'Mbak Rina Wijaya', destination: 'Meja Akad Nikah Ballroom', packed: true, notes: 'Diserahkan oleh penghulu selesai ijab qabul' },
        { id: wpSample_generateId(), name: 'Kotak Cincin Kawin & Perhiasan Mahar', category: 'Akad', quantity: 1, carrier: 'Dimas Prasetyo', destination: 'Meja Akad', packed: true, notes: 'Disimpan di safety box kamar suite' },
        { id: wpSample_generateId(), name: 'Uang Mahar Pigura & Logam Mulia Antam', category: 'Akad', quantity: 1, carrier: 'Bapak Surya Atmaja', destination: 'Meja Akad', packed: true, notes: 'Dicek keaslian sertifikat Antam' },
        { id: wpSample_generateId(), name: 'Gaun Resepsi Modern & Veil Pengantin', category: 'Resepsi', quantity: 1, carrier: 'Nabila Safira Anindya', destination: 'Ruang Rias VIP Suite', packed: false, notes: 'Sudah di-steam oleh butik' },
        { id: wpSample_generateId(), name: 'Tuxedo Pria & Sepatu Pantofel Bespoke', category: 'Resepsi', quantity: 1, carrier: 'Dimas Arya Pratama', destination: 'Kamar Suite 1202', packed: false, notes: 'Beserta dasi kupu-kupu & cufflinks' },
        { id: wpSample_generateId(), name: 'Kotak Angpao Gembok & Kunci Cadangan', category: 'Resepsi', quantity: 2, carrier: 'Ibu Hj. Yuni Astuti', destination: 'Meja Penerima Tamu Foyer', packed: true, notes: 'Kunci dipegang Ibu Yuni & Tante Tari' },
        { id: wpSample_generateId(), name: 'Buku Tamu Resepsi & Spidol Emas', category: 'Resepsi', quantity: 4, carrier: 'Mbak Rina Wijaya', destination: 'Meja Penerima Tamu', packed: true, notes: 'Beserta lembar absensi cetak backup' },
        { id: wpSample_generateId(), name: 'Souvenir Reed Diffuser (500 Box)', category: 'Vendor', quantity: 500, carrier: 'Kencana Luxury Souvenir', destination: 'Gudang Logistik Ballroom', packed: true, notes: 'Tiba di venue H-1 sore' },
        { id: wpSample_generateId(), name: 'Seserahan & Hantaran Pengantin (11 Box)', category: 'Akad', quantity: 11, carrier: 'Keluarga Pengantin Pria', destination: 'Holding Room Akad', packed: true, notes: 'Box akrilik berpita satin champagne' },
        { id: wpSample_generateId(), name: 'Emergency Kit & Obat-obatan Pribadi', category: 'Lainnya', quantity: 1, carrier: 'Nadine Aurelia', destination: 'Ruang Rias Pengantin', packed: true, notes: 'Minyak kayu putih, tolak angin, plester kaki, permen' }
    ];

    // 11. Events (Save the date)
    weddingData.events = [
        { id: wpSample_generateId(), name: 'Lamaran & Pertemuan Keluarga', date: wpSample_getPastDate(90), time: '10:00', location: 'Plataran Menteng, Jakarta Pusat', notes: 'Tukar cincin tunangan, penyerahan hantaran buah & kue. Dresscode batik.' },
        { id: wpSample_generateId(), name: 'Foto Prewedding Studio & Outdoor', date: wpSample_getPastDate(45), time: '06:00', location: 'Kebun Raya Bogor & Studio Lumina', notes: 'Tema formal modern & kasual outdoor.' },
        { id: wpSample_generateId(), name: 'Pengajian Pranikah & Siraman', date: sampleFutureDate(72), time: '09:00', location: 'Kediaman Keluarga Anindya, Bintaro', notes: 'Doa bersama 100 tamu, pembagian buku pengajian & souvenir sajadah.' },
        { id: wpSample_generateId(), name: 'Akad Nikah Adat & Syukuran', date: wedDate, time: '08:00', location: 'Grand Ballroom Section A, Hotel Mulia', notes: 'Ijab qabul dengan busana adat Jawa Solo modern, dilanjutkan prosesi panggih.' },
        { id: wpSample_generateId(), name: 'Resepsi Pernikahan (Grand Wedding)', date: wedDate, time: '19:00', location: 'Grand Ballroom Hotel Mulia Senayan', notes: 'Resepsi modern internasional dengan 500 tamu undangan.' }
    ];

    // 12. Rundown (Cross-linked to Contacts & Vendors)
    weddingData.rundown = [
        { id: wpSample_generateId(), activity: 'Make Up & Rias Pengantin Wanita', startTime: '04:30', endTime: '07:00', location: 'Ruang Rias Suite 1201', pic: 'Mbak Rina Wijaya', vendor: 'Bennu Sorumba Makeup', notes: 'Nabila dan kedua Ibu pengantin. Sarapan ringan disediakan hotel.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Persiapan & Fitting Jas Pengantin Pria', startTime: '06:00', endTime: '07:00', location: 'Kamar Suite 1202', pic: 'Dimas Prasetyo', vendor: 'Wong Hang Distinguished Tailor', notes: 'Groomsmen standby membantu persiapan.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Briefing Final Seluruh Vendor & Kru', startTime: '07:00', endTime: '07:30', location: 'Ballroom Foyer', pic: 'Mbak Rina Wijaya', vendor: 'The Signature Wedding Organizer', notes: 'Cek kesiapan sound system, display foto, catering, dan meja KUA.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Prosesi Akad Nikah & Ijab Qabul', startTime: '08:00', endTime: '09:30', location: 'Area Akad Ballroom', pic: 'Ust. Ahmad Fauzi (KUA Tanah Abang)', vendor: 'KUA Kecamatan Tanah Abang', notes: "Khitbah, pembacaan ayat suci Al-Qur'an, ijab qabul, doa, dan penyerahan buku nikah.", date: wedDate },
        { id: wpSample_generateId(), activity: 'Sesi Foto Keluarga Inti & Mahar', startTime: '09:30', endTime: '10:30', location: 'Pelaminan Akad', pic: 'Mbak Rina Wijaya', vendor: 'Lumina Pictures', notes: 'Daftar nama keluarga inti dipandu oleh WO.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Istirahat, Makan Siang & Retouch Busana Resepsi', startTime: '11:00', endTime: '16:00', location: 'Suite Room Hotel Mulia', pic: 'Ibu Hj. Yuni Astuti', vendor: 'Bennu Sorumba Makeup', notes: 'Pengantin istirahat tidur siang. Makan siang diantarkan room service.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Gladi Bersih Grand Entrance & Soundcheck Band', startTime: '16:30', endTime: '17:30', location: 'Main Ballroom', pic: 'Mbak Rina Wijaya', vendor: 'Lala Entertainment & Orchestra', notes: 'Pengantin, orang tua, bridesmaid & groomsman ikut gladi posisi jalan.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Open Gate & Registrasi Tamu Resepsi', startTime: '18:30', endTime: '19:00', location: 'Foyer Meja Penerima Tamu', pic: 'Ibu Hj. Yuni Astuti', vendor: 'The Signature Wedding Organizer', notes: 'Meja penerima tamu aktif, pengisian buku tamu & pembagian souvenir.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Grand Entrance Pengantin & Keluarga', startTime: '19:00', endTime: '19:20', location: 'Main Ballroom & Pelaminan', pic: 'Mbak Rina Wijaya', vendor: 'Lala Entertainment & Orchestra', notes: 'Lagu grand entrance: A Thousand Years dibawakan orkestra chamber.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Sambutan, Doa Restu & Ramah Tamah (Dinner)', startTime: '19:20', endTime: '21:00', location: 'Main Ballroom', pic: 'Bapak Surya Atmaja', vendor: 'Puspa Catering Services', notes: 'Buffet dan seluruh food stall dibuka. Tamu VIP bersalaman di pelaminan.', date: wedDate },
        { id: wpSample_generateId(), activity: 'Lempar Hand Bouquet & After Party Mingle', startTime: '21:00', endTime: '22:30', location: 'Dance Floor Ballroom', pic: 'Dimas Prasetyo', vendor: 'Lala Entertainment & Orchestra', notes: 'Pengantin berganti gaun pesta ringan, foto bersama teman-teman.', date: wedDate }
    ];

    // 13. Food & Drinks
    weddingData.foodDrinks = [
        { id: wpSample_generateId(), name: 'Kambing Guling Muda & Lontong', category: 'Stall', vendor: 'Puspa Catering Services', price: 65000, quantity: 400, notes: 'Menu favorit tamu, sajikan lengkap dengan kecap rawit & acar timun', selected: true },
        { id: wpSample_generateId(), name: 'Salmon En Croute with Creamy Dill Sauce', category: 'Stall', vendor: 'Puspa Catering Services', price: 85000, quantity: 250, notes: 'Kulit pastry renyah, saus disajikan hangat', selected: true },
        { id: wpSample_generateId(), name: 'Zuppa Soup Creamy Chicken & Mushroom', category: 'Appetizer', vendor: 'Puspa Catering Services', price: 35000, quantity: 500, notes: 'Disajikan langsung dari oven pemanas di stall', selected: true },
        { id: wpSample_generateId(), name: 'Sate Ayam Madura & Lontong', category: 'Stall', vendor: 'Puspa Catering Services', price: 45000, quantity: 400, notes: 'Daging empuk tanpa lemak, bumbu kacang medok', selected: true },
        { id: wpSample_generateId(), name: 'Nasi Pandan Wangi & Beef Teriyaki', category: 'Main Course', vendor: 'Puspa Catering Services', price: 55000, quantity: 500, notes: 'Menu buffet utama, daging sapi empuk saus teriyaki gurih', selected: true },
        { id: wpSample_generateId(), name: 'Es Puter Kelapa Kopyor & Durian', category: 'Dessert', vendor: 'Puspa Catering Services', price: 25000, quantity: 400, notes: 'Disajikan di gelas kaca mini dengan topping nangka & ketan hitam', selected: true },
        { id: wpSample_generateId(), name: 'Wedding Cake 5 Tier Floral Cascading', category: 'Wedding Cake', vendor: 'Le Novelle Cake', price: 15000000, quantity: 1, notes: 'Kue dekoratif 5 tingkat dengan bunga gula edible, tingkat dasar rasa Chocolate Fudge', selected: true }
    ];

    // 14. Photos Checklist
    weddingData.photos = [
        { id: wpSample_generateId(), shot: 'Detail Cincin Kawin di atas Mahar Akrilik & Undangan', category: 'Detail', priority: 'Tinggi', time: '05:30', location: 'Kamar Pengantin', notes: 'Komposisi flat-lay bersama parfum & sepatu', completed: false },
        { id: wpSample_generateId(), shot: 'Proses Pemasangan Veil & Riasan Final Nabila', category: 'Persiapan Pengantin', priority: 'Tinggi', time: '06:30', location: 'Ruang Rias Suite', notes: 'Close-up mata dan senyuman pengantin wanita', completed: false },
        { id: wpSample_generateId(), shot: 'First Look: Reaksi Dimas pertama kali melihat Nabila berbusana pengantin', category: 'Couple', priority: 'Sangat Tinggi', time: '07:15', location: 'Lobby Lounge Mulia', notes: 'Momen sangat emosional, kamera video dan foto stand by candid', completed: false },
        { id: wpSample_generateId(), shot: 'Momen Ijab Qabul: Jabat Tangan Wali & Pengantin Pria', category: 'Akad', priority: 'Sangat Tinggi', time: '08:15', location: 'Meja Akad Ballroom', notes: 'Fokus ekspresi wajah Dimas & Ayah Nabila saat ijab', completed: false },
        { id: wpSample_generateId(), shot: 'Pamer Buku Nikah & Cincin Kawin Bersama', category: 'Akad', priority: 'Sangat Tinggi', time: '09:00', location: 'Pelaminan Akad', notes: 'Pose resmi untuk album cetak', completed: false },
        { id: wpSample_generateId(), shot: 'Sungkeman: Pelukan Haru Pengantin dengan Orang Tua', category: 'Candid', priority: 'Sangat Tinggi', time: '09:15', location: 'Area Pelaminan', notes: 'Tangkap air mata bahagia dan pelukan erat', completed: false },
        { id: wpSample_generateId(), shot: 'Pose Kompak Bridesmaid & Groomsmen Melempar Bunga', category: 'Bridesmaid/Groomsman', priority: 'Sedang', time: '10:15', location: 'Taman Kaca Foyer', notes: 'Gaya bebas ceria penuh tawa', completed: false },
        { id: wpSample_generateId(), shot: 'Grand Entrance di bawah Chandelier Lampu Gantung', category: 'Resepsi', priority: 'Tinggi', time: '19:05', location: 'Main Ballroom', notes: 'Sudut pandang simetris dari belakang tamu menghadap pelaminan', completed: false },
        { id: wpSample_generateId(), shot: 'Foto Khusus Bersama Kakek & Nenek di Kursi Roda', category: 'Special Request', priority: 'Sangat Tinggi', time: '19:45', location: 'Samping Pelaminan VIP', notes: 'Prioritas utama agar kakek nenek tidak lelah menunggu', completed: false }
    ];

    // 15. Honeymoon
    weddingData.honeymoon = {
        destination: {
            country: 'Maldives',
            city: 'Male & South Ari Atoll',
            departureDate: sampleFutureDate(78),
            returnDate: sampleFutureDate(84),
            currency: 'USD',
            budget: 45000000
        },
        itinerary: [
            { id: wpSample_generateId(), date: sampleFutureDate(78), time: '08:00', activity: 'Penerbangan Singapore Airlines CGK-SIN-MLE', location: 'Bandara Soekarno-Hatta (CGK) Terminal 3', cost: 14000000, notes: 'Bawa paspor, tiket PP, dan sertifikat pernikahan' },
            { id: wpSample_generateId(), date: sampleFutureDate(78), time: '16:00', activity: 'Transfer Seaplane ke Resort Water Villa', location: 'Male Seaplane Terminal', cost: 6000000, notes: 'Pemandangan atol spektakuler dari udara' },
            { id: wpSample_generateId(), date: sampleFutureDate(78), time: '18:00', activity: 'Check-in Sunset Ocean Villa with Private Pool', location: 'Ayada Maldives Resort', cost: 0, notes: 'Welcome drink kelapa muda & honeymoon cake complimentary' },
            { id: wpSample_generateId(), date: sampleFutureDate(79), time: '08:30', activity: 'Floating Breakfast di Kolam Renang Pribadi', location: 'Private Villa Pool', cost: 1500000, notes: 'Momen foto estetik pagi hari' },
            { id: wpSample_generateId(), date: sampleFutureDate(80), time: '10:00', activity: 'Snorkeling Trip Bersama Penyu & Manta Ray', location: 'House Reef Ayada', cost: 2500000, notes: 'Perlengkapan snorkeling disediakan dive center' },
            { id: wpSample_generateId(), date: sampleFutureDate(81), time: '19:00', activity: 'Romantic Private Candlelight Dinner di Tepi Pantai', location: 'Beachfront Gazebo', cost: 4000000, notes: 'Set menu 4 course seafood, dekorasi lilin & obor romantis' },
            { id: wpSample_generateId(), date: sampleFutureDate(82), time: '14:00', activity: 'Couples Spa Massage Aromatherapy', location: 'The Secret Garden AySpa', cost: 3000000, notes: 'Perawatan relaksasi 90 menit' },
            { id: wpSample_generateId(), date: sampleFutureDate(84), time: '13:00', activity: 'Penerbangan Pulang Menuju Jakarta', location: 'Velana International Airport (MLE)', cost: 14000000, notes: 'Transit di Changi Singapore belanja oleh-oleh' }
        ],
        bookings: {
            flights: [],
            hotels: [],
            transport: [],
            activities: [],
            restaurants: []
        },
        expenses: [
            { id: wpSample_generateId(), date: wpSample_getPastDate(10), category: 'Penerbangan', description: 'Tiket Pesawat Singapore Airlines CGK-MLE PP (2 Pax)', amount: 28000000 },
            { id: wpSample_generateId(), date: wpSample_getPastDate(5), category: 'Hotel', description: 'DP 50% Ayada Maldives Resort (5 Hari 4 Malam)', amount: 15000000 },
            { id: wpSample_generateId(), date: wpSample_getPastDate(2), category: 'Belanja', description: 'Koper Rimowa Cabin & Perlengkapan Pantai', amount: 5500000 }
        ]
    };

    // 16. KUA Checklist
    const kuaChecklist = JSON.parse(JSON.stringify(wpSample_KUA_CHECKLIST));
    kuaChecklist.persiapanAwal.forEach(item => {
        if (['ktp_suami', 'ktp_istri', 'kk', 'akta_lahir', 'pas_foto', 'surat_rt_rw', 'surat_kelurahan'].includes(item.id)) item.checked = true;
    });
    kuaChecklist.formulirNikah.forEach(item => {
        if (['n1', 'n2', 'n3'].includes(item.id)) item.checked = true;
    });
    kuaChecklist.pendaftaran.forEach(item => {
        if (['persiapkan_dokumen', 'daftar_online', 'pembayaran'].includes(item.id)) item.checked = true;
    });
    weddingData.kuaChecklist = kuaChecklist;

    // 17. Timeline Tasks
    weddingData.timeline = [
        { id: wpSample_generateId(), period: '12plus', task: 'Tentukan Tanggal & Konsep Pernikahan', deadline: wpSample_getPastDate(60), assignee: 'Dimas & Nabila', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: true, notes: 'Konsep adat Jawa Solo & modern' },
        { id: wpSample_generateId(), period: '12plus', task: 'Booking Grand Ballroom Hotel Mulia', deadline: wpSample_getPastDate(45), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Venue', completed: true, notes: 'DP 50% lunas' },
        { id: wpSample_generateId(), period: '6to12', task: 'Pilih & Kontrak Wedding Organizer (The Signature)', deadline: wpSample_getPastDate(35), assignee: 'Nabila', priority: 'Tinggi', category: 'Vendor', completed: true, notes: 'Full planning 12 crew' },
        { id: wpSample_generateId(), period: '6to12', task: 'Food Tasting & Finalisasi Menu Puspa Catering', deadline: wpSample_getPastDate(15), assignee: 'Keluarga Besar', priority: 'Tinggi', category: 'Vendor', completed: true, notes: 'Kambing guling & salmon di-acc' },
        { id: wpSample_generateId(), period: '3to6', task: 'Fitting Pertama Jas Wong Hang & Gaun Resepsi', deadline: wpSample_getPastDate(10), assignee: 'Dimas & Nabila', priority: 'Tinggi', category: 'Busana', completed: true, notes: 'Fitting kedua dijadwalkan' },
        { id: wpSample_generateId(), period: '3to6', task: 'Daftar Online SIMKAH & Lengkapi Berkas KUA', deadline: sampleFutureDate(10), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: false, notes: 'Verifikasi berkas fisik ke KUA Tanah Abang' },
        { id: wpSample_generateId(), period: '1to3', task: 'Distribusi Undangan Fisik & Kirim WhatsApp', deadline: sampleFutureDate(25), assignee: 'Nabila & Tim WO', priority: 'Tinggi', category: 'Undangan', completed: false, notes: 'Gunakan fitur 1-klik WA di aplikasi' },
        { id: wpSample_generateId(), period: '1to3', task: 'Beli Cincin Kawin & Perhiasan Mahar', deadline: sampleFutureDate(35), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: false, notes: 'Frank & Co Plaza Indonesia' },
        { id: wpSample_generateId(), period: '2to4weeks', task: 'Final Technical Meeting (TM) Seluruh Vendor di Venue', deadline: sampleFutureDate(60), assignee: 'Dimas, Nabila & WO', priority: 'Sangat Tinggi', category: 'Vendor', completed: false, notes: 'Hotel Mulia Senayan' },
        { id: wpSample_generateId(), period: '1week', task: 'Pengajian Pranikah & Siraman di Rumah', deadline: sampleFutureDate(72), assignee: 'Keluarga Nabila', priority: 'Tinggi', category: 'Acara', completed: false, notes: 'Bintaro' },
        { id: wpSample_generateId(), period: 'dayof', task: 'Hari H: Akad Nikah & Resepsi Pernikahan', deadline: wedDate, assignee: 'Dimas & Nabila', priority: 'Sangat Tinggi', category: 'Acara', completed: false, notes: 'Grand Ballroom Hotel Mulia' },
        { id: wpSample_generateId(), period: 'after', task: 'Keberangkatan Honeymoon ke Maldives', deadline: sampleFutureDate(78), assignee: 'Dimas & Nabila', priority: 'Sedang', category: 'Perencanaan', completed: false, notes: 'Singapore Airlines' }
    ];

    return wpSample_customizeSampleData(wpSample_enrichSampleData(weddingData), scenario);
}

function wpSample_getFutureDate(daysAhead) {
    return wpSample_getSampleDate(daysAhead);
}

function wpSample_getPastDate(daysAgo) {
    return wpSample_getSampleDate(-daysAgo);
}

function wpSample_enrichDenseSample(data) {
    const names = ['Alya Putri', 'Bagas Prakoso', 'Citra Lestari', 'Dewi Laras', 'Eko Saputra', 'Farah Aulia', 'Gilang Mahendra', 'Hana Kirana', 'Indra Wijaya', 'Jihan Maharani', 'Kevin Aditya', 'Laras Permata'];
    names.forEach((name, i) => {
        data.guests.push({ ...data.guests[0], id: wpSample_generateId(), name, phone: '0812200'+String(i+1).padStart(5,'0'), tag: data.settings.guestTags[i % data.settings.guestTags.length], rsvp: wpSample_RSVP_STATUSES[i % wpSample_RSVP_STATUSES.length], table: '', guestCount: i % 3 + 1, invitationSent: i % 2 === 0, souvenirGiven: false, notes: 'Tamu simulasi untuk pengujian RSVP, pencarian, dan penempatan meja.\nKonfirmasi jumlah rombongan sebelum finalisasi.' });
        data.contacts.push({ ...data.contacts[0], id: wpSample_generateId(), name: 'Koordinator '+name, email: 'koordinator'+i+'@example.com', phone: '0812300'+String(i+1).padStart(5,'0'), whatsapp: '0812300'+String(i+1).padStart(5,'0') });
        data.venues.push({ ...data.venues[2], id: wpSample_generateId(), name: 'Alternatif venue '+name, price: 35000000+i*2500000, capacity: 200+i*25, selected: false });
        data.foodDrinks.push({ ...data.foodDrinks[0], id: wpSample_generateId(), name: 'Menu alternatif '+name, category: wpSample_FOOD_CATEGORIES[i % wpSample_FOOD_CATEGORIES.length], selected: i % 2 === 0 });
        data.photos.push({ ...data.photos[0], id: wpSample_generateId(), shot: 'Sesi dokumentasi '+name, category: wpSample_PHOTO_CATEGORIES[i % wpSample_PHOTO_CATEGORIES.length], priority: wpSample_PRIORITIES[i % wpSample_PRIORITIES.length], completed: i % 2 === 0 });
        data.packing.push({ ...data.packing[0], id: wpSample_generateId(), name: 'Perlengkapan tim '+name, category: wpSample_PACKING_CATEGORIES[i % wpSample_PACKING_CATEGORIES.length], packed: i % 2 === 0 });
        data.weddingParty.push({ ...data.weddingParty[0], id: wpSample_generateId(), name: 'Koordinator '+name, contact: '0812300'+String(i+1).padStart(5,'0'), role: data.settings.weddingRoles[i % data.settings.weddingRoles.length], notes: 'PIC contoh untuk koordinasi rombongan dan dokumentasi.' });
        data.rundown.push({ id: wpSample_generateId(), activity: 'Koordinasi kedatangan rombongan '+name, startTime: '06:'+String(i*5).padStart(2,'0'), endTime: '07:'+String(i*5).padStart(2,'0'), location: 'Area drop-off dan meja registrasi', pic: 'Koordinator '+name, vendor: data.vendors.find(vendor => vendor.category === 'Wedding Organizer').name, notes: 'Agenda simulasi paralel untuk penerimaan rombongan, akses kursi roda, dan distribusi informasi.', date: data.settings.weddingDate });
        data.seating.push({ id: wpSample_generateId(), name: 'Meja rombongan '+(i+1), capacity: 8, guests: [] });
        data.gifts.push({ ...data.gifts[0], id: wpSample_generateId(), giver: name, value: 'Rp '+(500000+i*100000), dateReceived: wpSample_getSampleDate(-i), thankYouSent: i % 2 === 0, thankYouDate: i % 2 === 0 ? wpSample_getSampleDate(0) : '', notes: 'Hadiah simulasi; verifikasi pencatatan dan status ucapan.' });
        data.honeymoon.itinerary.push({ ...data.honeymoon.itinerary[3], id: wpSample_generateId(), activity: 'Agenda perjalanan '+(i+1)+': jalan santai dan wisata lokal', date: data.honeymoon.destination.departureDate });
        data.honeymoon.expenses.push({ id: wpSample_generateId(), date: wpSample_getSampleDate(-i), category: 'Lainnya', description: 'Pengeluaran perjalanan simulasi '+(i+1), amount: 150000+i*25000 });
        const section = Object.keys(data.kuaChecklist)[i % 4];
        data.kuaChecklist[section].push({ id: wpSample_generateId(), name: 'Verifikasi administrasi tambahan '+(i+1)+' (simulasi)', checked: i % 2 === 0, notes: i % 3 ? 'Konfirmasi kebutuhan dokumen ini kepada petugas; bukan persyaratan resmi.' : '' });
    });
}
