// ========================================
// CONSTANTS & CONFIG
// ========================================
const STORAGE_KEY = 'weddingPlannerData';
const DATA_VERSION = 1;
const ASSET_VERSION = '20261014browser';
const DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const ICONS = {
    menu: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    // Navigation & General
    dashboard: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    settings: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    timeline: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    rundown: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    events: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    packing: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    vendors: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    contacts: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    calendar: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',
    budget: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    guests: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    weddingParty: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    venues: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    foodDrinks: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    seating: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="14" rx="1"/><rect x="14" y="3" width="7" height="14" rx="1"/><line x1="3" y1="17" x2="10" y2="17"/><line x1="14" y1="17" x2="21" y2="17"/><line x1="3" y1="21" x2="10" y2="21"/><line x1="14" y1="21" x2="21" y2="21"/></svg>',
    photos: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    gifts: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    honeymoon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
    kua: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',

    // UI Controls
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    del: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    chevronDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    warningSmall: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-baseline"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    whatsapp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    print: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',

    // KPI & General App Icons
    card: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="6" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    checkCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    clipboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
    listChecks: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h2l1 1 3-3 3 3 1-1h2"/><path d="M3 13h2l1 1 3-3 3 3 1-1h2"/><path d="M3 21h2l1 1 3-3 3 3 1-1h2"/></svg>',
    barChart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',

    // Empty States
    emptyDoc: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    emptyInbox: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',

    // Utilities
    infoCircle: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    calendarEmpty: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">\r\n                        <rect x="3" y="4" rx="2"/>\r\n                        <line x1="16" y1="2" x2="16" y2="6"/>\r\n                        <line x1="8" y1="2" x2="8" y2="6"/>\r\n                        <line x1="3" y1="10" x2="21" y2="10"/>\r\n                        <line x1="12" y1="14" x2="12" y2="18"/>\r\n                        <line x1="10" y1="16" x2="14" y2="16"/>\r\n                    </svg>',
    uploadData: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>\r\n                            <polyline points="7 10 12 15 17 10"></polyline>\r\n                            <line x1="12" y1="15" x2="12" y2="3"></line>\r\n                        </svg>',
    downloadData: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>\r\n                            <polyline points="17 8 12 3 7 8"></polyline>\r\n                            <line x1="12" y1="3" x2="12" y2="15"></line>\r\n                        </svg>',
    databaseData: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n                            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>\r\n                        </svg>',
    saveCheck: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>\n                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>\n                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>\n                    </svg>'
};


const NAV_SECTIONS = [
    {
        title: 'Utama',
        items: [
            { id: 'dashboard', icon: ICONS.dashboard, label: 'Dashboard' },
            { id: 'calendar', icon: ICONS.calendar, label: 'Kalender & Agenda' }
        ]
    },
    {
        title: 'Perencanaan & Anggaran',
        items: [
            { id: 'budget', icon: ICONS.budget, label: 'Anggaran' },
            { id: 'kua', icon: ICONS.kua, label: 'Checklist KUA' },
            { id: 'timeline', icon: ICONS.timeline, label: 'Timeline Persiapan' },
            { id: 'events', icon: ICONS.events, label: 'Simpan Tanggal Acara' }
        ]
    },
    {
        title: 'Vendor & Tempat',
        items: [
            { id: 'venues', icon: ICONS.venues, label: 'Pilihan Tempat Acara' },
            { id: 'vendors', icon: ICONS.vendors, label: 'Pilihan Vendor' },
            { id: 'foodDrinks', icon: ICONS.foodDrinks, label: 'Makanan & Minuman' },
            { id: 'packing', icon: ICONS.packing, label: 'Daftar Bawaan' }
        ]
    },
    {
        title: 'Tamu & Acara',
        items: [
            { id: 'guests', icon: ICONS.guests, label: 'Daftar Tamu' },
            { id: 'seating', icon: ICONS.seating, label: 'Rencana Duduk Tamu' },
            { id: 'weddingParty', icon: ICONS.weddingParty, label: 'Pesta Pernikahan' },
            { id: 'gifts', icon: ICONS.gifts, label: 'Hadiah & Ucapan' }
        ]
    },
    {
        title: 'Hari H & Pasca Acara',
        items: [
            { id: 'rundown', icon: ICONS.rundown, label: 'Rundown Acara' },
            { id: 'photos', icon: ICONS.photos, label: 'Momen Foto' },
            { id: 'contacts', icon: ICONS.contacts, label: 'Kontak Darurat' },
            { id: 'honeymoon', icon: ICONS.honeymoon, label: 'Bulan Madu' }
        ]
    },
    {
        title: 'Sistem',
        items: [
            { id: 'settings', icon: ICONS.settings, label: 'Pengaturan' }
        ]
    }
];

const NAV_ITEMS = NAV_SECTIONS.flatMap(s => s.items);

const PAGE_RENDERERS = {
    dashboard: renderDashboard,
    settings: renderSettings,
    timeline: renderTimeline,
    rundown: renderRundown,
    events: renderEvents,
    packing: renderPacking,
    vendors: renderVendors,
    contacts: renderContacts,
    calendar: renderCalendar,
    budget: renderBudget,
    guests: renderGuests,
    weddingParty: renderWeddingParty,
    venues: renderVenues,
    foodDrinks: renderFoodDrinks,
    seating: renderSeating,
    photos: renderPhotos,
    gifts: renderGifts,
    honeymoon: renderHoneymoon,
    kua: renderKUA
};

const PAGE_INITIALIZERS = {
    settings: initSettingsEvents,
    timeline: initTimelineEvents,
    rundown: initRundownEvents,
    packing: initPackingEvents,
    vendors: initVendorsEvents,
    contacts: initContactsEvents,
    budget: initBudgetEvents,
    guests: initGuestsEvents,
};

const VENDOR_CATEGORIES = [
    'Wedding Organizer',
    'Fotografer',
    'Videografer',
    'Dekorasi',
    'Makeup Artist',
    'Busana',
    'Catering',
    'Entertainment',
    'MC',
    'Undangan',
    'Souvenir',
    'Transportasi',
    'Venue',
    'Lainnya'
];

const VENDOR_STATUSES = ['Dipertimbangkan', 'Dihubungi', 'Meeting', 'Terpilih', 'Ditolak'];
const VENDOR_STATUS_COLORS = ['var(--ink-4)', 'var(--ink-3)', 'var(--primary-soft)', 'var(--success)', 'var(--danger)'];

const PRIORITIES = ['Sangat Tinggi', 'Tinggi', 'Sedang', 'Rendah', 'Sangat Rendah'];

const RSVP_STATUSES = ['Belum Dikonfirmasi', 'Hadir', 'Tidak Hadir', 'Mungkin'];

const PAYMENT_STATUSES = ['Belum Dibayar', 'DP', 'Sebagian', 'Lunas'];

const BUDGET_CATEGORIES = [
    'Venue',
    'Catering',
    'Dekorasi',
    'Busana',
    'MUA',
    'Foto & Video',
    'Entertainment',
    'Undangan',
    'Souvenir',
    'KUA',
    'Transportasi',
    'Honeymoon',
    'Lainnya'
];

const TIMELINE_PERIODS = [
    { id: '12plus', label: '12+ Bulan Sebelum' },
    { id: '6to12', label: '6-12 Bulan Sebelum' },
    { id: '3to6', label: '3-6 Bulan Sebelum' },
    { id: '1to3', label: '1-3 Bulan Sebelum' },
    { id: '2to4weeks', label: '2-4 Minggu Sebelum' },
    { id: '1week', label: '1 Minggu Sebelum' },
    { id: 'dayof', label: 'Hari-H' },
    { id: 'after', label: 'Setelah Pernikahan' }
];

const FOOD_CATEGORIES = ['Appetizer', 'Main Course', 'Dessert', 'Stall', 'Minuman', 'Wedding Cake', 'Lainnya'];

const PHOTO_CATEGORIES = [
    'Persiapan Pengantin',
    'Detail',
    'Akad',
    'Keluarga',
    'Bridesmaid/Groomsman',
    'Couple',
    'Resepsi',
    'Dekorasi',
    'Candid',
    'Special Request'
];

const PACKING_CATEGORIES = ['Pengantin Pria', 'Pengantin Wanita', 'Akad', 'Resepsi', 'Vendor', 'Honeymoon', 'Lainnya'];

const DEFAULT_GUEST_TAGS = [
    'Keluarga Pengantin Wanita',
    'Teman Pengantin Wanita',
    'Teman Kerja Pengantin Wanita',
    'Keluarga Pengantin Pria',
    'Teman Pengantin Pria',
    'Teman Kerja Pengantin Pria',
    'Teman Pasangan',
    'Pengiring Pria',
    'Pengiring Wanita'
];

const DEFAULT_WEDDING_ROLES = [
    'Pengantin Wanita',
    'Pengantin Pria',
    'Pendamping Pengantin Wanita',
    'Pendamping Pengantin Pria',
    'Pembawa Cincin',
    'Pembawa Bunga',
    'Pembawa Kitab Suci',
    'Saksi',
    'Wali Nikah',
    'Pembawa Seserahan'
];

const DEFAULT_FUND_SOURCES = [
    'Pengantin',
    'Orang Tua Pengantin Wanita',
    'Orang Tua Pengantin Pria',
    'Keluarga',
    'Lainnya'
];

const KUA_CHECKLIST = {
    persiapanAwal: [
        { id: 'ktp_suami', name: 'Fotokopi KTP Calon Suami', checked: false },
        { id: 'ktp_istri', name: 'Fotokopi KTP Calon Istri', checked: false },
        { id: 'kk', name: 'Fotokopi KK', checked: false },
        { id: 'akta_lahir', name: 'Fotokopi Akta Kelahiran', checked: false },
        { id: 'pas_foto', name: 'Pas Foto', checked: false },
        { id: 'surat_belum_nikah', name: 'Surat Keterangan Belum Menikah', checked: false },
        { id: 'surat_rt_rw', name: 'Surat Pengantar RT/RW', checked: false },
        { id: 'surat_kelurahan', name: 'Surat Pengantar Kelurahan/Desa', checked: false }
    ],
    formulirNikah: [
        { id: 'n1', name: 'N1 - Surat Pengantar Nikah', checked: false },
        { id: 'n2', name: 'N2 - Surat Keterangan Asal-Usul', checked: false },
        { id: 'n3', name: 'N3 - Surat Persetujuan Calon Pengantin', checked: false },
        { id: 'n4', name: 'N4 - Surat Keterangan tentang Orang Tua', checked: false },
        { id: 'n5', name: 'N5 - Surat Izin Orang Tua (jika berlaku)', checked: false }
    ],
    dokumenTambahan: [
        { id: 'surat_cerai', name: 'Surat Cerai (jika pernah menikah)', checked: false },
        { id: 'surat_kematian', name: 'Surat Kematian Pasangan Sebelumnya (jika janda/duda)', checked: false },
        { id: 'dispensasi_usia', name: 'Dispensasi Usia (jika diperlukan)', checked: false },
        { id: 'surat_izin_atasan', name: 'Surat Izin Atasan (untuk PNS/TNI/Polri)', checked: false },
        { id: 'rekomendasi_kua', name: 'Surat Rekomendasi Nikah dari KUA Asal', checked: false }
    ],
    pendaftaran: [
        { id: 'persiapkan_dokumen', name: 'Persiapkan Dokumen', checked: false },
        { id: 'daftar_kua', name: 'Daftar ke KUA Kecamatan', checked: false },
        { id: 'daftar_online', name: 'Atau Pendaftaran Online melalui SIMKAH', checked: false },
        { id: 'tentukan_lokasi', name: 'Tentukan Lokasi Akad', checked: false },
        { id: 'konfirmasi_jadwal', name: 'Konfirmasi Jadwal', checked: false },
        { id: 'pembayaran', name: 'Pembayaran (jika diperlukan)', checked: false }
    ]
};

const DEFAULT_TIMELINE_TASKS = [
    { period: '12plus', task: 'Tentukan tanggal pernikahan', priority: 'Sangat Tinggi' },
    { period: '12plus', task: 'Buat anggaran kasar', priority: 'Sangat Tinggi' },
    { period: '12plus', task: 'Pilih wedding organizer', priority: 'Tinggi' },
    { period: '6to12', task: 'Booking venue', priority: 'Sangat Tinggi' },
    { period: '6to12', task: 'Pilih fotografer dan videografer', priority: 'Tinggi' },
    { period: '6to12', task: 'Pilih makeup artist', priority: 'Tinggi' },
    { period: '6to12', task: 'Pilih catering', priority: 'Tinggi' },
    { period: '3to6', task: 'Order undangan', priority: 'Tinggi' },
    { period: '3to6', task: 'Pilih busana pengantin', priority: 'Tinggi' },
    { period: '3to6', task: 'Booking dekorasi', priority: 'Tinggi' },
    { period: '1to3', task: 'Kirim undangan', priority: 'Sangat Tinggi' },
    { period: '1to3', task: 'Finalisasi daftar tamu', priority: 'Sangat Tinggi' },
    { period: '1to3', task: 'Meeting dengan vendor', priority: 'Tinggi' },
    { period: '2to4weeks', task: 'Final fitting busana', priority: 'Tinggi' },
    { period: '2to4weeks', task: 'Konfirmasi jumlah tamu ke catering', priority: 'Sangat Tinggi' },
    { period: '1week', task: 'Final meeting dengan semua vendor', priority: 'Sangat Tinggi' },
    { period: '1week', task: 'Persiapkan barang-barang yang dibawa', priority: 'Tinggi' },
    { period: 'dayof', task: 'Nikah', priority: 'Sangat Tinggi' }
];

// ========================================
// DEFAULT DATA
// ========================================
function getDefaultData() {
    return {
        settings: {
            groomName: '',
            brideName: '',
            weddingDate: '',
            location: '',
            currency: 'Rp',
            targetBudget: 0,
            targetGuests: 0,
            guestTags: [...DEFAULT_GUEST_TAGS],
            weddingRoles: [...DEFAULT_WEDDING_ROLES],
            fundSources: [...DEFAULT_FUND_SOURCES]
        },
        timeline: DEFAULT_TIMELINE_TASKS.map((t, i) => ({
            id: generateId(),
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
        kuaChecklist: JSON.parse(JSON.stringify(KUA_CHECKLIST))
    };
}

// ========================================
// STATE
// ========================================
let weddingData = null;
let currentPage = 'dashboard';
let currentEditId = null;
let calendarDate = new Date();
let settingsDraft = null;
let modalReturnFocus = null;
let modalCloseTimer = null;
let gridResizeObserver = null;
let backupButtonsInitialized = false;
let unsavedSettingsToastTimer = null;
const currencyFormatters = new Map();
const boundSettingsInputs = new WeakSet();

// ========================================
// STORAGE
// ========================================
function loadData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.version === DATA_VERSION && parsed.data && typeof parsed.data === 'object') {
                weddingData = parsed.data;
                ensureDataStructure();
            } else if (parsed && parsed.data && typeof parsed.data === 'object') {
                weddingData = migrateData(parsed);
            } else {
                console.warn('Invalid stored data structure, using defaults');
                weddingData = getDefaultData();
            }
        } else {
            weddingData = getDefaultData();
        }
    } catch (error) {
        console.error('Error loading data:', error);
        weddingData = getDefaultData();
        try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
    }

    if (!weddingData || typeof weddingData !== 'object' || !weddingData.settings) {
        weddingData = getDefaultData();
    }
}

function ensureDataStructure() {
    const defaultData = getDefaultData();
    // Ensure settings exists
    if (!weddingData.settings) weddingData.settings = defaultData.settings;
    // Ensure all array properties exist
    Object.keys(defaultData).forEach(key => {
        if (Array.isArray(defaultData[key]) && !Array.isArray(weddingData[key])) {
            weddingData[key] = [];
        }
    });
    // Ensure nested objects
    if (!weddingData.honeymoon) weddingData.honeymoon = defaultData.honeymoon;
    if (!weddingData.honeymoon.destination) weddingData.honeymoon.destination = {};
    if (!weddingData.honeymoon.itinerary) weddingData.honeymoon.itinerary = [];
    if (!weddingData.honeymoon.expenses) weddingData.honeymoon.expenses = [];
    if (!weddingData.kuaChecklist) weddingData.kuaChecklist = defaultData.kuaChecklist;
}

function saveData() {
    try {
        const toSave = {
            version: DATA_VERSION,
            data: weddingData
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
        console.error('Error saving data:', error);
        showToast('Gagal menyimpan data', 'error');
    }
}

function migrateData(oldData) {
    const defaultData = getDefaultData();
    const newData = { ...defaultData };

    if (oldData && oldData.data && typeof oldData.data === 'object') {
        const d = oldData.data;
        // Merge top level keys
        for (const key in defaultData) {
            if (d.hasOwnProperty(key)) {
                if (typeof defaultData[key] === 'object' && !Array.isArray(defaultData[key]) && defaultData[key] !== null) {
                    newData[key] = { ...defaultData[key], ...d[key] };
                } else {
                    newData[key] = d[key];
                }
            }
        }
    }
    return newData;
}

function exportBackup() {
    const dataStr = JSON.stringify({ version: DATA_VERSION, data: weddingData }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-planner-backup-${formatDateForFilename(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem('wp_last_backup', new Date().toISOString());
    showToast('Backup berhasil diexport', 'success');
}

function importBackup(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.version && imported.data) {
                weddingData = imported.data;
                saveData();
                navigateTo('dashboard', true);
                showToast('Backup berhasil diimport', 'success');
            } else {
                showToast('Format file tidak valid', 'error');
            }
        } catch (error) {
            showToast('Gagal membaca file backup', 'error');
        }
    };
    reader.readAsText(file);
}

function resetData() {
    openModal('Reset Data', `
        <p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus <strong>seluruh</strong> data aplikasi?</p>
        <p class="text-muted text-center">Tindakan ini akan mengosongkan semua data tanpa tersisa dan tidak dapat dibatalkan.</p>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Reset Bersih', class: 'btn-danger', onClick: () => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem('wp_currentPage');

                const blankData = getDefaultData();
                blankData.timeline = []; // Kosongkan timeline bawaan
                blankData.settings.guestTags = []; // Kosongkan tag
                blankData.settings.weddingRoles = [];
                blankData.settings.fundSources = [];

                weddingData = blankData;
                saveData();
                navigateTo('dashboard', true);
                closeModal();
                showToast('Seluruh data berhasil dihapus permanen', 'success');
        }}
    ]);
}

// ========================================
// UTILITIES
// ========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ========================================
// CORE HELPERS - Reusable Patterns
// ========================================

// Shared icon and motion utilities.
function motionDuration(kind) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 1;
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-' + kind)) || 250;
}


const itemMotionSelector = '.vendor-grid > .card, .seating-grid > .card, tr[data-task-id], tr[data-packing-id], .checklist-item, .timeline-item';
let lastRenderedMotionPage = null;
let renderMotionRevision = 0;
const disclosureMotion = new WeakMap();
function animateUI(element, frames, duration = 200) {
    if (!element?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
    return element.animate(frames, { duration, easing: 'cubic-bezier(.2,.7,.2,1)' });
}
function captureItemMotion(main) {
    const items = new Map();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return items;
    main.querySelectorAll(itemMotionSelector).forEach(element => {
        const control = element.querySelector('[onclick*="edit"], input[id]');
        const key = element.dataset.taskId || element.dataset.packingId || control?.getAttribute('onclick') || control?.id;
        if (!key || !element.getClientRects().length) return;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        items.set(key, { rect, clone: element.cloneNode(true) });
    });
    return items;
}
function animateItemChanges(main, before) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    main.querySelectorAll(itemMotionSelector).forEach(element => {
        const control = element.querySelector('[onclick*="edit"], input[id]');
        const key = element.dataset.taskId || element.dataset.packingId || control?.getAttribute('onclick') || control?.id;
        if (!key) return;
        const rectNow = element.getBoundingClientRect();
        if (!element.getClientRects().length || rectNow.bottom < 0 || rectNow.top > window.innerHeight) { before.delete(key); return; }
        const previous = before.get(key);
        if (!previous) animateUI(element, [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }]);
        else {
            const rect = element.getBoundingClientRect();
            const x = previous.rect.left - rect.left, y = previous.rect.top - rect.top;
            if (Math.abs(x) + Math.abs(y) > 1) animateUI(element, [{ transform: 'translate('+x+'px,'+y+'px)' }, { transform: 'translate(0,0)' }]);
        }
        before.delete(key);
    });
    before.forEach(({ rect, clone }) => {
        if (!rect.width || !rect.height) return;
        const ghost = document.createElement('div');
        ghost.className = 'motion-ghost';
        ghost.setAttribute('aria-hidden', 'true');
        ghost.inert = true;
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        Object.assign(ghost.style, { left: rect.left+'px', top: rect.top+'px', width: rect.width+'px', height: rect.height+'px' });
        if (clone.tagName === 'TR') {
            const table = document.createElement('table');
            const body = document.createElement('tbody');
            body.appendChild(clone); table.appendChild(body); ghost.appendChild(table);
        } else ghost.appendChild(clone);
        document.body.appendChild(ghost);
        const animation = animateUI(ghost, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-4px)' }], 150);
        if (animation) animation.finished.then(() => ghost.remove(), () => ghost.remove());
        else ghost.remove();
    });
}
function toggleDisclosure(element) {
    const previous = disclosureMotion.get(element);
    const opening = previous ? !previous.opening : getComputedStyle(element).display === 'none';
    const start = opening && !previous ? 0 : element.getBoundingClientRect().height;
    previous?.animation?.cancel();
    element.style.display = 'block';
    const height = element.getBoundingClientRect().height;
    const animation = animateUI(element, [{ height: start+'px', opacity: opening ? 0 : 1, overflow: 'hidden' }, { height: (opening ? height : 0)+'px', opacity: opening ? 1 : 0, overflow: 'hidden' }], 240);
    const state = { opening, animation };
    disclosureMotion.set(element, state);
    const finish = () => {
        if (disclosureMotion.get(element) !== state) return;
        element.style.display = opening ? 'block' : 'none';
        disclosureMotion.delete(element);
    };
    if (animation) animation.finished.then(finish, () => {}); else finish();
    return opening;
}
function animateChangedCounts(main, values) {
    main.querySelectorAll('.kpi-value').forEach((element, index) => {
        const finalText = element.textContent.trim(), previous = values[index];
        if (!/^\d+$/.test(finalText) || !/^\d+$/.test(previous || '') || previous === finalText) return;
        const from = Number(previous), to = Number(finalText);
        if (!Number.isSafeInteger(from) || !Number.isSafeInteger(to) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let start;
        const tick = time => {
            if (!element.isConnected) return;
            start ??= time;
            const progress = Math.min(1, (time-start)/180);
            element.textContent = progress === 1 ? finalText : String(Math.round(from+(to-from)*(1-Math.pow(1-progress,3))));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

/** Decorative icon markup; sizing and strokes follow the surrounding role. */
function renderIcon(name, attributes = '') {
    return ICONS[name].replace('<svg ', '<svg ' + attributes + ' ');
}

function initStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(host => {
        host.innerHTML = renderIcon(host.dataset.icon);
    });
}

/**
 * Standardized modal opener with consistent behavior
*/
function openModal(title, content, buttons = [], size = '') {
    clearTimeout(modalCloseTimer);
    modalCloseTimer = null;
    const overlay = document.getElementById('modalOverlay');
    const modal = overlay.querySelector('.modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    if (!overlay.classList.contains('active')) modalReturnFocus = document.activeElement;
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalFooter.innerHTML = '';

    modal.className = `modal ${size}`;

    buttons.forEach((btn, index) => {
        const button = document.createElement('button');
        button.className = `btn ${btn.class || 'btn-secondary'}`;
        button.textContent = btn.label;
        button.onclick = btn.onClick;
        if (index === buttons.length - 1 && (btn.class?.includes('primary') || btn.class?.includes('danger'))) {
            button.setAttribute('autofocus', 'true');
        }
        modalFooter.appendChild(button);
    });

    overlay.classList.remove('closing');

    if (overlay.classList.contains('active')) {
        modal.classList.remove('modal-swap');
        void modal.offsetWidth;
        modal.classList.add('modal-swap');
    } else {
        overlay.classList.add('active');
        syncPageScrollLock();
    }

    setTimeout(() => {
        const firstInput = modalBody.querySelector('input:not([type="hidden"]), select, textarea');
        if (overlay.classList.contains('active')) (firstInput || modalFooter.querySelector('button') || modal).focus();
    }, motionDuration('fast'));
}

function closeModal(callback) {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) {
        if (typeof callback === 'function') callback();
        return;
    }

    if (overlay.classList.contains('closing') || !overlay.classList.contains('active')) {
        return;
    }

    overlay.classList.remove('active');
    overlay.classList.add('closing');

    modalCloseTimer = setTimeout(() => {
        modalCloseTimer = null;
        overlay.classList.remove('closing');
        syncPageScrollLock();
        currentEditId = null;
        if (modalReturnFocus?.isConnected) modalReturnFocus.focus();
        modalReturnFocus = null;
        if (typeof callback === 'function') callback();
    }, motionDuration('base'));
}

/**
 * Standardized confirmation dialog
*/
function showConfirmDialog(title, message, onConfirm, confirmText = 'Hapus', confirmClass = 'btn-danger') {
    openModal(title, `
        <div class="modal-confirm-content">
            <div class="modal-confirm-icon">
                ${renderIcon("warningSmall", "width=\"48\" height=\"48\"")}
            </div>
            <p class="modal-confirm-message">${message}</p>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: confirmText, class: confirmClass, onClick: () => {
                closeModal();
                if (onConfirm) onConfirm();
        }}
    ], 'modal-sm');
}

/**
 * Shows a toast notification
*/
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    // Check if an identical toast is already active to prevent duplicates
    const existing = Array.from(container.querySelectorAll('.toast')).find(t => t.textContent && t.textContent.includes(message));
    if (existing) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: renderIcon('check', 'width="16" height="16"'),
        error: renderIcon('close', 'width="16" height="16"'),
        warning: renderIcon('warningSmall', 'width="16" height="16"'),
        info: renderIcon('infoCircle', 'width="16" height="16"')
    };

    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), motionDuration('base'));
    }, 3500);
}

/**
 * Renders an empty state with consistent styling
*/
function renderEmptyState(icon, title, text, buttonLabel, buttonOnClick) {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">${icon}</div>
            <div class="empty-state-title">${title}</div>
            <div class="empty-state-text">${text}</div>
            ${buttonLabel ? `<button class="btn btn-primary btn-lg" onclick="${buttonOnClick}">${buttonLabel}</button>` : ''}
        </div>
    `;
}

/**
 * Format currency with current settings
*/
function formatCurrency(amount, currency = null) {
    const curr = currency || weddingData.settings.currency ||'Rp';
    const code = curr === 'Rp' ?'IDR' : curr;
    let formatter = currencyFormatters.get(code);
    if (!formatter) {
        formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        currencyFormatters.set(code, formatter);
    }
    return formatter.format(amount).replace('IDR', 'Rp');
}

/**
 * Debounce function
*/
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Balance grid items so trailing cards fill remaining space evenly
 * @param {HTMLElement} gridEl
*/
function balanceGrid(gridEl) {
    if (!gridEl || !(gridEl instanceof HTMLElement)) return;

    // Filter visible child elements
    const visibleChildren = Array.from(gridEl.children).filter(child => {
        if (child.nodeType !== 1) return false;
        if (child.tagName === 'STYLE' || child.tagName === 'SCRIPT') return false;
        if (child.classList.contains('no-results-msg')) return false;
        if (child.style.display === 'none') return false;
        if (child.hidden) return false;
        return true;
    });

    // Reset previous inline gridColumn
    visibleChildren.forEach(child => {
        if (child.style.gridColumn) {
            child.style.removeProperty('grid-column');
        }
    });

    const total = visibleChildren.length;
    if (total === 0) return;

    // Detect actual number of rendered columns
    const gridComputed = window.getComputedStyle(gridEl);
    const colsVal = gridComputed.gridTemplateColumns;
    if (!colsVal || colsVal === 'none') return;

    const cols = colsVal.trim().split(/\s+/).length;
    if (cols <= 1) return; // 1 column naturally stacks full-width

    const remainder = total % cols;
    if (remainder === 0) return; // Already balanced!

    const emptySlots = cols - remainder;

    if (remainder === 1) {
        // Lone card on last row spans all empty slots + its slot = cols
        visibleChildren[total - 1].style.gridColumn = `span ${cols}`;
    } else if (remainder === 2 && cols === 4) {
        // 2 cards on last row in 4-column grid: balanced 50/50 split (2 + 2 = 4)
        visibleChildren[total - 2].style.gridColumn = 'span 2';
        visibleChildren[total - 1].style.gridColumn = 'span 2';
    } else if (remainder === 2 && cols === 5) {
        // 2 cards on last row in 5-column grid: 3 + 2 = 5
        visibleChildren[total - 2].style.gridColumn = 'span 3';
        visibleChildren[total - 1].style.gridColumn = 'span 2';
    } else if (remainder === 3 && cols === 4) {
        // 3 cards on last row in 4-column grid: 1 + 1 + 2 = 4
        visibleChildren[total - 1].style.gridColumn = 'span 2';
    } else if (remainder === 2 && cols === 3) {
        // 2 cards on last row in 3-column grid: 1 + 2 = 3
        visibleChildren[total - 1].style.gridColumn = 'span 2';
    } else {
        // Universal fallback: expand last card by remaining empty slots
        visibleChildren[total - 1].style.gridColumn = `span ${1 + emptySlots}`;
    }
}

/**
 * Balance all card grids across the application
*/
function balanceAllGrids() {
    // Only balance summary grids (KPI cards and Dashboard sections)
    const grids = document.querySelectorAll('.kpi-grid, .dashboard-grid');
    grids.forEach(grid => balanceGrid(grid));

    // Ensure regular content cards (venues, catering, vendors, seating tables, guests)
    // keep their natural card width without stretching across empty spaces
    document.querySelectorAll('.vendor-grid, .seating-grid').forEach(grid => {
        Array.from(grid.children).forEach(child => {
            if (child.classList && child.classList.contains('no-results-msg')) return;
            if (child.style && child.style.gridColumn) {
                child.style.removeProperty('grid-column');
            }
        });
    });
}

function initGridObserver() {
    if (typeof ResizeObserver !== 'undefined') {
        if (gridResizeObserver) {
            gridResizeObserver.disconnect();
        }
        gridResizeObserver = new ResizeObserver(debounce(() => {
            balanceAllGrids();
        }, 50));
        const main = document.querySelector('.main-content') || document.body;
        if (main) {
            gridResizeObserver.observe(main);
        }
    }
}

/**
 * Escape HTML to prevent XSS
*/
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(dateStr) {
    return dateStr ? DATE_FORMATTER.format(new Date(dateStr)) : '-';
}

function formatDateShort(dateStr) {
    return dateStr ? SHORT_DATE_FORMATTER.format(new Date(dateStr)) : '-';
}

function formatDateForFilename(date) {
    return date.toISOString().split('T')[0];
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
}

function getDaysUntilWedding() {
    if (!weddingData || !weddingData.settings || !weddingData.settings.weddingDate) return null;
    const wedding = new Date(weddingData.settings.weddingDate);
    if (isNaN(wedding.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    wedding.setHours(0, 0, 0, 0);
    const diff = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));
    return diff;
}

function getCountdownMessage() {
    const days = getDaysUntilWedding();
    if (days === null) return { message: 'Tanggal pernikahan belum ditentukan', type: 'neutral' };
    if (days < 0) return { message: 'Pernikahan telah berlangsung', type: 'past' };
    if (days === 0) return { message: 'Hari Pernikahan', type: 'today' };
    return { message: `SISA HARI: ${days}`, type: 'countdown', days };
}

// ========================================
// NAVIGATION
// ========================================

function formatRelativeTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = date - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Besok';
    if (days === -1) return 'Kemarin';
    if (days > 1 && days <= 7) return `${days} hari lagi`;
    if (days < -1 && days >= -7) return `${Math.abs(days)} hari lalu`;

    return formatDateShort(dateStr);
}

// SHARED RENDERING HELPERS
// ========================================

/**
 * Renders a progress bar with consistent styling
 * @param {number} percentage - Progress percentage (0-100)
 * @param {Object} options - Optional configuration
 * @returns {string} HTML string
*/
function renderProgressBar(percentage, options = {}) {
    const {
        height = null,
        color = null,
        showShine = true,
        className = ''
    } = options;

    const style = height ?`style="--progress-height: ${height};"` : '';
    const fillStyle = color ?`style="--progress-value: ${percentage}%; --progress-color: ${color};"` : `style="--progress-value: ${percentage}%"`;
    const shine = showShine ?'progress-fill' : 'progress-fill no-shine';

    return `
        <div class="progress-bar ${className}" ${style}>
            <div class="${shine}" ${fillStyle}></div>
        </div>
    `;
}

/**
 * Centralized badge class mapping
*/
const BADGE_MAP = {
    priority: {
        'Sangat Tinggi': 'danger',
        Tinggi: 'warning',
        Sedang: 'primary',
        Rendah: 'muted',
        'Sangat Rendah': 'muted'
    },
    vendorStatus: {
        Dipertimbangkan: 'primary',
        Dihubungi: 'warning',
        Meeting: 'warning',
        Terpilih: 'success',
        Ditolak: 'danger'
    },
    paymentStatus: {
        'Belum Dibayar': 'danger',
        DP: 'warning',
        Sebagian: 'warning',
        Lunas: 'success'
    },
    rsvpStatus: {
        Hadir: 'success',
        'Tidak Hadir': 'danger',
        Mungkin: 'warning',
        'Belum Dikonfirmasi': 'muted'
    }
};

/**
 * Gets badge class for a given category and value
 * @param {string} category - One of: 'priority', 'vendorStatus', 'paymentStatus', 'rsvpStatus'
 * @param {string} value - The status/priority value
 * @returns {string} Badge class name
*/
function getBadgeClass(category, value) {
    const map = BADGE_MAP[category];
    return map?.[value] ||'muted';
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const nav = document.getElementById('sidebarNav');
    const actions = document.getElementById('sidebarActions');
    if (!nav) return;

    const renderNavItem = (item) =>`
        <button class="nav-item ${currentPage === item.id ? 'active' : ''}" data-page="${item.id}">
            <span class="nav-item-icon">${item.icon}</span>
            <span class="nav-item-text">${item.label}</span>
        </button>
    `;

    nav.innerHTML = NAV_SECTIONS.map(section =>`
        <div class="nav-section">
            <div class="nav-section-title">${section.title}</div>
            ${section.items.map(renderNavItem).join('')}
        </div>
    `).join('');
    if (actions) nav.appendChild(actions);

    nav.onclick = (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem && navItem.dataset.page) {
            navigateTo(navItem.dataset.page);
        }
    };
}

function initListWheelScroll() {
    const animations = new Map();
    const cancelPending = () => {
        animations.forEach(state => cancelAnimationFrame(state.frame));
        animations.clear();
    };
    document.addEventListener('pointerdown', cancelPending, { capture: true, passive: true });
    document.addEventListener('keydown', cancelPending, { capture: true });
    window.addEventListener('blur', cancelPending);
    document.addEventListener('wheel', event => {
        if (event.ctrlKey || event.shiftKey || !event.cancelable || !event.deltaY ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        const list = event.target.closest?.('.sidebar-nav, .dashboard-section-body, .list-panel, .table-card-body');
        if (!list) return;
        const maximum = Math.max(0, list.scrollHeight - list.clientHeight);
        if (!maximum) return;
        let state = animations.get(list);
        const position = state?.target ?? list.scrollTop;
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? list.clientHeight : 1;
        const target = Math.max(0, Math.min(maximum, position + event.deltaY * unit * 0.5));
        if (target === position) return;
        event.preventDefault();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (state) cancelAnimationFrame(state.frame);
            animations.delete(list);
            list.scrollTop = target;
            return;
        }
        if (state) {
            state.target = target;
            return;
        }
        state = { target, frame: null, time: null };
        animations.set(list, state);
        const tick = time => {
            if (!list.isConnected) {
                animations.delete(list);
                return;
            }
            const elapsed = state.time === null ? 16 : Math.min(64, time - state.time);
            state.time = time;
            state.target = Math.min(state.target, Math.max(0, list.scrollHeight - list.clientHeight));
            const remaining = state.target - list.scrollTop;
            if (Math.abs(remaining) < 1.5) {
                list.scrollTop = state.target;
                animations.delete(list);
                return;
            }
            list.scrollTop += remaining * (1 - Math.exp(-elapsed / 45));
            state.frame = requestAnimationFrame(tick);
        };
        state.frame = requestAnimationFrame(tick);
    }, { passive: false });
}

function navigateTo(page, forceRefresh = false) {
    if (currentPage === page && !forceRefresh) {
        closeSidebar();
        return;
    }

    if (currentPage === 'settings') {
        if (hasUnsavedSettingsChanges()) {
            showToast('Perubahan pengaturan belum disimpan dibatalkan', 'info');
        }
        settingsDraft = null;
    }

    currentPage = page;
    rememberCurrentPage();
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    mainContent.classList.add('page-changing');

    // Scroll instantly before rendering the new page
    window.scrollTo(0, 0);

    setTimeout(() => {
        renderPage();
        updateSidebarCountdown();
        checkCountdownReminders();
        updateThemeIcon();
        mainContent.classList.remove('page-changing');
    }, motionDuration('fast'));

    closeSidebar();
}

function syncPageScrollLock() {
    const modal = document.getElementById('modalOverlay');
    const modalOpen = modal && (modal.classList.contains('active') || modal.classList.contains('closing'));
    const sidebarOpen = !document.body.classList.contains('sidebar-hidden') && window.matchMedia('(max-width: 768px)').matches;
    document.body.style.overflow = modalOpen || sidebarOpen ? 'hidden' : '';
}

function setSidebarOpen(open) {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const sidebar = document.getElementById('sidebar');
    const wasOpen = sidebar.classList.contains('open');
    const focusInside = sidebar.contains(document.activeElement);
    document.body.classList.toggle('sidebar-hidden', !open);
    sidebar.classList.toggle('open', open);
    document.getElementById('sidebarOverlay').classList.toggle('active', open && mobile);
    if (!open && focusInside) {
        document.getElementById(mobile ? 'hamburgerBtn' : 'sidebarReopen').focus({ preventScroll: true });
    }
    sidebar.inert = !open;
    sidebar.setAttribute('aria-hidden', String(!open));
    if (open && !wasOpen) document.getElementById('sidebarClose').focus({ preventScroll: true });
    syncPageScrollLock();
    for (const id of ['hamburgerBtn', 'sidebarClose', 'sidebarReopen']) {
        document.getElementById(id).setAttribute('aria-expanded', String(open));
    }
}

function rememberCurrentPage() {
    try { sessionStorage.setItem('wp_currentPage', currentPage); } catch (_) { /* Storage can be disabled. */ }
}

function getInitialPage() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation?.type !== 'reload') return 'dashboard';
    try {
        const page = sessionStorage.getItem('wp_currentPage');
        return Object.prototype.hasOwnProperty.call(PAGE_RENDERERS, page) ? page : 'dashboard';
    } catch (_) { return 'dashboard'; }
}

function initSidebarScrollPersistence() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;
    const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    let saved = 0;
    try {
        const position = Number(sessionStorage.getItem('wp_sidebarScrollTop'));
        if (isReload && Number.isFinite(position) && position >= 0) saved = position;
    } catch (_) { /* Storage can be disabled. */ }
    let restoring = isReload;
    const remember = () => {
        try { sessionStorage.setItem('wp_sidebarScrollTop', String(nav.scrollTop)); } catch (_) { /* Storage can be disabled. */ }
    };
    const restore = () => {
        if (!restoring) return;
        nav.scrollTop = Math.min(saved, Math.max(0, nav.scrollHeight - nav.clientHeight));
    };
    nav.addEventListener('scroll', () => { if (!restoring) remember(); }, { passive: true });
    for (const type of ['wheel', 'pointerdown', 'keydown']) {
        nav.addEventListener(type, () => { restoring = false; }, { passive: true });
    }
    window.addEventListener('pagehide', remember);
    if (!isReload) { nav.scrollTop = 0; remember(); return; }
    requestAnimationFrame(restore);
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => requestAnimationFrame(() => {
        restore();
        restoring = false;
        remember();
    }));
}

function initMobileMenu() {
    for (const id of ['hamburgerBtn', 'sidebarClose', 'sidebarReopen']) {
        document.getElementById(id).addEventListener('click', () => {
            setSidebarOpen(document.body.classList.contains('sidebar-hidden'));
        });
    }
    document.getElementById('sidebarOverlay').addEventListener('click', () => setSidebarOpen(false));
    window.matchMedia('(max-width: 768px)').addEventListener('change', () => {
        setSidebarOpen(!document.body.classList.contains('sidebar-hidden'));
    });
    setSidebarOpen(true);
}

function closeSidebar() {
    if (window.matchMedia('(max-width: 768px)').matches) setSidebarOpen(false);
}

function updateSidebarCountdown() {
    const container = document.getElementById('sidebarCountdown');
    if (!container) return;

    let days = null;
    try {
        days = getDaysUntilWedding();
    } catch(e) {
        console.error('Error getting days:', e);
    }

    const weddingDate = weddingData && weddingData.settings ? weddingData.settings.weddingDate : '';
    const brideName = weddingData && weddingData.settings ? (weddingData.settings.brideName ||'') : '';
    const groomName = weddingData && weddingData.settings ? (weddingData.settings.groomName ||'') : '';

    let html = '';

    // SVG ring parameters
    const ringRadius = 40;
    const ringCircumference = 2 * Math.PI * ringRadius; // ~251.2
    const totalPlanningDays = 365; // 1 year planning cycle

    if (days === null) {
        // No date set
        html = `
            <div class="sidebar-countdown-inner state-empty sidebar-countdown-simple">
                <div class="sidebar-countdown-icon">
                    ${renderIcon("calendarEmpty", "width=\"36\" height=\"36\" class=\"text-muted\"")}
                </div>
                <div class="sidebar-countdown-label">Tanggal Pernikahan</div>
                <div class="sidebar-countdown-text sidebar-countdown-text--today">Belum ditentukan</div>
                <div class="sidebar-countdown-hint">Set tanggal di Pengaturan</div>
            </div>
        `;
    } else if (days < 0) {
        // Wedding already happened
        html = `
            <div class="sidebar-countdown-inner state-done sidebar-countdown-simple">
                <div class="sidebar-countdown-icon">
                    ${renderIcon("weddingParty", "width=\"36\" height=\"36\" class=\"text-success\"")}
                </div>
                <div class="sidebar-countdown-label">Selamat!</div>
                <div class="sidebar-countdown-value sidebar-countdown-value--done">Pernikahan Telah Berlangsung</div>
                <div class="sidebar-countdown-date">
                    ${renderIcon("events", "width=\"12\" height=\"12\"")}
                    ${formatDate(weddingDate)}
                </div>
            </div>
        `;
    } else if (days === 0) {
        // Today is the wedding day!
        html = `
            <div class="sidebar-countdown-inner state-today">
                <div class="sidebar-countdown-ring">
                    <svg aria-hidden=\"true\" focusable=\"false\" viewBox="0 0 88 88">
                        <circle class="sidebar-countdown-ring-bg" cx="44" cy="44" r="${ringRadius}"/>
                        <circle class="sidebar-countdown-ring-fill done" cx="44" cy="44" r="${ringRadius}"
                            stroke-dasharray="${ringCircumference}"
                            stroke-dashoffset="0"/>
                    </svg>
                    <div class="sidebar-countdown-ring-center">
                        <div class="sidebar-countdown-ring-value sidebar-countdown-ring-value--today" >&#9679;</div>
                        <div class="sidebar-countdown-ring-label">Hari Ini</div>
                    </div>
                </div>
                <div class="sidebar-countdown-label">Hari Pernikahan</div>
                <div class="sidebar-countdown-text sidebar-countdown-text--today" >
                    ${escapeHtml(brideName) || 'Pengantin'} &amp; ${escapeHtml(groomName) || 'Pengantin'}
                </div>
                <div class="sidebar-countdown-date">
                    ${renderIcon("events", "width=\"12\" height=\"12\"")}
                    ${formatDate(weddingDate)}
                </div>
            </div>
        `;
    } else {
        // Countdown active
        const progress = Math.max(0, Math.min(1, (totalPlanningDays - days) / totalPlanningDays));
        const dashOffset = ringCircumference * (1 - progress);

        html = `
            <div class="sidebar-countdown-inner">
                <div class="sidebar-countdown-ring">
                    <svg aria-hidden=\"true\" focusable=\"false\" viewBox="0 0 88 88">
                        <circle class="sidebar-countdown-ring-bg" cx="44" cy="44" r="${ringRadius}"/>
                        <circle class="sidebar-countdown-ring-fill" cx="44" cy="44" r="${ringRadius}"
                            stroke-dasharray="${ringCircumference}"
                            stroke-dashoffset="${dashOffset}"/>
                    </svg>
                    <div class="sidebar-countdown-ring-center">
                        <div class="sidebar-countdown-ring-value sidebar-countdown-ring-value--today">${days}</div>
                        <div class="sidebar-countdown-ring-label">Hari</div>
                    </div>
                </div>
                <div class="sidebar-countdown-label">Menuju Pernikahan</div>
                <div class="sidebar-countdown-date">
                    ${renderIcon("events", "width=\"12\" height=\"12\"")}
                    ${formatDate(weddingDate)}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Animate the ring fill after render
    const animateRing = () => {
        const ringFill = container.querySelector('.sidebar-countdown-ring-fill');
        if (ringFill && days !== null && days >= 0) {
            if (days === 0) {
                ringFill.style.strokeDashoffset = '0';
            } else {
                const progress = Math.max(0, Math.min(1, (totalPlanningDays - days) / totalPlanningDays));
                ringFill.style.strokeDashoffset = (ringCircumference * (1 - progress)).toString();
            }
        }
    };

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => requestAnimationFrame(animateRing));
    } else {
        setTimeout(animateRing, 50);
    }
}

// ========================================
// RENDER APP
// ========================================

function renderApp() {
    initNavigation();
    renderPage();
    initBackupButtons();
    updateSidebarCountdown();
    checkCountdownReminders();
    updateThemeIcon();
    initGlobalShortcuts();
}

function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeSidebar();
        }
        if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            window.print();
        }
    });
}

function renderPage() {
    const motionRevision = ++renderMotionRevision;
    const main = document.getElementById('mainContent');
    const samePage = lastRenderedMotionPage === currentPage;
    const before = samePage ? captureItemMotion(main) : null;
    const values = samePage ? [...main.querySelectorAll('.kpi-value')].map(value => value.title || value.textContent.trim()) : [];
    const progressWidths = [...main.querySelectorAll('.progress-fill')].map(bar => bar.getBoundingClientRect().width);
    lastRenderedMotionPage = currentPage;

    main.innerHTML = `<div class="page">${PAGE_RENDERERS[currentPage]()}</div>`;
    main.querySelectorAll('.kpi-value').forEach(value => { value.title = value.textContent.trim(); });
    const emptyState = main.querySelector('.empty-state');
    if (emptyState) {
        const hasExtraCards = Boolean(main.querySelector('.card, .kpi-grid, .vendor-grid, .table-container, .timeline'));
        if (!hasExtraCards) {
            emptyState.classList.add('empty-state--canvas');
            const navItem = NAV_ITEMS.find(n => n.id === currentPage);
            if (navItem && navItem.icon) {
                const iconEl = emptyState.querySelector('.empty-state-icon');
                if (iconEl) {
                    iconEl.innerHTML = navItem.icon;
                }
            }
        }
    }

    // Auto-inject Print Button for pages with a page-header, except dashboard and settings
    if (currentPage !== 'dashboard' && currentPage !== 'settings') {
        const pageHeader = main.querySelector('.page-header');
        if (pageHeader && !pageHeader.querySelector('.print-btn')) {
            pageHeader.classList.add('has-print-btn');

            const headerContent = document.createElement('div');
            headerContent.className = 'page-header-content';
            while (pageHeader.firstChild) {
                headerContent.appendChild(pageHeader.firstChild);
            }
            pageHeader.appendChild(headerContent);

            const printBtn = document.createElement('button');
            printBtn.className = 'btn btn-white print-btn';
            printBtn.title = 'Cetak atau simpan halaman sebagai PDF';
            printBtn.innerHTML = `${ICONS.print} <span>Print / Export PDF</span>`;
            printBtn.onclick = () => window.print();
            pageHeader.appendChild(printBtn);
        }
    }

    initPageEvents();
    updateFilterResetButtons();
    sizeListPreviews();
    balanceAllGrids();
    requestAnimationFrame(() => {
        if (motionRevision !== renderMotionRevision) return;
        balanceAllGrids();
        if (before) { animateItemChanges(main, before); animateChangedCounts(main, values); }
        main.querySelectorAll('.progress-fill').forEach((bar, index) => {
            const width = bar.getBoundingClientRect().width;
            const from = samePage ? progressWidths[index] ?? width : 0;
            if (from !== width) animateUI(bar, [{ width: from+'px' }, { width: width+'px' }], 240);
        });
    });
}

const FILTER_RESET_FIELDS = {
    timeline: ['timelineSearch', 'timelineFilterStatus', 'timelineFilterPriority'],
    vendor: ['vendorSearch', 'vendorFilterCategory', 'vendorFilterStatus'],
    budget: ['budgetSearch', 'budgetFilterCategory', 'budgetFilterStatus'],
    guest: ['guestSearch', 'guestFilterTag', 'guestFilterRSVP']
};
function updateFilterResetButtons() {
    document.querySelectorAll('[data-filter-reset]').forEach(button => {
        button.disabled = !FILTER_RESET_FIELDS[button.dataset.filterReset].some(id => {
            const field = document.getElementById(id);
            return field && (field.tagName === 'SELECT' ? field.value !== 'all' : field.value.trim() !== '');
        });
    });
}
function sizeListPreviews() {
    document.querySelectorAll('.list-panel, .table-card-body').forEach(panel => {
        const items = [...panel.querySelectorAll(':scope > .checklist-item, :scope > .table-guest, :scope > .table-container > table > tbody > tr')]
            .filter(item => item.style.display !== 'none' && getComputedStyle(item).display !== 'none');
        if (!panel.getClientRects().length) return;
        if (items.length < 5) {
            panel.style.removeProperty('height');
            if (panel.scrollHeight > panel.clientHeight) {
                panel.style.height = Math.ceil(panel.scrollHeight + panel.offsetHeight - panel.clientHeight) + 'px';
            }
            return;
        }
        const fifth = items[4].getBoundingClientRect();
        const height = fifth.top - panel.getBoundingClientRect().top + panel.scrollTop + fifth.height / 2;
        const value = Math.ceil(height) + 'px';
        if (panel.style.height !== value) panel.style.height = value;
    });
}
function initListInteractions() {
    let frame = null;
    const schedulePreview = () => {
        if (frame !== null) return;
        frame = requestAnimationFrame(() => { frame = null; sizeListPreviews(); });
    };
    const main = document.getElementById('mainContent');
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(records => {
            if (records.some(record => record.type === 'childList' || record.attributeName === 'hidden' ||
                (record.attributeName === 'style' && /display\s*:[^;]+/.exec(record.oldValue || '')?.[0] !==
                    /display\s*:[^;]+/.exec(record.target.getAttribute('style') || '')?.[0]))) schedulePreview();
        });
        observer.observe(main, { childList: true, subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['style', 'hidden'] });
    }
    main.addEventListener('transitionend', event => { if (event.propertyName === 'display') schedulePreview(); });
    document.addEventListener('input', updateFilterResetButtons);
    document.addEventListener('change', updateFilterResetButtons);
    window.addEventListener('resize', debounce(sizeListPreviews, 100));
    if (document.fonts) document.fonts.ready.then(sizeListPreviews);
    if (typeof ResizeObserver !== 'undefined') {
        let previousWidth = 0;
        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;
            if (width !== previousWidth) { previousWidth = width; requestAnimationFrame(sizeListPreviews); }
        });
        observer.observe(document.getElementById('mainContent'));
    }
}

function initPageEvents() {

    if (PAGE_INITIALIZERS[currentPage]) {
        PAGE_INITIALIZERS[currentPage]();
    }
}

function openBackupModal() {
    openModal('Backup & Kelola Data', `
        <div class="backup-modal-list">
            <div class="backup-option-card">
                <div class="backup-option-info">
                    <div class="backup-option-icon">
                        ${renderIcon("uploadData", "width=\"20\" height=\"20\"")}
                    </div>
                    <div class="backup-option-text">
                        <div class="backup-option-title">Export Backup</div>
                        <p class="backup-option-desc">Simpan dan unduh seluruh data ke file JSON (.json)</p>
                    </div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="exportBackup()">Export</button>
            </div>

            <div class="backup-option-card">
                <div class="backup-option-info">
                    <div class="backup-option-icon">
                        ${renderIcon("downloadData", "width=\"20\" height=\"20\"")}
                    </div>
                    <div class="backup-option-text">
                        <div class="backup-option-title">Import Backup</div>
                        <p class="backup-option-desc">Pulihkan data dari file backup yang telah tersimpan</p>
                    </div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="triggerImportBackup()">Import</button>
            </div>

            <div class="backup-option-card">
                <div class="backup-option-info">
                    <div class="backup-option-icon">
                        ${renderIcon("databaseData", "width=\"20\" height=\"20\"")}
                    </div>
                    <div class="backup-option-text">
                        <div class="backup-option-title">Isi Data Contoh</div>
                        <p class="backup-option-desc">Isi data simulasi lengkap untuk mencoba fitur aplikasi</p>
                    </div>
                </div>
                <div class="btn-group sample-data-actions">
                    <button class="btn btn-secondary btn-sm" onclick="fillSampleData()">Isi Data</button>
                    <button class="btn btn-secondary btn-sm" onclick="openSamplePreviewMenu()">Uji Pop-up</button>
                </div>
            </div>

            <div class="backup-option-card danger">
                <div class="backup-option-info">
                    <div class="backup-option-icon danger">
                        ${renderIcon("del", "width=\"20\" height=\"20\"")}
                    </div>
                    <div class="backup-option-text">
                        <div class="backup-option-title text-danger">Reset Data</div>
                        <p class="backup-option-desc">Hapus seluruh data aplikasi secara bersih dan permanen</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="resetData()">Reset</button>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal }
    ]);
}

function triggerImportBackup() {
    const importInput = document.getElementById('importBackupInput');
    if (importInput) {
        importInput.click();
    }
}

function handleBackupImportInput(e) {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        closeModal();
        importBackup(file);
        e.target.value = '';
    }
}

function initBackupButtons() {
    if (backupButtonsInitialized) return;

    const backupBtn = document.getElementById('backupDataBtn');
    if (backupBtn) {
        backupBtn.onclick = openBackupModal;
    }

    const importInput = document.getElementById('importBackupInput');
    if (importInput) {
        importInput.onchange = handleBackupImportInput;
    }

    backupButtonsInitialized = true;
}

// ========================================
// DASHBOARD
// ========================================
function renderDashboard() {
    const countdown = getCountdownMessage();
    const budgetSummary = calculateBudgetSummary();
    const guestSummary = calculateGuestSummary();
    const taskProgress = calculateTaskProgress();
    const kuaProgress = calculateKuaProgress();
    const settings = weddingData.settings;
    const brideName = settings.brideName ||'Pengantin Wanita';
    const groomName = settings.groomName ||'Pengantin Pria';

    const needsOnboarding = !settings.brideName && !settings.groomName && !settings.weddingDate;

    return `
        ${needsOnboarding ? `
        <div class="welcome-panel">
            <div>
                <h3 class="welcome-title">Selamat datang di Wedding Planner!</h3>
                <p class="welcome-description">Mulai dengan mengisi nama pengantin dan tanggal pernikahan Anda untuk pengalaman yang lebih personal.</p>
            </div>
            <button class="btn btn-primary" onclick="navigateTo('settings')">Atur Sekarang</button>
        </div>
        ` : ''}
        <div class="dashboard-hero">
            <div class="dashboard-hero-content">
                <div class="dashboard-hero-names">${escapeHtml(brideName)} & ${escapeHtml(groomName)}</div>
                <div class="dashboard-hero-date">${settings.weddingDate ? formatDate(settings.weddingDate) : 'Tanggal pernikahan belum ditentukan'}</div>
                <div class="dashboard-hero-location">${escapeHtml(settings.location) || ''}</div>
                <div class="dashboard-countdown">
                    ${countdown.type === 'countdown' ? `
                        <div class="countdown-number">${countdown.days}</div>
                        <div class="countdown-label">hari lagi</div>
                    ` : `
                        <div class="countdown-message">${countdown.message}</div>
                    `}
                </div>
            </div>
        </div>
        
        ${countdown.days !== null && countdown.days <= 90 && countdown.days >= 0 && kuaProgress.percentage < 100 ? `
        <div class="card card--highlight-warning mb-3 p-3">
            <div class="flex-between flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <div class="text-warning flex items-center">${ICONS.kua}</div>
                    <div>
                        <div class="fw-600 text-ink">Perhatian Administrasi KUA (H-${countdown.days})</div>
                        <div class="fs-sm text-secondary">Pendaftaran KUA dianjurkan minimal 3 bulan sebelum hari H. Checklist berkas Anda saat ini baru ${kuaProgress.checked}/${kuaProgress.total} selesai (${kuaProgress.percentage}%).</div>
                    </div>
                </div>
                <button class="btn btn-sm btn-warning" onclick="navigateTo('kua')">Lengkapi Berkas</button>
            </div>
        </div>
        ` : ''}

        ${budgetSummary.totalActual > (settings.targetBudget || budgetSummary.totalBudget) ? `
        <div class="card card--highlight-danger mb-3 p-3">
            <div class="flex-between flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <div class="text-danger flex items-center">${ICONS.card}</div>
                    <div>
                        <div class="fw-600 text-ink">Pengeluaran Melebihi Anggaran</div>
                        <div class="fs-sm text-secondary">Total realisasi pengeluaran melampaui batas anggaran sebesar ${formatCurrency(budgetSummary.totalActual - (settings.targetBudget || budgetSummary.totalBudget))}.</div>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="navigateTo('budget')">Tinjau Anggaran</button>
            </div>
        </div>
        ` : ''}

        ${!localStorage.getItem('wp_last_backup') && (guestSummary.totalGuests > 0 || budgetSummary.totalActual > 0) ? `
        <div class="card card--highlight-primary mb-3 p-3">
            <div class="flex-between flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <div class="text-primary flex items-center">${ICONS.settings}</div>
                    <div>
                        <div class="fw-600 text-ink">Cadangkan Data Anda</div>
                        <div class="fs-sm text-secondary">Data disimpan secara lokal di browser Anda. Unduh cadangan JSON agar rencana pernikahan Anda selalu aman.</div>
                    </div>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="openBackupModal()">Cadangkan Sekarang</button>
            </div>
        </div>
        ` : ''}
        
        <div class="kpi-grid">
            <div class="kpi-card ${countdown.days !== null && countdown.days <= 30 ? 'warning' : ''}">
                <div class="kpi-icon">${ICONS.calendar}</div>
                <div class="kpi-value">${countdown.days !== null && countdown.days >= 0 ? countdown.days : '-'}</div>
                <div class="kpi-label">Sisa Hari</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon">${ICONS.budget}</div>
                <div class="kpi-value" >${formatCurrency(budgetSummary.totalBudget)}</div>
                <div class="kpi-label">Total Anggaran</div>
            </div>
            <div class="kpi-card ${budgetSummary.totalActual > (settings.targetBudget || budgetSummary.totalBudget) ? 'danger' : ''}">
                <div class="kpi-icon">${ICONS.card}</div>
                <div class="kpi-value" >${formatCurrency(budgetSummary.totalActual)}</div>
                <div class="kpi-label">Total Pengeluaran</div>
            </div>
            <div class="kpi-card ${budgetSummary.remaining < 0 ? 'danger' : 'success'}">
                <div class="kpi-icon">${ICONS.target}</div>
                <div class="kpi-value" >${formatCurrency(budgetSummary.remaining)}</div>
                <div class="kpi-label">Sisa Anggaran</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon">${ICONS.guests}</div>
                <div class="kpi-value">${guestSummary.totalGuests}</div>
                <div class="kpi-label">Jumlah Tamu</div>
            </div>
            <div class="kpi-card success">
                <div class="kpi-icon">${ICONS.checkCircle}</div>
                <div class="kpi-value">${guestSummary.confirmed}</div>
                <div class="kpi-label">Tamu Confirmed</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon">${ICONS.clipboard}</div>
                <div class="kpi-value">${taskProgress.completed}/${taskProgress.total}</div>
                <div class="kpi-label">Tugas Selesai</div>
            </div>
            <div class="kpi-card ${taskProgress.pending > 0 ? 'warning' : 'success'}">
                <div class="kpi-icon">${ICONS.rundown}</div>
                <div class="kpi-value">${taskProgress.pending}</div>
                <div class="kpi-label">Tugas Belum Selesai</div>
            </div>
        </div>
        
        <div class="progress-section">
            <div class="progress-header">
                <span class="progress-title">Progress Persiapan Pernikahan</span>
                <span class="progress-percentage">${taskProgress.percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="--progress-value: ${taskProgress.percentage}%"></div>
            </div>
            <div class="progress-stats">
                <span>${taskProgress.completed} selesai</span>
                <span>${taskProgress.pending} tersisa</span>
            </div>
        </div>
        
        <div class="progress-section">
            <div class="progress-header">
                <span class="progress-title">Progress Checklist KUA</span>
                <span class="progress-percentage">${kuaProgress.percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="--progress-value: ${kuaProgress.percentage}%"></div>
            </div>
            <div class="progress-stats">
                <span>${kuaProgress.checked} dari ${kuaProgress.total} dokumen</span>
            </div>
        </div>
        
        <div class="dashboard-grid">
            ${renderDashboardUpcomingTasks()}
            ${renderDashboardUpcomingPayments()}
            ${renderDashboardRSVPSummary()}
            ${renderDashboardBudgetChart()}
            ${renderDashboardSelectedVendors()}
        </div>
    `;
}

function renderDashboardBudgetChart() {
    const summary = calculateBudgetSummary();
    const target = weddingData.settings.targetBudget || summary.totalBudget;
    const actual = summary.totalActual;
    const paid = summary.totalPaid;

    const actualPercent = target > 0 ? Math.min(100, Math.round((actual / target) * 100)) : actual > 0 ? 100 : 0;
    const paidPercent = target > 0 ? Math.min(100, Math.round((paid / target) * 100)) : paid > 0 ? 100 : 0;
    const isOverBudget = actual > target;

    return `
        <div class="dashboard-section">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">${ICONS.budget}</span>
                Anggaran vs Realisasi
            </div>
            <div class="dashboard-section-body">
                <div class="dashboard-item dashboard-item--auto budget-summary-stack">
                    <div class="summary-row">
                        <span class="text-secondary">Target Anggaran</span>
                        <span class="fw-600">${formatCurrency(target)}</span>
                    </div>
                    
                    <div class="summary-row-spaced">
                        <span class="text-secondary">Total Realisasi ${isOverBudget ? '(Melebihi target)' : ''}</span>
                        <span class="${isOverBudget ? 'text-danger' : 'text-ink'} fw-600">${formatCurrency(actual)}</span>
                    </div>
                    <div class="progress-bar progress-bar-large">
                        <div class="progress-fill" style="--progress-value: ${actualPercent}%; --progress-color: ${isOverBudget ? 'var(--danger)' : 'var(--primary)'}"></div>
                    </div>
                    
                    <div class="summary-row-spaced">
                        <span class="text-secondary">Sudah Dibayar</span>
                        <span class="text-success fw-600">${formatCurrency(paid)}</span>
                    </div>
                    <div class="progress-bar progress-bar-large">
                        <div class="progress-fill" style="--progress-value: ${paidPercent}%; --progress-color: var(--success);"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDashboardUpcomingTasks() {
    const tasks = weddingData.timeline
    .filter(t => !t.completed && t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return `
        <div class="dashboard-section">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">${ICONS.listChecks}</span>
                Tugas Mendatang
            </div>
            <div class="dashboard-section-body">
                ${tasks.length ? tasks.map(t => `
                    <div class="dashboard-item">
                        <div class="dashboard-item-left">
                            <div class="dashboard-item-title">${escapeHtml(t.task)}</div>
                            <div class="dashboard-item-meta">${t.deadline ? formatRelativeTime(t.deadline) : ''}</div>
                        </div>
                        <div class="dashboard-item-right">
                            <span class="badge badge-${getPriorityBadge(t.priority)}">${t.priority}</span>
                        </div>
                    </div>
                `).join('') : `
                    <div class="dashboard-empty">
                        <div class="dashboard-empty-icon">${ICONS.emptyDoc}</div>
                        <p>Tidak ada tugas mendatang</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderDashboardUpcomingPayments() {
    const payments = weddingData.budget
    .filter(b => b.status !== 'Lunas' && b.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return `
        <div class="dashboard-section">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">${ICONS.card}</span>
                Pembayaran Mendatang
            </div>
            <div class="dashboard-section-body">
                ${payments.length ? payments.map(p => `
                    <div class="dashboard-item">
                        <div class="dashboard-item-left">
                            <div class="dashboard-item-title">${escapeHtml(p.description)}</div>
                            <div class="dashboard-item-meta">${p.dueDate ? formatRelativeTime(p.dueDate) : ''}</div>
                        </div>
                        <div class="dashboard-item-right">
                            <span class="text-danger fw-600">${formatCurrency(p.actualCost - p.paid)}</span>
                        </div>
                    </div>
                `).join('') : `
                    <div class="dashboard-empty">
                        <div class="dashboard-empty-icon">${ICONS.emptyInbox}</div>
                        <p>Tidak ada pembayaran mendatang</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderDashboardRSVPSummary() {
    const summary = calculateGuestSummary();

    return `
        <div class="dashboard-section">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">${ICONS.barChart}</span>
                RSVP Summary
            </div>
            <div class="dashboard-section-body">
                <div class="dashboard-item">
                    <div class="dashboard-item-left">
                        <div class="dashboard-item-title">Total Undangan</div>
                    </div>
                    <div class="dashboard-item-right">
                        <span class="badge badge-primary">${summary.totalInvitations}</span>
                    </div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-item-left">
                        <div class="dashboard-item-title">Hadir</div>
                    </div>
                    <div class="dashboard-item-right">
                        <span class="badge badge-success">${summary.confirmed}</span>
                    </div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-item-left">
                        <div class="dashboard-item-title">Tidak Hadir</div>
                    </div>
                    <div class="dashboard-item-right">
                        <span class="badge badge-danger">${summary.notAttending}</span>
                    </div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-item-left">
                        <div class="dashboard-item-title">Belum Dikonfirmasi</div>
                    </div>
                    <div class="dashboard-item-right">
                        <span class="badge badge-muted">${summary.pending}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDashboardSelectedVendors() {
    const selected = weddingData.vendors.filter(v => v.status === 'Terpilih');

    return `
        <div class="dashboard-section">
            <div class="dashboard-section-header">
                <span class="dashboard-section-icon">${ICONS.vendors}</span>
                Vendor Terpilih
            </div>
            <div class="dashboard-section-body">
                ${selected.length ? selected.map(v => `
                    <div class="dashboard-item">
                        <div class="dashboard-item-left">
                            <div class="dashboard-item-title">${escapeHtml(v.name)}</div>
                            <div class="dashboard-item-meta">${v.category}</div>
                        </div>
                        <div class="dashboard-item-right">
                            <span class="text-tertiary">${formatCurrency(v.price)}</span>
                        </div>
                    </div>
                `).join('') : `
                    <div class="dashboard-empty">
                        <div class="dashboard-empty-icon">${ICONS.vendors}</div>
                        <p>Belum ada vendor terpilih</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function getPriorityBadge(priority) {
    return getBadgeClass('priority', priority);
}

// ========================================
// CALCULATIONS
// ========================================
function calculateBudgetSummary() {
    const settings = weddingData.settings;
    const totalBudget = weddingData.budget.reduce((sum, b) => sum + (b.budget || 0), 0);
    const totalActual = weddingData.budget.reduce((sum, b) => sum + (b.actualCost || 0), 0);
    const totalPaid = weddingData.budget.reduce((sum, b) => sum + (b.paid || 0), 0);
    const outstanding = totalActual - totalPaid;
    const remaining = (settings.targetBudget || totalBudget) - totalActual;

    return { totalBudget, totalActual, totalPaid, outstanding, remaining };
}

function calculateGuestSummary() {
    const guests = weddingData.guests;
    const totalInvitations = guests.length;
    const totalGuests = guests.reduce((sum, g) => sum + (g.guestCount || 0), 0);
    const confirmed = guests.filter(g => g.rsvp === 'Hadir').reduce((sum, g) => sum + (g.guestCount || 0), 0);
    const notAttending = guests.filter(g => g.rsvp === 'Tidak Hadir').reduce((sum, g) => sum + (g.guestCount || 0), 0);
    const pending = guests.filter(g => g.rsvp === 'Belum Dikonfirmasi' || !g.rsvp).reduce((sum, g) => sum + (g.guestCount || 0), 0);

    return { totalInvitations, totalGuests, confirmed, notAttending, pending };
}

function calculateTaskProgress() {
    const tasks = weddingData.timeline;
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, percentage };
}

function calculateKuaProgress() {
    const kua = weddingData.kuaChecklist;
    let total = 0;
    let checked = 0;

    Object.values(kua).forEach(section => {
        section.forEach(item => {
            total++;
            if (item.checked) checked++;
        });
    });

    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

    return { total, checked, percentage };
}

function getCalendarEvents() {
    const events = [];

    weddingData.timeline.forEach(t => {
        if (t.deadline) {
            events.push({
                id: t.id,
                date: t.deadline,
                title: t.task,
                type: 'Tugas',
                color: 'var(--primary)',
                context: t.completed ?'Selesai' : 'Belum Selesai'
            });
        }
    });

    weddingData.rundown.forEach(r => {
        if (r.date) {
            events.push({
                id: r.id,
                date: r.date,
                title: r.activity,
                type: 'Rundown',
                color: 'var(--warning)',
                context: r.time ?`Jam: ${r.time}` : ''
            });
        }
    });

    weddingData.events.forEach(e => {
        if (e.date) {
            events.push({
                id: e.id,
                date: e.date,
                title: e.name,
                type: 'Acara',
                color: 'var(--success)',
                context: e.time ?`Jam: ${e.time}` : ''
            });
        }
    });

    weddingData.budget.forEach(b => {
        if (b.dueDate) {
            events.push({
                id: b.id,
                date: b.dueDate,
                title: `Pembayaran: ${b.description}`,
                type: 'Anggaran',
                color: 'var(--danger)',
                context: `${formatCurrency(b.actualCost || b.budget)} (${b.status})`
            });
        }
    });

    if (weddingData.settings.weddingDate) {
        events.push({
            id: 'wedding-date',
            date: weddingData.settings.weddingDate,
            title: 'Hari Pernikahan',
            type: 'Spesial',
            color: 'var(--primary-dark)',
            context: 'Acara Utama'
        });
    }

    if (weddingData.honeymoon && weddingData.honeymoon.itinerary) {
        weddingData.honeymoon.itinerary.forEach(h => {
            if (h.date) {
                events.push({
                    id: h.id,
                    date: h.date,
                    title: `Honeymoon: ${h.activity}`,
                    type: 'Honeymoon',
                    color: 'var(--info)',
                    context: h.location ||''
                });
            }
        });
    }

    return events;
}

// ========================================
// SETTINGS
// ========================================
function getSettingsSource() {
    return settingsDraft || weddingData.settings;
}

function hasUnsavedSettingsChanges() {
    if (!settingsDraft) return false;
    const s = weddingData.settings;
    const d = settingsDraft;
    return s.brideName !== d.brideName ||
    s.groomName !== d.groomName ||
    s.weddingDate !== d.weddingDate ||
    s.location !== d.location ||
    s.currency !== d.currency ||
    s.targetBudget !== d.targetBudget ||
    s.targetGuests !== d.targetGuests ||
    JSON.stringify(s.guestTags) !== JSON.stringify(d.guestTags) ||
    JSON.stringify(s.weddingRoles) !== JSON.stringify(d.weddingRoles) ||
    JSON.stringify(s.fundSources) !== JSON.stringify(d.fundSources);
}

function notifyUnsavedSettings() {
    if (hasUnsavedSettingsChanges()) {
        clearTimeout(unsavedSettingsToastTimer);
        unsavedSettingsToastTimer = setTimeout(() => {
            showToast('Perubahan belum disimpan — klik "Simpan Pengaturan" untuk menyimpan', 'warning');
        }, 500);
    }
}

function renderSettings() {
    const s = getSettingsSource();
    return `
        <div class="page-header">
            <h1 class="page-title">Pengaturan</h1>
            <p class="page-subtitle">Master data aplikasi wedding planner</p>
        </div>
        
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">Informasi Pernikahan</h3>
            </div>
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Nama Pengantin Wanita</label>
                        <input type="text" class="form-control" id="brideName" value="${escapeHtml(s.brideName)}">
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Nama Pengantin Pria</label>
                        <input type="text" class="form-control" id="groomName" value="${escapeHtml(s.groomName)}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Tanggal Pernikahan</label>
                        <input type="date" class="form-control" id="weddingDate" value="${s.weddingDate}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Lokasi</label>
                        <input type="text" class="form-control" id="location" value="${escapeHtml(s.location)}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Mata Uang</label>
                        <select class="form-control" id="currency">
                            <option value="Rp" ${s.currency === 'Rp' ? 'selected' : ''}>Rp (Rupiah)</option>
                            <option value="USD" ${s.currency === 'USD' ? 'selected' : ''}>USD (US Dollar)</option>
                            <option value="EUR" ${s.currency === 'EUR' ? 'selected' : ''}>EUR (Euro)</option>
                            <option value="SGD" ${s.currency === 'SGD' ? 'selected' : ''}>SGD (Singapore Dollar)</option>
                            <option value="MYR" ${s.currency === 'MYR' ? 'selected' : ''}>MYR (Malaysian Ringgit)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target Anggaran</label>
                        <input type="number" class="form-control" id="targetBudget" value="${s.targetBudget || ''}" min="0">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Jumlah Target Tamu</label>
                    <input type="number" class="form-control" id="targetGuests" value="${s.targetGuests || ''}" min="0">
                </div>
            </div>
        </div>
        
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">Guest Tags</h3>
            </div>
            <div class="card-body">
                <div id="guestTagsContainer">
                    ${s.guestTags.map((tag, i) => `
                        <div class="tag-item mb-1 editable-list-row">
                            <input type="text" class="form-control flex-grow" value="${escapeHtml(tag)}" data-tag-index="${i}">
                            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeGuestTag(${i})">${ICONS.close}</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-sm mt-2" onclick="addGuestTag()">+ Tambah Tag</button>
            </div>
        </div>
        
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">Peran Wedding</h3>
            </div>
            <div class="card-body">
                <div id="weddingRolesContainer">
                    ${s.weddingRoles.map((role, i) => `
                        <div class="role-item mb-1 editable-list-row">
                            <input type="text" class="form-control flex-grow" value="${escapeHtml(role)}" data-role-index="${i}">
                            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeWeddingRole(${i})">${ICONS.close}</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-sm mt-2" onclick="addWeddingRole()">+ Tambah Peran</button>
            </div>
        </div>
        
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">Penyumbang Dana</h3>
            </div>
            <div class="card-body">
                <div id="fundSourcesContainer">
                    ${s.fundSources.map((source, i) => `
                        <div class="fund-source-item mb-1 editable-list-row">
                            <input type="text" class="form-control flex-grow" value="${escapeHtml(source)}" data-fund-index="${i}">
                            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeFundSource(${i})">${ICONS.close}</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-sm mt-2" onclick="addFundSource()">+ Tambah Sumber Dana</button>
            </div>
        </div>
        
<div class="settings-actions">
            <button class="btn btn-primary btn-lg" onclick="saveSettings()" ${!hasUnsavedSettingsChanges() ? 'disabled' : ''}>Simpan Pengaturan</button>
        </div>
    `;
}

function initSettingsEvents() {
    bindSettingsInputs('.card-body input, .card-body select');
    initSettingsInputs();
}

function initSettingsDraft() {
    if (!settingsDraft) {
        const s = weddingData.settings;
        settingsDraft = {
            brideName: s.brideName,
            groomName: s.groomName,
            weddingDate: s.weddingDate,
            location: s.location,
            currency: s.currency,
            targetBudget: s.targetBudget,
            targetGuests: s.targetGuests,
            guestTags: [...s.guestTags],
            weddingRoles: [...s.weddingRoles],
            fundSources: [...s.fundSources]
        };
    }
}

function getDraft() {
    initSettingsDraft();
    return settingsDraft;
}

function updateSettingsDraft(skipToast = false) {
    const draft = getDraft();
    draft.brideName = document.getElementById('brideName')?.value ||'';
    draft.groomName = document.getElementById('groomName')?.value ||'';
    draft.weddingDate = document.getElementById('weddingDate')?.value ||'';
    draft.location = document.getElementById('location')?.value ||'';
    draft.currency = document.getElementById('currency')?.value ||'Rp';
    draft.targetBudget = parseInt(document.getElementById('targetBudget')?.value) || 0;
    draft.targetGuests = parseInt(document.getElementById('targetGuests')?.value) || 0;

    document.querySelectorAll('[data-tag-index]').forEach(input => {
        const idx = parseInt(input.dataset.tagIndex);
        draft.guestTags[idx] = input.value;
    });
    document.querySelectorAll('[data-role-index]').forEach(input => {
        const idx = parseInt(input.dataset.roleIndex);
        draft.weddingRoles[idx] = input.value;
    });
    document.querySelectorAll('[data-fund-index]').forEach(input => {
        const idx = parseInt(input.dataset.fundIndex);
        draft.fundSources[idx] = input.value;
    });

    const isDirty = hasUnsavedSettingsChanges();
    const saveBtn = document.querySelector('.settings-actions .btn-primary');
    if (saveBtn) saveBtn.disabled = !isDirty;
    if (isDirty && !skipToast) {
        notifyUnsavedSettings();
    }
}

function saveSettings() {
    updateSettingsDraft(true);
    if (!settingsDraft) return;

    const s = weddingData.settings;
    s.brideName = settingsDraft.brideName;
    s.groomName = settingsDraft.groomName;
    s.weddingDate = settingsDraft.weddingDate;
    s.location = settingsDraft.location;
    s.currency = settingsDraft.currency;
    s.targetBudget = settingsDraft.targetBudget;
    s.targetGuests = settingsDraft.targetGuests;
    s.guestTags = [...settingsDraft.guestTags];
    s.weddingRoles = [...settingsDraft.weddingRoles];
    s.fundSources = [...settingsDraft.fundSources];

    settingsDraft = null;
    clearTimeout(unsavedSettingsToastTimer);
    saveData();
    showToast('Pengaturan berhasil disimpan', 'success');
    renderPage();
    window.scrollTo(0, 0);
}

function addGuestTag() {
    const draft = getDraft();
    draft.guestTags.push('Tag Baru');
    refreshGuestTags();
    showToast('Tag tamu baru ditambahkan', 'info');
}

function removeGuestTag(index) {
    const draft = getDraft();
    const removed = draft.guestTags[index] ||'Tag';
    draft.guestTags.splice(index, 1);
    refreshGuestTags();
    showToast(`Tag "${removed}" dihapus`, 'info');
}

function refreshGuestTags() {
    const container = document.getElementById('guestTagsContainer');
    if (!container) return;
    const draft = getDraft();
    container.innerHTML = draft.guestTags.map((tag, i) =>`
        <div class="tag-item mb-1 editable-list-row">
            <input type="text" class="form-control flex-grow" value="${escapeHtml(tag)}" data-tag-index="${i}">
            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeGuestTag(${i})">${ICONS.close}</button>
        </div>
    `).join('');
    initSettingsInputs();
    updateSettingsDraft();
}

function addWeddingRole() {
    const draft = getDraft();
    draft.weddingRoles.push('Peran Baru');
    refreshWeddingRoles();
    showToast('Peran pernikahan baru ditambahkan', 'info');
}

function removeWeddingRole(index) {
    const draft = getDraft();
    const removed = draft.weddingRoles[index] ||'Peran';
    draft.weddingRoles.splice(index, 1);
    refreshWeddingRoles();
    showToast(`Peran "${removed}" dihapus`, 'info');
}

function refreshWeddingRoles() {
    const container = document.getElementById('weddingRolesContainer');
    if (!container) return;
    const draft = getDraft();
    container.innerHTML = draft.weddingRoles.map((role, i) =>`
        <div class="role-item mb-1 editable-list-row">
            <input type="text" class="form-control flex-grow" value="${escapeHtml(role)}" data-role-index="${i}">
            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeWeddingRole(${i})">${ICONS.close}</button>
        </div>
    `).join('');
    initSettingsInputs();
    updateSettingsDraft();
}

function addFundSource() {
    const draft = getDraft();
    draft.fundSources.push('Sumber Dana Baru');
    refreshFundSources();
    showToast('Sumber dana baru ditambahkan', 'info');
}

function removeFundSource(index) {
    const draft = getDraft();
    const removed = draft.fundSources[index] ||'Sumber Dana';
    draft.fundSources.splice(index, 1);
    refreshFundSources();
    showToast(`Sumber dana "${removed}" dihapus`, 'info');
}

function refreshFundSources() {
    const container = document.getElementById('fundSourcesContainer');
    if (!container) return;
    const draft = getDraft();
    container.innerHTML = draft.fundSources.map((source, i) =>`
        <div class="fund-source-item mb-1 editable-list-row">
            <input type="text" class="form-control flex-grow" value="${escapeHtml(source)}" data-fund-index="${i}">
            <button class="btn btn-sm btn-danger" aria-label="Hapus" title="Hapus" onclick="removeFundSource(${i})">${ICONS.close}</button>
        </div>
    `).join('');
    initSettingsInputs();
    updateSettingsDraft();
}

function bindSettingsInputs(selector) {
    document.querySelectorAll(selector).forEach(input => {
        if (boundSettingsInputs.has(input)) return;
        boundSettingsInputs.add(input);
        input.addEventListener('input', () => updateSettingsDraft());
    });
}

function initSettingsInputs() {
    bindSettingsInputs('[data-tag-index], [data-role-index], [data-fund-index]');
}

// ========================================
// TIMELINE
// ========================================
function renderTimeline() {
    const periods = TIMELINE_PERIODS;
    const hasData = weddingData.timeline.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Timeline Persiapan</h1>
            <p class="page-subtitle">Rencana persiapan pernikahan berdasarkan periode</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="timelineSearch" placeholder="Cari tugas...">
            </div>
            <div class="toolbar-filters">
                <select class="form-control" id="timelineFilterStatus">
                    <option value="all">Semua</option>
                    <option value="pending">Belum Selesai</option>
                    <option value="completed">Selesai</option>
                </select>
                <select class="form-control" id="timelineFilterPriority">
                    <option value="all">Semua Prioritas</option>
                    ${PRIORITIES.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
                <button class="btn btn-secondary" data-filter-reset="timeline" disabled onclick="resetTimelineFilters()" title="Reset filter">Reset</button>
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddTaskModal()">+ Tambah Tugas</button>
            </div>
        </div>
        
        ${periods.map(period => {
            const tasks = getFilteredTimeline().filter(t => t.period === period.id);
            const completed = tasks.filter(t => t.completed).length;
            const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
            
            return `
                <div class="card mb-2">
                    <div class="card-header clickable" onclick="toggleTimelineSection('${period.id}')">
                        <div class="flex-between">
                            <h3 class="card-title">${period.label}</h3>
                            <div>
                                <span class="badge badge-primary">${completed}/${tasks.length}</span>
                                <span class="ml-1">${percentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body list-panel" id="timeline-section-${period.id}">
                        ${tasks.length > 0 ? `
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="checkbox-cell">${ICONS.check}</th>
                                            <th>Tugas</th>
                                            <th>Prioritas</th>
                                            <th>Deadline</th>
                                            <th>Penanggung Jawab</th>
                                            <th class="actions-cell">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tasks.map(t => renderTimelineRow(t)).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : '<div class="empty-block-msg">Tidak ada tugas</div>'}
                    </div>
                </div>
            `;
        }).join('')}
        ` : renderEmptyState(ICONS.timeline, 'Belum ada tugas', 'Mulai buat timeline persiapan pernikahan Anda', '+ Tambah Tugas', 'openAddTaskModal()')}
    `;
}

function renderTimelineRow(task) {
    return `
        <tr class="${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <td class="checkbox-cell">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete('${task.id}')">
            </td>
            <td>${escapeHtml(task.task)}</td>
            <td><span class="badge badge-${getPriorityBadge(task.priority)}">${task.priority}</span></td>
            <td>${task.deadline ? formatDateShort(task.deadline) : '-'}</td>
            <td>${escapeHtml(task.assignee) || '-'}</td>
            <td class="actions-cell">
                <button class="btn btn-sm btn-ghost" onclick="showTaskDetail('${task.id}')" title="Detail" aria-label="Lihat detail tugas">${ICONS.info}</button>
                <button class="btn btn-sm btn-ghost" onclick="editTask('${task.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                <button class="btn btn-sm btn-ghost text-danger" onclick="deleteTask('${task.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
            </td>
        </tr>
    `;
}

function getFilteredTimeline() {
    let tasks = [...weddingData.timeline];

    const search = document.getElementById('timelineSearch')?.value.toLowerCase() ||'';
    const status = document.getElementById('timelineFilterStatus')?.value ||'all';
    const priority = document.getElementById('timelineFilterPriority')?.value ||'all';

    if (search) {
        tasks = tasks.filter(t => t.task.toLowerCase().includes(search));
    }

    if (status === 'pending') {
        tasks = tasks.filter(t => !t.completed);
    } else if (status === 'completed') {
        tasks = tasks.filter(t => t.completed);
    }

    if (priority !== 'all') {
        tasks = tasks.filter(t => t.priority === priority);
    }

    return tasks;
}

function initTimelineEvents() {
    const search = document.getElementById('timelineSearch');
    const statusFilter = document.getElementById('timelineFilterStatus');
    const priorityFilter = document.getElementById('timelineFilterPriority');

    if (search) {
        search.addEventListener('input', debounce(() => filterTimelineRows(), 300));
    }
    if (statusFilter) {
        statusFilter.value = 'all';
        statusFilter.addEventListener('change', () => filterTimelineRows());
    }
    if (priorityFilter) {
        priorityFilter.value = 'all';
        priorityFilter.addEventListener('change', () => filterTimelineRows());
    }

    filterTimelineRows();
}

function resetTimelineFilters() {
    localStorage.removeItem('timelineFilterStatus');
    localStorage.removeItem('timelineFilterPriority');
    const search = document.getElementById('timelineSearch');
    if (search) search.value = '';
    const statusFilter = document.getElementById('timelineFilterStatus');
    const priorityFilter = document.getElementById('timelineFilterPriority');
    if (statusFilter) statusFilter.value = 'all';
    if (priorityFilter) priorityFilter.value = 'all';
    filterTimelineRows();
    updateFilterResetButtons();
    sizeListPreviews();
    showToast('Filter direset', 'info');
}

function filterTimelineRows() {
    const search = document.getElementById('timelineSearch')?.value?.toLowerCase() ||'';
    const status = document.getElementById('timelineFilterStatus')?.value ||'all';
    const priority = document.getElementById('timelineFilterPriority')?.value ||'all';

    document.querySelectorAll('tbody tr[data-task-id]').forEach(row => {
        const taskText = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() ||'';
        const taskPriority = row.querySelector('td:nth-child(3) .badge')?.textContent ||'';
        const taskCompleted = row.classList.contains('completed');

        let matches = true;

        if (search && !taskText.includes(search)) matches = false;
        if (status === 'pending' && taskCompleted) matches = false;
        if (status === 'completed' && !taskCompleted) matches = false;
        if (priority !== 'all' && taskPriority !== priority) matches = false;

        row.style.display = matches ?'' : 'none';
    });

    document.querySelectorAll('.card-body[id^="timeline-section-"]').forEach(section => {
        const visibleRows = section.querySelectorAll('tbody tr:not([style*="display: none"])');
        let emptyMsg = section.querySelector('.no-results-msg');
        const table = section.querySelector('table');
        if (visibleRows.length === 0 && table) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'no-results-msg';
                emptyMsg.textContent = 'Tidak ada tugas yang cocok';
                section.querySelector('.table-container').appendChild(emptyMsg);
            }
            table.style.display = 'none';
        } else {
            if (emptyMsg) emptyMsg.remove();
            if (table) table.style.display = '';
        }
    });
}

function toggleTimelineSection(periodId) {
    const section = document.getElementById(`timeline-section-${periodId}`);
    if (section) {
        toggleDisclosure(section);
    }
}

function toggleVendorSelected() {
    const section = document.getElementById('vendorSelectedSection');
    const chevron = document.querySelector('.vendor-selected-chevron');
    if (section) {
        const isHidden = toggleDisclosure(section);
        if (chevron) {
            chevron.style.transform = isHidden ?'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}

function toggleTaskComplete(taskId) {
    const task = weddingData.timeline.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveData();

        // Update DOM directly to avoid blink
        const checkbox = document.querySelector(`input[onchange="toggleTaskComplete('${taskId}')"]`);
        if (checkbox) checkbox.checked = task.completed;

        const row = document.querySelector(`tr[data-task-id="${taskId}"]`);
        if (row) {
            if (task.completed) row.classList.add('completed');
            else row.classList.remove('completed');
        }

        // Update progress bar dynamically
        updateTimelineProgress();
        if (task.completed) {
            showToast(`Tugas "${task.task}" ditandai selesai`, 'success');
        } else {
            showToast(`Tugas "${task.task}" belum selesai`, 'info');
        }
    }
}

function updateTimelineProgress() {
    const completed = weddingData.timeline.filter(t => t.completed).length;
    const total = weddingData.timeline.length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    const fill = document.querySelector('.page-header + .card .progress-fill');
    if (fill) fill.style.width = pct + '%';
    const text = document.querySelector('.page-header + .card .flex-between span:last-child');
    if (text) text.textContent = `${completed} dari ${total} tugas selesai`;
}

function openAddTaskModal() {
    currentEditId = null;
    openModal('Tambah Tugas', `
        <div class="form-group">
            <label class="form-label required">Tugas</label>
            <input type="text" class="form-control" id="taskName" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Periode</label>
                <select class="form-control" id="taskPeriod">
                    ${TIMELINE_PERIODS.map(p => `<option value="${p.id}">${p.label}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Prioritas</label>
                <select class="form-control" id="taskPriority">
                    ${PRIORITIES.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Deadline</label>
                <input type="date" class="form-control" id="taskDeadline">
            </div>
            <div class="form-group">
                <label class="form-label">Penanggung Jawab</label>
                <input type="text" class="form-control" id="taskAssignee">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="taskNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveTask }
    ]);
}

function editTask(taskId) {
    const task = weddingData.timeline.find(t => t.id === taskId);
    if (!task) return;

    currentEditId = taskId;
    openModal('Edit Tugas', `
        <div class="form-group">
            <label class="form-label required">Tugas</label>
            <input type="text" class="form-control" id="taskName" value="${escapeHtml(task.task)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Periode</label>
                <select class="form-control" id="taskPeriod">
                    ${TIMELINE_PERIODS.map(p => `<option value="${p.id}" ${task.period === p.id ? 'selected' : ''}>${p.label}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Prioritas</label>
                <select class="form-control" id="taskPriority">
                    ${PRIORITIES.map(p => `<option value="${p}" ${task.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Deadline</label>
                <input type="date" class="form-control" id="taskDeadline" value="${task.deadline || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Penanggung Jawab</label>
                <input type="text" class="form-control" id="taskAssignee" value="${escapeHtml(task.assignee) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="taskNotes" rows="2">${escapeHtml(task.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveTask }
    ]);
}

function saveTask() {
    const name = document.getElementById('taskName').value.trim();
    if (!name) {
        showToast('Nama tugas harus diisi', 'error');
        return;
    }

    const taskData = {
        id: currentEditId || generateId(),
        task: name,
        period: document.getElementById('taskPeriod').value,
        priority: document.getElementById('taskPriority').value,
        deadline: document.getElementById('taskDeadline').value,
        assignee: document.getElementById('taskAssignee').value,
        notes: document.getElementById('taskNotes').value,
        completed: false
    };

    if (currentEditId) {
        const index = weddingData.timeline.findIndex(t => t.id === currentEditId);
        if (index !== -1) {
            taskData.completed = weddingData.timeline[index].completed;
            weddingData.timeline[index] = taskData;
        }
    } else {
        weddingData.timeline.push(taskData);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Tugas berhasil disimpan', 'success');
}

function deleteTask(taskId) {
    showConfirmDialog(
    'Hapus Tugas',
    'Apakah Anda yakin ingin menghapus tugas ini?',
    () => {
        weddingData.timeline = weddingData.timeline.filter(t => t.id !== taskId);
        saveData();
        renderPage();
        showToast('Tugas berhasil dihapus', 'success');
    },
    'Hapus',
    'btn-danger'
    );
}

function showTaskDetail(taskId) {
    const task = weddingData.timeline.find(t => t.id === taskId);
    if (!task) return;

    const periodLabel = TIMELINE_PERIODS.find(p => p.id === task.period)?.label || task.period;

    openModal(`Detail Tugas: ${escapeHtml(task.task)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Tugas</div><div>${escapeHtml(task.task) || '-'}</div>
                <div class="text-muted">Periode</div><div>${periodLabel}</div>
                <div class="text-muted">Prioritas</div><div><span class="badge badge-${getPriorityBadge(task.priority)}">${task.priority}</span></div>
                <div class="text-muted">Deadline</div><div>${task.deadline ? formatDateShort(task.deadline) : '-'}</div>
                <div class="text-muted">Penanggung Jawab</div><div class="break-word">${escapeHtml(task.assignee) || '-'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(task.notes) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Status</div><div>${task.completed ? 'Selesai' : 'Belum Selesai'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editTask(taskId)); } }
    ], 'modal-lg');
}

// ========================================
// RUNDOWN
// ========================================
function renderRundown() {
    const hasData = weddingData.rundown.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Rundown Acara</h1>
            <p class="page-subtitle">Rangkaian kegiatan pada hari pernikahan</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="rundownSearch" placeholder="Cari kegiatan...">
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddRundownModal()">+ Tambah Kegiatan</button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="timeline">
                    ${weddingData.rundown
                        .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
                        .map(r => `
                            <div class="timeline-item">
                                <div class="timeline-item-content">
                                    <div class="flex-between mb-1">
                                        <div class="timeline-time">${formatTime(r.startTime)} - ${formatTime(r.endTime)}</div>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-ghost" onclick="showRundownDetail('${r.id}')" title="Detail" aria-label="Lihat detail kegiatan">${ICONS.info}</button>
                                            <button class="btn btn-sm btn-ghost" onclick="editRundown('${r.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteRundown('${r.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                        </div>
                                    </div>
                                    <div><strong>${escapeHtml(r.activity)}</strong></div>
                                    <div class="text-muted fs-sm">
                                        ${r.location ? `
                                            <span class="inline-label">
                                                ${ICONS.venues} ${escapeHtml(r.location)}
                                            </span>
                                        ` : ''}
                                        ${r.pic && r.location ? ' • ' : ''}
                                        ${r.pic ? `
                                            <span class="inline-label">
                                                ${ICONS.contacts} ${escapeHtml(r.pic)}
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                </div>
            </div>
        </div>
        ` : renderEmptyState(ICONS.rundown, 'Belum ada rundown acara', 'Tambahkan kegiatan untuk hari pernikahan Anda', '+ Tambah Kegiatan', 'openAddRundownModal()')}
    `;
}

function initRundownEvents() {
    const search = document.getElementById('rundownSearch');
    if (search) {
        search.addEventListener('input', debounce(() => {
            const value = search.value.toLowerCase();
            let visibleCount = 0;
            document.querySelectorAll('.timeline-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                const match = text.includes(value);
                item.style.display = match ?'block' : 'none';
                if (match) visibleCount++;
            });
            const timelineContainer = document.querySelector('.timeline');
            if (timelineContainer) {
                let emptyMsg = timelineContainer.querySelector('.no-results-msg');
                if (visibleCount === 0) {
                    if (!emptyMsg) {
                        emptyMsg = document.createElement('div');
                        emptyMsg.className = 'no-results-msg';
                        emptyMsg.textContent = 'Tidak ada kegiatan yang cocok';
                        timelineContainer.appendChild(emptyMsg);
                    }
                } else if (emptyMsg) {
                    emptyMsg.remove();
                }
            }
        }, 300));
    }
}

function openAddRundownModal() {
    currentEditId = null;
    openModal('Tambah Kegiatan', `
        <div class="form-group">
            <label class="form-label required">Kegiatan</label>
            <input type="text" class="form-control" id="rundownActivity" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Waktu Mulai</label>
                <input type="time" class="form-control" id="rundownStartTime">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu Selesai</label>
                <input type="time" class="form-control" id="rundownEndTime">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="rundownLocation">
            </div>
            <div class="form-group">
                <label class="form-label">PIC</label>
                <input type="text" class="form-control" id="rundownPic">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <div class="editable-list-row">
                <select class="form-control flex-grow" id="rundownVendor">
                    <option value="">-- Pilih Vendor --</option>
                    ${weddingData.vendors.filter(v => v.status === 'Terpilih').map(v => `<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)}</option>`).join('')}
                </select>
                <button class="btn btn-sm btn-ghost vendor-info-action" title="Opsi vendor dari menu Pilihan Vendor (status Terpilih). Kelola vendor di menu tersebut." aria-label="Info vendor">${ICONS.info}</button>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="rundownNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveRundown }
    ]);
}

function editRundown(id) {
    const item = weddingData.rundown.find(r => r.id === id);
    if (!item) return;

    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih').map(v => v.name);
    const currentVendor = item.vendor ||'';

    currentEditId = id;
    openModal('Edit Kegiatan', `
        <div class="form-group">
            <label class="form-label required">Kegiatan</label>
            <input type="text" class="form-control" id="rundownActivity" value="${escapeHtml(item.activity)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Waktu Mulai</label>
                <input type="time" class="form-control" id="rundownStartTime" value="${item.startTime || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu Selesai</label>
                <input type="time" class="form-control" id="rundownEndTime" value="${item.endTime || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="rundownLocation" value="${escapeHtml(item.location) || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">PIC</label>
                <input type="text" class="form-control" id="rundownPic" value="${escapeHtml(item.pic) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <div class="editable-list-row">
                <select class="form-control flex-grow" id="rundownVendor">
                    <option value="">-- Pilih Vendor --</option>
                    ${selectedVendors.map(v => `<option value="${escapeHtml(v)}" ${currentVendor === v ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('')}
                </select>
                <button class="btn btn-sm btn-ghost vendor-info-action" title="Opsi vendor dari menu Pilihan Vendor (status Terpilih). Kelola vendor di menu tersebut." aria-label="Info vendor">${ICONS.info}</button>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="rundownNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveRundown }
    ]);
}

function saveRundown() {
    const activity = document.getElementById('rundownActivity').value.trim();
    if (!activity) {
        showToast('Nama kegiatan harus diisi', 'error');
        return;
    }

    const vendor = document.getElementById('rundownVendor')?.value ||'';

    const data = {
        id: currentEditId || generateId(),
        activity: activity,
        startTime: document.getElementById('rundownStartTime').value,
        endTime: document.getElementById('rundownEndTime').value,
        location: document.getElementById('rundownLocation').value,
        pic: document.getElementById('rundownPic').value,
        vendor: vendor,
        notes: document.getElementById('rundownNotes').value,
        date: weddingData.settings.weddingDate ||''
    };

    if (currentEditId) {
        const index = weddingData.rundown.findIndex(r => r.id === currentEditId);
        if (index !== -1) {
            weddingData.rundown[index] = data;
        }
    } else {
        weddingData.rundown.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Kegiatan berhasil disimpan', 'success');
}

function deleteRundown(id) {
    showConfirmDialog('Hapus Kegiatan', 'Apakah Anda yakin ingin menghapus kegiatan ini?', () => {
        weddingData.rundown = weddingData.rundown.filter(r => r.id !== id);
        saveData();
        renderPage();
        showToast('Kegiatan berhasil dihapus', 'success');
    });
}

function showRundownDetail(rundownId) {
    const r = weddingData.rundown.find(x => x.id === rundownId);
    if (!r) return;

    // Cross-link PIC to Emergency Contacts
    const picContact = weddingData.contacts?.find(c => c.name.toLowerCase() === (r.pic ||'').toLowerCase());
    // Cross-link Vendor to Vendors list
    const vendorData = weddingData.vendors?.find(v => v.name.toLowerCase() === (r.vendor ||'').toLowerCase());

    openModal(`Detail Kegiatan: ${escapeHtml(r.activity)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Kegiatan</div><div>${escapeHtml(r.activity) || '-'}</div>
                <div class="text-muted">Waktu Mulai</div><div>${formatTime(r.startTime)}</div>
                <div class="text-muted">Waktu Selesai</div><div>${formatTime(r.endTime)}</div>
                <div class="text-muted">Lokasi</div><div>${escapeHtml(r.location) || '-'}</div>
                <div class="text-muted">PIC</div>
                <div>
                    ${escapeHtml(r.pic) || '-'}
                    ${picContact && picContact.phone ? ` <a href="tel:${picContact.phone}" class="btn btn-xs btn-secondary ml-1" title="Hubungi PIC">${escapeHtml(picContact.phone)}</a>` : ''}
                </div>
                <div class="text-muted">Vendor</div>
                <div>
                    ${escapeHtml(r.vendor) || '-'}
                    ${vendorData && (vendorData.contact || vendorData.phone) ? ` <a href="tel:${vendorData.contact || vendorData.phone}" class="btn btn-xs btn-secondary ml-1" title="Hubungi Vendor">${escapeHtml(vendorData.contact || vendorData.phone)}</a>` : ''}
                </div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(r.notes) || '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editRundown(rundownId)); } }
    ], 'modal-lg');
}

// ========================================
// EVENTS (Save the Date)
// ========================================
function renderEvents() {
    const defaultEvents = [
        { name: 'Lamaran', icon: '' },
        { name: 'Siraman', icon: '' },
        { name: 'Pengajian', icon: '' },
        { name: 'Akad Nikah', icon: '' },
        { name: 'Resepsi', icon: '' },
        { name: 'After Party', icon: '' }
    ];

    const events = weddingData.events;
    const hasData = events.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Simpan Tanggal Acara</h1>
            <p class="page-subtitle">Tanggal-tanggal penting pernikahan Anda</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddEventModal()">+ Tambah Acara</button>
            </div>
        </div>
        
        <div class="card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Acara</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Lokasi</th>
                            <th class="actions-cell">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(e => `
                            <tr>
                                <td>${escapeHtml(e.name)}</td>
                                <td>${e.date ? formatDateShort(e.date) : '-'}</td>
                                <td>${e.time || '-'}</td>
                                <td>${escapeHtml(e.location) || '-'}</td>
                                <td class="actions-cell">
                                    <button class="btn btn-sm btn-ghost" onclick="showEventDetail('${e.id}')" title="Detail" aria-label="Lihat detail acara">${ICONS.info}</button>
                                    <button class="btn btn-sm btn-ghost" onclick="editEvent('${e.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                    <button class="btn btn-sm btn-ghost text-danger" onclick="deleteEvent('${e.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        ` : renderEmptyState(ICONS.events, 'Belum ada acara', 'Tambahkan tanggal-tanggal penting pernikahan Anda', '+ Tambah Acara', 'openAddEventModal()')}
    `;
}

function openAddEventModal() {
    currentEditId = null;
    openModal('Tambah Acara', `
        <div class="form-group">
            <label class="form-label required">Nama Acara</label>
            <input type="text" class="form-control" id="eventName" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="eventDate">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="eventTime">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Lokasi</label>
            <input type="text" class="form-control" id="eventLocation">
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="eventNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveEvent }
    ]);
}

function editEvent(id) {
    const item = weddingData.events.find(e => e.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Acara', `
        <div class="form-group">
            <label class="form-label required">Nama Acara</label>
            <input type="text" class="form-control" id="eventName" value="${escapeHtml(item.name)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="eventDate" value="${item.date || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="eventTime" value="${item.time || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Lokasi</label>
            <input type="text" class="form-control" id="eventLocation" value="${escapeHtml(item.location) || ''}">
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="eventNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveEvent }
    ]);
}

function saveEvent() {
    const name = document.getElementById('eventName').value.trim();
    if (!name) {
        showToast('Nama acara harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        notes: document.getElementById('eventNotes').value
    };

    if (currentEditId) {
        const index = weddingData.events.findIndex(e => e.id === currentEditId);
        if (index !== -1) {
            weddingData.events[index] = data;
        }
    } else {
        weddingData.events.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Acara berhasil disimpan', 'success');
}

function deleteEvent(id) {
    openModal('Hapus Acara', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus acara ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.events = weddingData.events.filter(e => e.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Acara berhasil dihapus', 'success');
        }}
    ]);
}

function showEventDetail(eventId) {
    const e = weddingData.events.find(x => x.id === eventId);
    if (!e) return;

    openModal(`Detail Acara: ${escapeHtml(e.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama Acara</div><div>${escapeHtml(e.name) || '-'}</div>
                <div class="text-muted">Tanggal</div><div>${e.date ? formatDateShort(e.date) : '-'}</div>
                <div class="text-muted">Waktu</div><div>${e.time || '-'}</div>
                <div class="text-muted">Lokasi</div><div>${escapeHtml(e.location) || '-'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(e.notes) || '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editEvent(eventId)); } }
    ], 'modal-lg');
}

// ========================================
// PACKING (Daftar Bawaan)
// ========================================
function renderPacking() {
    const categories = PACKING_CATEGORIES;

    const totalItems = weddingData.packing.length;
    const packedItems = weddingData.packing.filter(p => p.packed).length;
    const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
    const hasData = totalItems > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Daftar Bawaan</h1>
            <p class="page-subtitle">Checklist barang untuk kebutuhan pernikahan</p>
        </div>
        
        ${hasData ? `
<div class="progress-section mb-3">
            <div class="flex-between mb-2">
                <span class="progress-title">Progress Keseluruhan</span>
                <span>${packedItems}/${totalItems} barang (${percentage}%)</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="--progress-value: ${percentage}%"></div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="packingSearch" placeholder="Cari barang...">
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddPackingModal()">+ Tambah Barang</button>
            </div>
        </div>
        
        <div id="packingListContainer">
            ${categories.map(cat => {
                const items = weddingData.packing.filter(p => p.category === cat);
                const packed = items.filter(i => i.packed).length;
                const catPercentage = items.length > 0 ? Math.round((packed / items.length) * 100) : 0;
                
                return `
                    <div class="card mb-2">
                        <div class="card-header">
                            <div class="flex-between mb-2">
                                <h3 class="card-title">${cat}</h3>
                                <span class="badge badge-primary">${packed}/${items.length}</span>
                            </div>
                            ${renderProgressBar(catPercentage, { height: '6px' })}
                        </div>
                        <div class="card-body p-0 list-panel">
                            ${items.length > 0 ? `
                                <div class="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="checkbox-cell">${ICONS.check}</th>
                                                <th>Barang</th>
                                                <th class="text-center quantity-column">Jumlah</th>
                                                <th>Dibawa Oleh</th>
                                                <th>Lokasi Tujuan</th>
                                                <th class="actions-cell">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${items.map(p => `
                                                <tr class="${p.packed ? 'completed' : ''}" data-packing-id="${p.id}">
                                                    <td class="checkbox-cell">
                                                        <input type="checkbox" ${p.packed ? 'checked' : ''} onchange="togglePacked('${p.id}')">
                                                    </td>
                                                    <td>${escapeHtml(p.name)}</td>
                                                    <td class="text-center">${p.quantity || 1}</td>
                                                    <td>${escapeHtml(p.carrier) || '-'}</td>
                                                    <td>${escapeHtml(p.destination) || '-'}</td>
                                                    <td class="actions-cell">
                                                        <button class="btn btn-sm btn-ghost" onclick="showPackingDetail('${p.id}')" title="Detail" aria-label="Lihat detail barang">${ICONS.info}</button>
                                                        <button class="btn btn-sm btn-ghost" onclick="editPacking('${p.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                                        <button class="btn btn-sm btn-ghost text-danger" onclick="deletePacking('${p.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                                    </td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : '<div class="empty-block-msg">Tidak ada barang</div>'}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        ` : renderEmptyState(ICONS.packing, 'Belum ada daftar bawaan', 'Tambahkan barang-barang yang perlu dibawa saat hari pernikahan', '+ Tambah Barang', 'openAddPackingModal()')}
    `;
}

function initPackingEvents() {
    const search = document.getElementById('packingSearch');
    if (search) {
        search.addEventListener('input', debounce(() => {
            const value = search.value.toLowerCase();
            let totalVisible = 0;
            const container = document.getElementById('packingListContainer') || document.querySelector('.page');
            document.querySelectorAll('#packingListContainer .card, .page > .card.mb-2').forEach(card => {
                const rows = card.querySelectorAll('tbody tr');
                if (rows.length === 0) return;
                let cardVisible = 0;
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    const match = text.includes(value);
                    row.style.display = match ?'' : 'none';
                    if (match) cardVisible++;
                });
                card.style.display = cardVisible > 0 ?'' : 'none';
                totalVisible += cardVisible;
            });

            if (container) {
                let emptyMsg = container.querySelector('.no-results-msg');
                if (totalVisible === 0) {
                    if (!emptyMsg) {
                        emptyMsg = document.createElement('div');
                        emptyMsg.className = 'no-results-msg';
                        emptyMsg.textContent = 'Tidak ada barang yang cocok';
                        container.appendChild(emptyMsg);
                    }
                } else if (emptyMsg) {
                    emptyMsg.remove();
                }
            }
        }, 300));
    }
}

function togglePacked(id) {
    const item = weddingData.packing.find(p => p.id === id);
    if (item) {
        item.packed = !item.packed;
        saveData();

        // Update DOM directly
        const checkbox = document.querySelector(`input[onchange="togglePacked('${id}')"]`);
        if (checkbox) checkbox.checked = item.packed;

        const row = document.querySelector(`tr[data-packing-id="${id}"]`);
        if (row) {
            if (item.packed) row.classList.add('completed');
            else row.classList.remove('completed');
        }

        // Update category progress
        const catItems = weddingData.packing.filter(p => p.category === item.category);
        const packed = catItems.filter(i => i.packed).length;
        const catPercentage = catItems.length > 0 ? Math.round((packed / catItems.length) * 100) : 0;

        // Find the card for this category
        if (row) {
            const card = row.closest('.card');
            if (card) {
                const badge = card.querySelector('.badge-primary');
                if (badge) badge.textContent = `${packed}/${catItems.length}`;

                const fill = card.querySelector('.progress-fill');
                if (fill) fill.style.width = catPercentage + '%';
            }
        }

        const itemName = item.name || item.item ||'Barang';
        if (item.packed) {
            showToast(`Barang "${itemName}" sudah dikemas`, 'success');
        } else {
            showToast(`Barang "${itemName}" belum dikemas`, 'info');
        }
    }
}

function openAddPackingModal() {
    currentEditId = null;
    openModal('Tambah Barang', `
        <div class="form-group">
            <label class="form-label required">Nama Barang</label>
            <input type="text" class="form-control" id="packingName" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="packingCategory">
                    ${PACKING_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah</label>
                <input type="number" class="form-control" id="packingQuantity" value="1" min="1">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Dibawa Oleh</label>
                <input type="text" class="form-control" id="packingCarrier">
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi Tujuan</label>
                <input type="text" class="form-control" id="packingDestination">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="packingNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: savePacking }
    ]);
}

function editPacking(id) {
    const item = weddingData.packing.find(p => p.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Barang', `
        <div class="form-group">
            <label class="form-label required">Nama Barang</label>
            <input type="text" class="form-control" id="packingName" value="${escapeHtml(item.name)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="packingCategory">
                    ${PACKING_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah</label>
                <input type="number" class="form-control" id="packingQuantity" value="${item.quantity || 1}" min="1">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Dibawa Oleh</label>
                <input type="text" class="form-control" id="packingCarrier" value="${escapeHtml(item.carrier) || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi Tujuan</label>
                <input type="text" class="form-control" id="packingDestination" value="${escapeHtml(item.destination) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="packingNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: savePacking }
    ]);
}

function savePacking() {
    const name = document.getElementById('packingName').value.trim();
    if (!name) {
        showToast('Nama barang harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        category: document.getElementById('packingCategory').value,
        quantity: parseInt(document.getElementById('packingQuantity').value) || 1,
        carrier: document.getElementById('packingCarrier').value,
        destination: document.getElementById('packingDestination').value,
        notes: document.getElementById('packingNotes').value,
        packed: false
    };

    if (currentEditId) {
        const index = weddingData.packing.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            data.packed = weddingData.packing[index].packed;
            weddingData.packing[index] = data;
        }
    } else {
        weddingData.packing.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Barang berhasil disimpan', 'success');
}

function deletePacking(id) {
    openModal('Hapus Barang', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus barang ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.packing = weddingData.packing.filter(p => p.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Barang berhasil dihapus', 'success');
        }}
    ]);
}

function showPackingDetail(packingId) {
    const p = weddingData.packing.find(x => x.id === packingId);
    if (!p) return;

    openModal(`Detail Barang: ${escapeHtml(p.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama Barang</div><div>${escapeHtml(p.name) || '-'}</div>
                <div class="text-muted">Kategori</div><div>${escapeHtml(p.category)}</div>
                <div class="text-muted">Jumlah</div><div>${p.quantity || 1}</div>
                <div class="text-muted">Dibawa Oleh</div><div>${escapeHtml(p.carrier) || '-'}</div>
                <div class="text-muted">Lokasi Tujuan</div><div>${escapeHtml(p.destination) || '-'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(p.notes) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Status</div><div>${p.packed ? '<span class="badge badge-success">Sudah Dikemas</span>' : '<span class="badge badge-warning">Belum Dikemas</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editPacking(packingId)); } }
    ], 'modal-lg');
}

// ========================================
// VENDORS
// ========================================
function renderVendorProgress() {
    const statuses = VENDOR_STATUSES;
    const vendors = weddingData.vendors;
    if(vendors.length === 0) return '';

    const counts = Object.fromEntries(statuses.map(status => [status, 0]));
    vendors.forEach(vendor => {
        if (Object.prototype.hasOwnProperty.call(counts, vendor.status)) counts[vendor.status]++;
    });

    return `
        <div class="progress-section pipeline-stack">
            <div class="progress-header">
                <span class="progress-title fw-600">Progress Vendor Pipeline</span>
                <span class="progress-percentage">${counts['Terpilih']} dari ${vendors.length} Terpilih</span>
            </div>
            <div class="pipeline-track">
                ${statuses.map((status, i) => {
                    const count = counts[status];
                    if(!count) return '';
                    const percent = (count / vendors.length) * 100;
                    return `<div class="vendor-pipeline-segment" style="--progress-value: ${percent}%; --item-color: ${VENDOR_STATUS_COLORS[i]};" title="${status}: ${count}"></div>`;
                }).join('')}
            </div>
            <div class="pipeline-legend">
                ${statuses.map((status, i) => {
                    return `
                        <div class="pipeline-legend-label">
                            <div class="legend-dot" style="--item-color: ${VENDOR_STATUS_COLORS[i]};"></div>
                            <span>${status} (${counts[status]})</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderVendors() {
    const hasData = weddingData.vendors.length > 0;
    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih');

    return `
        <div class="page-header">
            <h1 class="page-title">Pilihan Vendor</h1>
            <p class="page-subtitle">Bandingkan dan pilih vendor terbaik untuk pernikahan Anda</p>
        </div>
        ${renderVendorProgress()}
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="vendorSearch" placeholder="Cari vendor...">
            </div>
            <div class="toolbar-filters">
                <select class="form-control" id="vendorFilterCategory">
                    <option value="all">Semua Kategori</option>
                    ${VENDOR_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <select class="form-control" id="vendorFilterStatus">
                    <option value="all">Semua Status</option>
                    ${VENDOR_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                <button class="btn btn-secondary" data-filter-reset="vendor" disabled onclick="resetVendorFilters()" title="Reset filter">Reset</button>
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddVendorModal()">+ Tambah Vendor</button>
            </div>
        </div>
        
        ${selectedVendors.length > 0 ? `
            <div class="card card--highlight-success mb-3">
                <div class="card-header cursor-pointer" onclick="toggleVendorSelected()">
                    <div class="flex-between">
                        <h3 class="card-title text-success">${ICONS.check} Vendor Terpilih (${selectedVendors.length})</h3>
                        ${renderIcon("chevronDown", "class=\"vendor-selected-chevron\" width=\"16\" height=\"16\" ")}
                    </div>
                </div>
                <div class="card-body initially-collapsed" id="vendorSelectedSection">
                    <div class="vendor-grid">
                        ${selectedVendors.map(v => renderVendorCard(v)).join('')}
                    </div>
                </div>
            </div>
        ` : ''}
        
        <div class="vendor-grid" id="vendorGrid">
            ${weddingData.vendors.filter(v => v.status !== 'Terpilih').map(v => renderVendorCard(v)).join('')}
        </div>
        ` : renderEmptyState(ICONS.vendors, 'Belum ada vendor', 'Tambahkan vendor untuk mulai membandingkan pilihan', '+ Tambah Vendor', 'openAddVendorModal()')}
    `;
}

function renderVendorCard(vendor) {
    const isSelected = vendor.status === 'Terpilih';
    return `
        <div class="card card--elevated ${isSelected ? 'card--selected' : ''}">
            <div class="vendor-card-header">
                <div>
                    <div class="vendor-name">${escapeHtml(vendor.name)}</div>
                    <div class="vendor-category">${vendor.category}</div>
                </div>
                <span class="badge badge-${getVendorStatusBadge(vendor.status)}">${vendor.status}</span>
            </div>
            <div class="vendor-card-body">
                <div class="vendor-info">
                    <span class="vendor-info-label">Harga</span>
                    <span>${formatCurrency(vendor.price)}</span>
                </div>
                ${vendor.contact ? `<div class="vendor-info"><span class="vendor-info-label">Kontak</span><span>${escapeHtml(vendor.contact)}</span></div>` : ''}
                ${vendor.rating ? `<div class="vendor-info"><span class="vendor-info-label">Rating</span><span>${''.repeat(Math.round(vendor.rating))}</span></div>` : ''}
                ${vendor.pros ? `<div class="mt-1 text-success fs-sm">+ ${escapeHtml(vendor.pros)}</div>` : ''}
                ${vendor.cons ? `<div class="mt-1 text-danger fs-sm">- ${escapeHtml(vendor.cons)}</div>` : ''}
            </div>
            <div class="vendor-card-footer">
                <button class="btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}" onclick="toggleVendorSelect('${vendor.id}')">
                    ${isSelected ? 'Batal' : 'Pilih'}
                </button>
                <div class="btn-group">
                    <button class="btn btn-sm btn-ghost" onclick="showVendorDetail('${vendor.id}')" title="Detail">${ICONS.info}</button>
                    <button class="btn btn-sm btn-ghost" onclick="editVendor('${vendor.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                    <button class="btn btn-sm btn-ghost text-danger" onclick="deleteVendor('${vendor.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                </div>
            </div>
        </div>
    `;
}

function getVendorStatusBadge(status) {
    return getBadgeClass('vendorStatus', status);
}

function showVendorDetail(vendorId) {
    const vendor = weddingData.vendors.find(v => v.id === vendorId);
    if (!vendor) return;

    const ratingStars = vendor.rating ?'?'.repeat(Math.round(vendor.rating)) + '?'.repeat(5 - Math.round(vendor.rating)) : '-';

    openModal(`Detail Vendor: ${escapeHtml(vendor.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama Vendor</div><div>${escapeHtml(vendor.name) || '-'}</div>
                <div class="text-muted">Kategori</div>
                <div>${escapeHtml(vendor.category)}</div>
                <div class="text-muted">Kontak</div>
                <div>${vendor.contact ? escapeHtml(vendor.contact) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Instagram/Website</div>
                <div>${vendor.social ? escapeHtml(vendor.social) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Harga</div>
                <div>${formatCurrency(vendor.price)}</div>
                <div class="text-muted">Rating (1-5)</div>
                <div>${ratingStars} ${vendor.rating ? `(${vendor.rating}/5)` : ''}</div>
                <div class="text-muted">Paket</div>
                <div>${vendor.package ? escapeHtml(vendor.package) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kelebihan</div>
                <div>${vendor.pros ? escapeHtml(vendor.pros) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kekurangan</div>
                <div>${vendor.cons ? escapeHtml(vendor.cons) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Status</div>
                <div><span class="badge badge-${getVendorStatusBadge(vendor.status)}">${vendor.status}</span></div>
                <div class="text-muted">Catatan</div>
                <div>${vendor.notes ? escapeHtml(vendor.notes) : '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editVendor(vendorId)); } }
    ], 'modal-lg');
}

function filterVendorCards() {
    const search = document.getElementById('vendorSearch')?.value?.toLowerCase() ||'';
    const category = document.getElementById('vendorFilterCategory')?.value ||'all';
    const status = document.getElementById('vendorFilterStatus')?.value ||'all';

    document.querySelectorAll('#vendorGrid .card').forEach(card => {
        const vendorName = card.querySelector('.vendor-name')?.textContent.toLowerCase() ||'';
        const vendorCategory = card.querySelector('.vendor-category')?.textContent ||'';
        const vendorStatus = card.querySelector('.vendor-card-header .badge')?.textContent ||'';

        let matches = true;

        if (search && !vendorName.includes(search)) matches = false;
        if (category !== 'all' && vendorCategory !== category) matches = false;
        if (status !== 'all' && vendorStatus !== status) matches = false;

        card.style.display = matches ?'' : 'none';
    });

    const vendorGrid = document.getElementById('vendorGrid');
    if (vendorGrid) {
        const visibleCards = vendorGrid.querySelectorAll('.card:not([style*="display: none"])');
        let emptyMsg = vendorGrid.querySelector('.no-results-msg');
        if (visibleCards.length === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'no-results-msg';
                emptyMsg.textContent = 'Tidak ada vendor yang cocok';
                vendorGrid.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    }
    balanceAllGrids();
}

function resetVendorFilters() {
    localStorage.removeItem('vendorFilterCategory');
    localStorage.removeItem('vendorFilterStatus');
    const search = document.getElementById('vendorSearch');
    if (search) search.value = '';
    const categoryFilter = document.getElementById('vendorFilterCategory');
    const statusFilter = document.getElementById('vendorFilterStatus');
    if (categoryFilter) categoryFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    filterVendorCards();
    updateFilterResetButtons();
    sizeListPreviews();
    showToast('Filter direset', 'info');
}

function initVendorsEvents() {
    const search = document.getElementById('vendorSearch');
    const categoryFilter = document.getElementById('vendorFilterCategory');
    const statusFilter = document.getElementById('vendorFilterStatus');

    if (search) {
        search.addEventListener('input', debounce(() => filterVendorCards(), 300));
    }
    if (categoryFilter) {
        categoryFilter.value = 'all';
        categoryFilter.addEventListener('change', () => filterVendorCards());
    }
    if (statusFilter) {
        statusFilter.value = 'all';
        statusFilter.addEventListener('change', () => filterVendorCards());
    }

    filterVendorCards();
}

function openAddVendorModal() {
    currentEditId = null;
    openModal('Tambah Vendor', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Vendor</label>
                <input type="text" class="form-control" id="vendorName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="vendorCategory">
                    ${VENDOR_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kontak</label>
                <input type="text" class="form-control" id="vendorContact">
            </div>
            <div class="form-group">
                <label class="form-label">Instagram/Website</label>
                <input type="text" class="form-control" id="vendorSocial">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Harga</label>
                <input type="number" class="form-control" id="vendorPrice" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Rating (1-5)</label>
                <input type="number" class="form-control" id="vendorRating" min="1" max="5" step="0.5">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Paket</label>
            <input type="text" class="form-control" id="vendorPackage">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kelebihan</label>
                <textarea class="form-control" id="vendorPros" rows="2"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Kekurangan</label>
                <textarea class="form-control" id="vendorCons" rows="2"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-control" id="vendorStatus">
                ${VENDOR_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="vendorNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveVendor }
    ]);
}

function editVendor(id) {
    const item = weddingData.vendors.find(v => v.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Vendor', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Vendor</label>
                <input type="text" class="form-control" id="vendorName" value="${escapeHtml(item.name)}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="vendorCategory">
                    ${VENDOR_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kontak</label>
                <input type="text" class="form-control" id="vendorContact" value="${escapeHtml(item.contact) || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Instagram/Website</label>
                <input type="text" class="form-control" id="vendorSocial" value="${escapeHtml(item.social) || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Harga</label>
                <input type="number" class="form-control" id="vendorPrice" value="${item.price || ''}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Rating (1-5)</label>
                <input type="number" class="form-control" id="vendorRating" value="${item.rating || ''}" min="1" max="5" step="0.5">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Paket</label>
            <input type="text" class="form-control" id="vendorPackage" value="${escapeHtml(item.package) || ''}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kelebihan</label>
                <textarea class="form-control" id="vendorPros" rows="2">${escapeHtml(item.pros) || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Kekurangan</label>
                <textarea class="form-control" id="vendorCons" rows="2">${escapeHtml(item.cons) || ''}</textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-control" id="vendorStatus">
                ${VENDOR_STATUSES.map(s => `<option value="${s}" ${item.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="vendorNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveVendor }
    ]);
}

function saveVendor() {
    const name = document.getElementById('vendorName').value.trim();
    if (!name) {
        showToast('Nama vendor harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        category: document.getElementById('vendorCategory').value,
        contact: document.getElementById('vendorContact').value,
        social: document.getElementById('vendorSocial').value,
        price: parseInt(document.getElementById('vendorPrice').value) || 0,
        rating: parseFloat(document.getElementById('vendorRating').value) || null,
        package: document.getElementById('vendorPackage').value,
        pros: document.getElementById('vendorPros').value,
        cons: document.getElementById('vendorCons').value,
        status: document.getElementById('vendorStatus').value,
        notes: document.getElementById('vendorNotes').value
    };

    if (currentEditId) {
        const index = weddingData.vendors.findIndex(v => v.id === currentEditId);
        if (index !== -1) {
            weddingData.vendors[index] = data;
        }
    } else {
        weddingData.vendors.push(data);
    }

    // Auto-sync vendor terpilih ke anggaran jika belum ada
    if (data.status === 'Terpilih' && data.price > 0) {
        if (!weddingData.budget) weddingData.budget = [];
        const existingBudgetItem = weddingData.budget.find(b => b.vendor === data.name || (b.category === data.category && b.description.includes(data.name)));
        if (!existingBudgetItem) {
            weddingData.budget.push({
                id: generateId(),
                category: data.category,
                description: `Vendor: ${data.name}${data.package ? ` (${data.package})` : ''}`,
                vendor: data.name,
                budget: data.price,
                actualCost: data.price,
                paid: 0,
                dueDate: '',
                status: 'Belum Dibayar',
                fundSource: weddingData.settings.fundSources?.[0] ||'Tabungan Bersama',
                notes: 'Sinkronisasi otomatis dari Vendor Terpilih'
            });
            showToast(`Vendor ${data.name} otomatis dicatat ke Anggaran`, 'info');
        }
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Vendor berhasil disimpan', 'success');
}

function deleteVendor(id) {
    openModal('Hapus Vendor', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus vendor ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.vendors = weddingData.vendors.filter(v => v.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Vendor berhasil dihapus', 'success');
        }}
    ]);
}

function toggleVendorSelect(id) {
    const vendor = weddingData.vendors.find(v => v.id === id);
    if (!vendor) return;

    if (vendor.status === 'Terpilih') {
        vendor.status = 'Dihubungi';
        showToast(`Pilihan vendor ${vendor.name} dibatalkan`, 'info');
    } else {
        vendor.status = 'Terpilih';
        // Auto-sync vendor terpilih ke anggaran jika belum ada
        if (vendor.price > 0) {
            if (!weddingData.budget) weddingData.budget = [];
            const existingBudgetItem = weddingData.budget.find(b => b.vendor === vendor.name || (b.category === vendor.category && b.description.includes(vendor.name)));
            if (!existingBudgetItem) {
                weddingData.budget.push({
                    id: generateId(),
                    category: vendor.category,
                    description: `Vendor: ${vendor.name}${vendor.package ? ` (${vendor.package})` : ''}`,
                    vendor: vendor.name,
                    budget: vendor.price,
                    actualCost: vendor.price,
                    paid: 0,
                    dueDate: '',
                    status: 'Belum Dibayar',
                    fundSource: weddingData.settings?.fundSources?.[0] ||'Tabungan Bersama',
                    notes: 'Sinkronisasi otomatis dari Vendor Terpilih'
                });
                showToast(`Vendor ${vendor.name} otomatis dicatat ke Anggaran`, 'info');
            }
        }
        showToast(`${vendor.name} dipilih sebagai vendor`, 'success');
    }
    saveData();

    const pageContainer = document.querySelector('.page');
    if (pageContainer) {
        pageContainer.innerHTML = renderVendors();
        initVendorsEvents();
    } else {
        renderPage();
    }
}

// ========================================
// CONTACTS
// ========================================
function renderContacts() {
    const hasData = weddingData.contacts.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Informasi Kontak</h1>
            <p class="page-subtitle">Central contact directory</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="contactSearch" placeholder="Cari kontak...">
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddContactModal()">+ Tambah Kontak</button>
            </div>
        </div>
        
        <div class="vendor-grid" id="contactsGrid">
            ${weddingData.contacts.map(c => `
                <div class="card card--elevated">
                    <div class="vendor-card-header">
                        <div>
                            <div class="vendor-name">${escapeHtml(c.name)}</div>
                            <div class="vendor-category">${escapeHtml(c.category) || 'Lainnya'}</div>
                        </div>
                    </div>
                    <div class="vendor-card-body">
                        ${c.company ? `
                        <div class="vendor-info">
                            <span class="vendor-info-label">Perusahaan</span>
                            <span>${escapeHtml(c.company)}</span>
                        </div>` : ''}
                        
                        ${c.phone ? `
                        <div class="vendor-info">
                            <span class="vendor-info-label">Telepon</span>
                            <span><a href="tel:${c.phone}">${c.phone}</a></span>
                        </div>` : ''}
                        
                        ${c.email ? `
                        <div class="vendor-info">
                            <span class="vendor-info-label">Email</span>
                            <span><a href="mailto:${c.email}">${c.email}</a></span>
                        </div>` : ''}
                    </div>
                    ${(c.company || c.phone || c.email) ? `
                    <div class="vendor-card-footer">
                        <div></div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-ghost" onclick="showContactDetail('${c.id}')" title="Detail">${ICONS.info}</button>
                            <button class="btn btn-sm btn-ghost" onclick="editContact('${c.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteContact('${c.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                        </div>
                    </div>
                    ` : `
                    <div class="vendor-card-footer">
                        <div class="btn-group push-end">
                            <button class="btn btn-sm btn-ghost" onclick="showContactDetail('${c.id}')" title="Detail">${ICONS.info}</button>
                            <button class="btn btn-sm btn-ghost" onclick="editContact('${c.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteContact('${c.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                        </div>
                    </div>
                    `}
                </div>
            `).join('')}
        </div>
        ` : renderEmptyState(ICONS.contacts, 'Belum ada kontak', 'Tambahkan kontak untuk memudahkan komunikasi', '+ Tambah Kontak', 'openAddContactModal()')}
    `;
}

function initContactsEvents() {
    const search = document.getElementById('contactSearch');
    if (search) {
        search.addEventListener('input', debounce(() => {
            const value = search.value.toLowerCase();
            const grid = document.getElementById('contactsGrid') || document.querySelector('.vendor-grid');
            if (!grid) return;
            let visibleCount = 0;
            grid.querySelectorAll('.card').forEach(card => {
                const text = card.textContent.toLowerCase();
                const match = text.includes(value);
                card.style.display = match ?'' : 'none';
                if (match) visibleCount++;
            });
            let emptyMsg = grid.querySelector('.no-results-msg');
            if (visibleCount === 0) {
                if (!emptyMsg) {
                    emptyMsg = document.createElement('div');
                    emptyMsg.className = 'no-results-msg';
                    emptyMsg.textContent = 'Tidak ada kontak yang cocok';
                    grid.appendChild(emptyMsg);
                }
            } else if (emptyMsg) {
                emptyMsg.remove();
            }
            balanceAllGrids();
        }, 300));
    }
}

function openAddContactModal() {
    currentEditId = null;
    openModal('Tambah Kontak', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama</label>
                <input type="text" class="form-control" id="contactName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <input type="text" class="form-control" id="contactCategory" placeholder="Contoh: Vendor, Keluarga, Teman">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Perusahaan/Vendor</label>
            <input type="text" class="form-control" id="contactCompany">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Telepon</label>
                <input type="tel" class="form-control" id="contactPhone">
            </div>
            <div class="form-group">
                <label class="form-label">WhatsApp</label>
                <input type="tel" class="form-control" id="contactWhatsapp">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="contactEmail">
            </div>
            <div class="form-group">
                <label class="form-label">Instagram</label>
                <input type="text" class="form-control" id="contactInstagram">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Alamat</label>
            <textarea class="form-control" id="contactAddress" rows="2"></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="contactNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveContact }
    ]);
}

function editContact(id) {
    const item = weddingData.contacts.find(c => c.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Kontak', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama</label>
                <input type="text" class="form-control" id="contactName" value="${escapeHtml(item.name)}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <input type="text" class="form-control" id="contactCategory" value="${escapeHtml(item.category) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Perusahaan/Vendor</label>
            <input type="text" class="form-control" id="contactCompany" value="${escapeHtml(item.company) || ''}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Telepon</label>
                <input type="tel" class="form-control" id="contactPhone" value="${item.phone || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">WhatsApp</label>
                <input type="tel" class="form-control" id="contactWhatsapp" value="${item.whatsapp || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="contactEmail" value="${item.email || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Instagram</label>
                <input type="text" class="form-control" id="contactInstagram" value="${item.instagram || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Alamat</label>
            <textarea class="form-control" id="contactAddress" rows="2">${escapeHtml(item.address) || ''}</textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="contactNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveContact }
    ]);
}

function saveContact() {
    const name = document.getElementById('contactName').value.trim();
    if (!name) {
        showToast('Nama kontak harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        category: document.getElementById('contactCategory').value,
        company: document.getElementById('contactCompany').value,
        phone: document.getElementById('contactPhone').value,
        whatsapp: document.getElementById('contactWhatsapp').value,
        email: document.getElementById('contactEmail').value,
        instagram: document.getElementById('contactInstagram').value,
        address: document.getElementById('contactAddress').value,
        notes: document.getElementById('contactNotes').value
    };

    if (currentEditId) {
        const index = weddingData.contacts.findIndex(c => c.id === currentEditId);
        if (index !== -1) {
            weddingData.contacts[index] = data;
        }
    } else {
        weddingData.contacts.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Kontak berhasil disimpan', 'success');
}

function deleteContact(id) {
    openModal('Hapus Kontak', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus kontak ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.contacts = weddingData.contacts.filter(c => c.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Kontak berhasil dihapus', 'success');
        }}
    ]);
}

function showContactDetail(contactId) {
    const contact = weddingData.contacts.find(c => c.id === contactId);
    if (!contact) return;

    openModal(`Detail Kontak: ${escapeHtml(contact.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama</div><div>${escapeHtml(contact.name) || '-'}</div>
                <div class="text-muted">Kategori</div>
                <div>${escapeHtml(contact.category) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Perusahaan/Vendor</div>
                <div>${escapeHtml(contact.company) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Telepon</div>
                <div>${contact.phone ? `<a href="tel:${contact.phone}">${escapeHtml(contact.phone)}</a>` : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">WhatsApp</div>
                <div>${contact.whatsapp ? `<a href="https://wa.me/${contact.whatsapp.replace(/\D/g, '')}">${escapeHtml(contact.whatsapp)}</a>` : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Email</div>
                <div>${contact.email ? `<a href="mailto:${contact.email}">${escapeHtml(contact.email)}</a>` : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Instagram</div>
                <div>${contact.instagram ? escapeHtml(contact.instagram) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Alamat</div>
                <div>${escapeHtml(contact.address) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Catatan</div>
                <div>${escapeHtml(contact.notes) || '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editContact(contactId)); } }
    ], 'modal-lg');
}

// ========================================
// CALENDAR
// ========================================
const CALENDAR_MONTH_NAMES = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function activateCalendarDay(event, date) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!event.repeat) showDayEvents(date);
}

function getCalendarDaysHtml(year, month) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const events = getCalendarEvents();
    let daysHtml = '';

    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        daysHtml += `<div class="calendar-day other-month"><div class="calendar-day-number">${day}</div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
        const isWeddingDay = weddingData.settings.weddingDate === dateStr;
        const dayEvents = events.filter(e => e.date === dateStr);

        const hasEvents = dayEvents.length > 0;
        const extraEventsCount = dayEvents.length - 2;

        daysHtml += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${isWeddingDay ? 'wedding-day' : ''} ${hasEvents ? 'has-events' : ''}" 
                 ${hasEvents ? `role="button" tabindex="0" aria-haspopup="dialog" aria-controls="modal" aria-label="${escapeHtml(formatDate(dateStr))}, ${dayEvents.length} agenda. Buka detail." onclick="showDayEvents('${dateStr}')" onkeydown="activateCalendarDay(event, '${dateStr}')"` : ''}>
                <div class="calendar-day-header">
                    <div class="calendar-day-number">${day}</div>
                    ${isToday ? `<div class="today-label">Hari Ini</div>` : ''}
                </div>
                ${dayEvents.slice(0, 2).map(e => `<div class="calendar-event dynamic-background" style="--item-color: ${e.color};">${escapeHtml(e.title.substring(0, 15))}${e.title.length > 15 ? '...' : ''}</div>`).join('')}
                ${extraEventsCount > 0 ? `<div class="calendar-event-more">+${extraEventsCount} lainnya</div>` : ''}
            </div>
        `;
    }

    const remainingDays = 42 - (startingDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        daysHtml += `<div class="calendar-day other-month"><div class="calendar-day-number">${day}</div></div>`;
    }

    return daysHtml;
}

function renderCalendar() {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const daysHtml = getCalendarDaysHtml(year, month);

    return `
        <div class="page-header">
            <h1 class="page-title">Kalender</h1>
            <p class="page-subtitle">Jadwal dan event pernikahan</p>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="calendar-header">
                    <div>
                        <button class="btn btn-secondary btn-sm" onclick="goToToday()">Hari Ini</button>
                    </div>
                    <div class="calendar-nav">
                        <button class="btn btn-secondary btn-sm" aria-label="Bulan Sebelumnya" title="Bulan Sebelumnya" onclick="prevMonth()">${ICONS.chevronLeft}</button>
                        <h2 class="calendar-title" id="calendarTitle">${CALENDAR_MONTH_NAMES[month]} ${year}</h2>
                        <button class="btn btn-secondary btn-sm" aria-label="Bulan Berikutnya" title="Bulan Berikutnya" onclick="nextMonth()">${ICONS.chevronRight}</button>
                    </div>
                    <div class="calendar-header-spacer"></div>
                </div>
                
                <div class="calendar-legend">
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-primary"></span> Tugas</div>
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-warning"></span> Rundown</div>
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-success"></span> Acara</div>
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-danger"></span> Anggaran</div>
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-info"></span> Honeymoon</div>
                    <div class="calendar-legend-item"><span class="calendar-legend-dot legend-special"></span> Spesial</div>
                </div>
                
                <div class="calendar-grid">
                    <div class="calendar-weekdays">
                        ${dayNames.map(d => `<div class="calendar-weekday">${d}</div>`).join('')}
                    </div>
                    <div class="calendar-days" id="calendarDays">
                        ${daysHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateCalendarView() {
    const titleEl = document.getElementById('calendarTitle');
    const daysEl = document.getElementById('calendarDays');

    if (titleEl && daysEl) {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        titleEl.textContent = `${CALENDAR_MONTH_NAMES[month]} ${year}`;
        daysEl.innerHTML = getCalendarDaysHtml(year, month);
        animateUI(daysEl, [{ opacity: 0.4 }, { opacity: 1 }], 180);
    } else {
        renderPage();
    }
}

function prevMonth() {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    updateCalendarView();
}

function nextMonth() {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    updateCalendarView();
}

function goToToday() {
    calendarDate = new Date();
    updateCalendarView();
}

function showDayEvents(dateStr) {
    const events = getCalendarEvents().filter(e => e.date === dateStr);

    const content = events.length > 0
    ? events.map(e => {
        return `<div class="mb-2 p-2 flex-between agenda-item" style="--item-color: ${e.color};">
                <div>
                    <strong>${escapeHtml(e.title)}</strong>
                    <div class="text-muted fs-sm">${e.type}</div>
                </div>
                ${e.context ? `<div class="text-right fs-sm text-primary fw-500 agenda-context">${e.context}</div>` : ''}
            </div>`;
    }).join('')
    : '<div class="empty-block-msg">Tidak ada event pada tanggal ini</div>';

    openModal(formatDate(dateStr), content, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal }
    ]);
}

// ========================================
// BUDGET
// ========================================
function renderBudget() {
    const summary = calculateBudgetSummary();
    const targetBudget = weddingData.settings.targetBudget || summary.totalBudget;
    const hasData = weddingData.budget.length > 0;

    const categoryTotals = {};
    if (hasData) {
        BUDGET_CATEGORIES.forEach(cat => {
            const items = weddingData.budget.filter(b => b.category === cat);
            categoryTotals[cat] = {
                budget: items.reduce((sum, b) => sum + (b.budget || 0), 0),
                actual: items.reduce((sum, b) => sum + (b.actualCost || 0), 0),
                items: items.length
            };
        });
    }

    return `
        <div class="page-header">
            <h1 class="page-title">Anggaran</h1>
            <p class="page-subtitle">Kelola keuangan pernikahan Anda</p>
        </div>
        
        ${hasData ? `
        <div class="kpi-grid mb-3">
            <div class="kpi-card kpi-card--start">
                <div class="kpi-card-header">
                    <div class="kpi-label">Target Budget</div>
                    <div class="kpi-badge kpi-badge--primary">${ICONS.target}</div>
                </div>
                <div class="kpi-value">${formatCurrency(targetBudget)}</div>
            </div>
            <div class="kpi-card kpi-card--start">
                <div class="kpi-card-header">
                    <div class="kpi-label">Total Estimasi</div>
                    <div class="kpi-badge kpi-badge--primary">${ICONS.budget}</div>
                </div>
                <div class="kpi-value">${formatCurrency(summary.totalBudget)}</div>
            </div>
            <div class="kpi-card kpi-card--start ${summary.totalActual > targetBudget ? 'danger' : ''}">
                <div class="kpi-card-header">
                    <div class="kpi-label">Total Aktual</div>
                    <div class="kpi-badge ${summary.totalActual > targetBudget ? 'kpi-badge--danger' : 'kpi-badge--warn'}">${ICONS.barChart}</div>
                </div>
                <div class="kpi-value">${formatCurrency(summary.totalActual)}</div>
            </div>
            <div class="kpi-card kpi-card--start success">
                <div class="kpi-card-header">
                    <div class="kpi-label">Sudah Dibayar</div>
                    <div class="kpi-badge kpi-badge--success">${ICONS.checkCircle}</div>
                </div>
                <div class="kpi-value">${formatCurrency(summary.totalPaid)}</div>
            </div>
            <div class="kpi-card kpi-card--start ${summary.outstanding > 0 ? 'warning' : 'success'}">
                <div class="kpi-card-header">
                    <div class="kpi-label">Sisa Tagihan</div>
                    <div class="kpi-badge ${summary.outstanding > 0 ? 'kpi-badge--warn' : 'kpi-badge--success'}">${ICONS.rundown}</div>
                </div>
                <div class="kpi-value">${formatCurrency(summary.outstanding)}</div>
            </div>
            <div class="kpi-card kpi-card--start ${summary.remaining < 0 ? 'danger' : 'primary'}">
                <div class="kpi-card-header">
                    <div class="kpi-label">Sisa Budget</div>
                    <div class="kpi-badge ${summary.remaining < 0 ? 'kpi-badge--danger' : 'kpi-badge--primary'}">${ICONS.card}</div>
                </div>
                <div class="kpi-value">${formatCurrency(summary.remaining)}</div>
            </div>
        </div>
        
        ${summary.remaining < 0 ? `
            <div class="card card--highlight-danger mb-3">
                <div class="card-body text-center content-note">
                    <strong class="text-danger">${ICONS.warningSmall} Pengeluaran melebihi target budget!</strong>
                </div>
            </div>
        ` : ''}
        
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">Progress per Kategori</h3>
            </div>
            <div class="card-body">
                <div class="budget-categories">
                    ${BUDGET_CATEGORIES.filter(cat => categoryTotals[cat].items > 0).map(cat => {
                        const catData = categoryTotals[cat];
                        const percentage = catData.budget > 0 ? Math.min(100, Math.round((catData.actual / catData.budget) * 100)) : 0;
                        return `
                            <div class="card card--elevated p-3 budget-category-card">
                                <div class="flex-between mb-2">
                                    <span class="fw-600 text-ink fs-body">${cat}</span>
                                    <span class="badge badge-primary">${catData.items} item</span>
                                </div>
                                <div class="progress-bar mb-2 progress-bar-small">
                                    <div class="progress-fill" style="--progress-value: ${percentage}%; --progress-color: ${percentage > 100 ? 'var(--danger)' : 'var(--primary)'}"></div>
                                </div>
                                <div class="flex-between fs-sm gap-2">
                                    <span class="truncate dynamic-text" style="--item-color: ${percentage > 100 ? 'var(--danger)' : 'var(--ink)'};">${formatCurrency(catData.actual)}</span>
                                    <span class="text-muted truncate">/ ${formatCurrency(catData.budget)}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="budgetSearch" placeholder="Cari item...">
            </div>
            <div class="toolbar-filters">
                <select class="form-control" id="budgetFilterCategory">
                    <option value="all">Semua Kategori</option>
                    ${BUDGET_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <select class="form-control" id="budgetFilterStatus">
                    <option value="all">Semua Status</option>
                    ${PAYMENT_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                <button class="btn btn-secondary" data-filter-reset="budget" disabled onclick="resetBudgetFilters()" title="Reset filter">Reset</button>
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddBudgetModal()">+ Tambah Item</button>
            </div>
        </div>
        
        <div id="budgetGridContainer">
            ${BUDGET_CATEGORIES.map(cat => {
                const items = weddingData.budget.filter(b => b.category === cat);
                if (items.length === 0) return '';
                const catActual = items.reduce((sum, b) => sum + (b.actualCost || 0), 0);
                return `
                    <div class="mb-4 budget-category-group">
                        <div class="flex-between mb-3 budget-group-header">
                            <h3 class="text-ink truncate budget-group-title">
                                <div class="budget-category-dot"></div>
                                <span class="truncate">${cat}</span>
                            </h3>
                            <div class="text-muted flex-shrink-0 budget-group-meta">
                                <span class="badge badge-muted">${items.length} item</span> &nbsp; Total: <span class="total-value">${formatCurrency(catActual)}</span>
                            </div>
                        </div>
                        <div class="vendor-grid">
                            ${items.map(b => {
                                const sisa = b.actualCost - b.paid;
                                return `
                                <div class="card card--elevated budget-card" data-category="${escapeHtml(b.category)}" data-status="${escapeHtml(b.status)}">
                                    <div class="vendor-card-header">
                                        <div>
                                            <div class="vendor-name">${escapeHtml(b.description)}</div>
                                            <div class="vendor-category">${b.vendor ? escapeHtml(b.vendor) : 'Tanpa Vendor'}</div>
                                        </div>
                                        <span class="badge badge-${getPaymentStatusBadge(b.status)}">${b.status}</span>
                                    </div>
                                    <div class="vendor-card-body">
                                        <div class="vendor-info">
                                            <span class="vendor-info-label">Budget</span>
                                            <span>${formatCurrency(b.budget)}</span>
                                        </div>
                                        <div class="vendor-info">
                                            <span class="vendor-info-label">Actual / Realisasi</span>
                                            <span>${formatCurrency(b.actualCost)}</span>
                                        </div>
                                        <div class="vendor-info">
                                            <span class="vendor-info-label">Sudah Dibayar</span>
                                            <span>${formatCurrency(b.paid)}</span>
                                        </div>
                                        <div class="vendor-info mt-1 vendor-info-divider">
                                            <span class="vendor-info-label fw-600">Sisa Tagihan</span>
                                            <span class="dynamic-text" style="--item-color: ${sisa > 0 ? 'var(--danger)' : 'var(--ink)'};">${formatCurrency(sisa)}</span>
                                        </div>
                                        ${b.dueDate ? `
                                        <div class="vendor-info mt-1">
                                            <span class="vendor-info-label">Jatuh Tempo</span>
                                            <span>${formatDateShort(b.dueDate)}</span>
                                        </div>` : ''}
                                    </div>
                                    <div class="vendor-card-footer">
                                        <div></div>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-ghost" onclick="showBudgetDetail('${b.id}')" title="Detail" aria-label="Lihat detail anggaran">${ICONS.info}</button>
                                            <button class="btn btn-sm btn-ghost" onclick="editBudget('${b.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteBudget('${b.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                        </div>
                                    </div>
                                </div>
                                `
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        ` : renderEmptyState(ICONS.budget, 'Belum ada item anggaran', 'Mulai kelola keuangan pernikahan Anda', '+ Tambah Item', 'openAddBudgetModal()')}
    `;
}

function getPaymentStatusBadge(status) {
    return getBadgeClass('paymentStatus', status);
}

function filterBudgetCards() {
    const search = document.getElementById('budgetSearch')?.value?.toLowerCase() ||'';
    const category = document.getElementById('budgetFilterCategory')?.value ||'all';
    const status = document.getElementById('budgetFilterStatus')?.value ||'all';

    document.querySelectorAll('.budget-category-group').forEach(group => {
        let hasVisible = false;
        group.querySelectorAll('.budget-card').forEach(card => {
            const desc = card.querySelector('.vendor-name')?.textContent.toLowerCase() ||'';
            const cat = card.getAttribute('data-category') ||'';
            const stat = card.getAttribute('data-status') ||'';

            let matches = true;
            if (search && !desc.includes(search)) matches = false;
            if (category !== 'all' && cat !== category) matches = false;
            if (status !== 'all' && stat !== status) matches = false;

            card.style.display = matches ?'' : 'none';
            if (matches) hasVisible = true;
        });
        group.style.display = hasVisible ?'' : 'none';
    });

    const container = document.getElementById('budgetGridContainer');
    if (container) {
        const visibleCards = container.querySelectorAll('.budget-card:not([style*="display: none"])');
        let emptyMsg = container.querySelector('.no-results-msg');
        if (visibleCards.length === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'no-results-msg';
                emptyMsg.textContent = 'Tidak ada item anggaran yang cocok';
                container.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    }
}

function resetBudgetFilters() {
    localStorage.removeItem('budgetFilterCategory');
    localStorage.removeItem('budgetFilterStatus');
    const searchInput = document.getElementById('budgetSearch');
    const categoryFilter = document.getElementById('budgetFilterCategory');
    const statusFilter = document.getElementById('budgetFilterStatus');
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    filterBudgetCards();
    updateFilterResetButtons();
    sizeListPreviews();
    showToast('Filter direset', 'info');
}

function initBudgetEvents() {
    if (!weddingData.budget || weddingData.budget.length === 0) return;
    const search = document.getElementById('budgetSearch');
    const categoryFilter = document.getElementById('budgetFilterCategory');
    const statusFilter = document.getElementById('budgetFilterStatus');

    if (search) {
        search.addEventListener('input', debounce(() => filterBudgetCards(), 300));
    }
    if (categoryFilter) {
        categoryFilter.value = 'all';
        categoryFilter.addEventListener('change', () => filterBudgetCards());
    }
    if (statusFilter) {
        statusFilter.value = 'all';
        statusFilter.addEventListener('change', () => filterBudgetCards());
    }

    filterBudgetCards();
}

function openRecordDetail(title, fields, actionLabel, action) {
    const content = '<div class="details-grid">' + fields.map(([label, value]) =>
        '<div class="text-muted">' + escapeHtml(label) + '</div><div class="detail-value">' +
        escapeHtml(value === null || value === undefined || value === '' ? '-' : String(value)) + '</div>'
    ).join('') + '</div>';
    openModal(title, content, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: actionLabel, class: 'btn-primary', onClick: () => closeModal(action) }
    ], 'modal-lg');
}

function showBudgetDetail(id) {
    const item = weddingData.budget.find(item => item.id === id);
    if (!item) return;
    openRecordDetail('Detail Item Anggaran', [
        ['Kategori', item.category], ['Deskripsi', item.description], ['Vendor', item.vendor],
        ['Budget', formatCurrency(item.budget)], ['Actual Cost', formatCurrency(item.actualCost)],
        ['Sudah Dibayar', formatCurrency(item.paid)],
        ['Jatuh Tempo', item.dueDate ? formatDate(item.dueDate) : ''],
        ['Status Pembayaran', item.status], ['Penyumbang Dana', item.fundSource], ['Catatan', item.notes],
        ['Sisa Tagihan', formatCurrency((item.actualCost || 0) - (item.paid || 0))]
    ], 'Edit', () => editBudget(id));
}

function showKUADetail(section, id) {
    const item = weddingData.kuaChecklist[section]?.find(item => item.id === id);
    if (!item) return;
    openRecordDetail('Detail Dokumen/Persyaratan', [
        ['Nama Dokumen/Persyaratan', item.name], ['Catatan/Keterangan', item.notes],
        ['Status', item.checked ? 'Selesai' : 'Belum selesai']
    ], 'Edit', () => editKUAItem(section, id));
}

function showTableDetail(id) {
    const table = weddingData.seating.find(table => table.id === id);
    if (!table) return;
    const guests = table.guests || [];
    openRecordDetail('Detail Meja', [
        ['Nama/Nomor Meja', table.name], ['Kapasitas', table.capacity], ['Kursi Terisi', guests.length],
        ['Sisa Kursi', Math.max(0, table.capacity - guests.length)],
        ['Status', guests.length > table.capacity ? 'Melebihi kapasitas' : guests.length === table.capacity ? 'Penuh' : 'Tersedia'],
        ['Daftar Tamu', guests.length ? guests.join('\n') : 'Belum ada tamu']
    ], 'Assign Tamu', () => openAssignGuestModal(id));
}

function openAddBudgetModal() {
    currentEditId = null;
    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih');

    openModal('Tambah Item Anggaran', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="budgetCategory">
                    ${BUDGET_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label required">Deskripsi</label>
                <input type="text" class="form-control" id="budgetDescription" required>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <select class="form-control" id="budgetVendor">
                <option value="">- Pilih Vendor -</option>
                ${selectedVendors.map(v => `<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)}</option>`).join('')}
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Budget</label>
                <input type="number" class="form-control" id="budgetAmount" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Actual Cost</label>
                <input type="number" class="form-control" id="budgetActual" min="0">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Sudah Dibayar</label>
                <input type="number" class="form-control" id="budgetPaid" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Jatuh Tempo</label>
                <input type="date" class="form-control" id="budgetDueDate">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Status Pembayaran</label>
                <select class="form-control" id="budgetStatus">
                    ${PAYMENT_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Penyumbang Dana</label>
                <select class="form-control" id="budgetFundSource">
                    <option value="">- Pilih -</option>
                    ${weddingData.settings.fundSources.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="budgetNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveBudget }
    ]);
}

function editBudget(id) {
    const item = weddingData.budget.find(b => b.id === id);
    if (!item) return;

    currentEditId = id;
    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih');

    openModal('Edit Item Anggaran', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="budgetCategory">
                    ${BUDGET_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label required">Deskripsi</label>
                <input type="text" class="form-control" id="budgetDescription" value="${escapeHtml(item.description)}" required>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <select class="form-control" id="budgetVendor">
                <option value="">- Pilih Vendor -</option>
                ${selectedVendors.map(v => `<option value="${escapeHtml(v.name)}" ${item.vendor === v.name ? 'selected' : ''}>${escapeHtml(v.name)}</option>`).join('')}
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Budget</label>
                <input type="number" class="form-control" id="budgetAmount" value="${item.budget || ''}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Actual Cost</label>
                <input type="number" class="form-control" id="budgetActual" value="${item.actualCost || ''}" min="0">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Sudah Dibayar</label>
                <input type="number" class="form-control" id="budgetPaid" value="${item.paid || ''}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Jatuh Tempo</label>
                <input type="date" class="form-control" id="budgetDueDate" value="${item.dueDate || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Status Pembayaran</label>
                <select class="form-control" id="budgetStatus">
                    ${PAYMENT_STATUSES.map(s => `<option value="${s}" ${item.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Penyumbang Dana</label>
                <select class="form-control" id="budgetFundSource">
                    <option value="">- Pilih -</option>
                    ${weddingData.settings.fundSources.map(s => `<option value="${s}" ${item.fundSource === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="budgetNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveBudget }
    ]);
}

function saveBudget() {
    const description = document.getElementById('budgetDescription').value.trim();
    if (!description) {
        showToast('Deskripsi harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        category: document.getElementById('budgetCategory').value,
        description: description,
        vendor: document.getElementById('budgetVendor').value,
        budget: parseInt(document.getElementById('budgetAmount').value) || 0,
        actualCost: parseInt(document.getElementById('budgetActual').value) || 0,
        paid: parseInt(document.getElementById('budgetPaid').value) || 0,
        dueDate: document.getElementById('budgetDueDate').value,
        status: document.getElementById('budgetStatus').value,
        fundSource: document.getElementById('budgetFundSource').value,
        notes: document.getElementById('budgetNotes').value
    };

    if (currentEditId) {
        const index = weddingData.budget.findIndex(b => b.id === currentEditId);
        if (index !== -1) {
            weddingData.budget[index] = data;
        }
    } else {
        weddingData.budget.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Item anggaran berhasil disimpan', 'success');
}

function deleteBudget(id) {
    openModal('Hapus Item', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus item ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.budget = weddingData.budget.filter(b => b.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Item berhasil dihapus', 'success');
        }}
    ]);
}

// ========================================
// GUESTS
// ========================================
function formatWhatsAppUrl(phone, guestName) {
    if (!phone) return '';
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '62' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('8')) {
        cleanPhone = '62' + cleanPhone;
    }
    const bride = weddingData.settings.brideName ||'Mempelai Wanita';
    const groom = weddingData.settings.groomName ||'Mempelai Pria';
    const couple = `${groom} & ${bride}`;
    const dateStr = weddingData.settings.weddingDate ? formatDate(weddingData.settings.weddingDate) : 'Hari Bahagia Kami';
    const venue = weddingData.settings.venueName ||'';

    const message = `Halo ${guestName},\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di momen pernikahan kami:\n\n*${couple}*\n📅 Tanggal: ${dateStr}${venue ? `\n📍 Tempat: ${venue}` : ''}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

function printGuestBook() {
    const guests = weddingData.guests || [];
    if (guests.length === 0) {
        showToast('Belum ada data tamu untuk dicetak', 'warning');
        return;
    }
    const bride = weddingData.settings.brideName ||'Mempelai Wanita';
    const groom = weddingData.settings.groomName ||'Mempelai Pria';
    const dateStr = weddingData.settings.weddingDate ? formatDate(weddingData.settings.weddingDate) : '';
    const venue = weddingData.settings.venueName ||'';

    const printWin = window.open('', '_blank');
    if (!printWin) {
        showToast('Gagal membuka jendela cetak. Periksa izin popup browser.', 'error');
        return;
    }

    const sortedGuests = [...guests].sort((a, b) => a.name.localeCompare(b.name, 'id'));

    printWin.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Buku Penerima Tamu - ${escapeHtml(groom)} & ${escapeHtml(bride)}</title>
    <link rel="stylesheet" href="${new URL('style.css?v=' + ASSET_VERSION, document.baseURI).href}">
</head>
<body class="guestbook-print">
    <div class="print-btn-bar">
        <button class="print-btn" onclick="window.print()">Cetak Buku Tamu (Print)</button>
    </div>
    <div class="header">
        <h1>DAFTAR HADIR & BUKU TAMU RESEPSI</h1>
        <p><strong>Pernikahan ${escapeHtml(groom)} & ${escapeHtml(bride)}</strong></p>
        <p>${dateStr ? `Tanggal: ${dateStr}` : ''}${venue ? ` | Tempat: ${escapeHtml(venue)}` : ''}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th class="no-col">No</th>
                <th>Nama Tamu Undangan</th>
                <th>Kategori / Tag</th>
                <th class="pax-col">Pax</th>
                <th>Meja</th>
                <th class="signature-col center">Tanda Tangan / Kehadiran</th>
                <th class="center souvenir-column">Souvenir</th>
                <th>Catatan / No. Amplop</th>
            </tr>
        </thead>
        <tbody>
            ${sortedGuests.map((g, idx) => {
                const assignedTable = weddingData.seating?.find(t => t.guests && t.guests.includes(g.name));
                const tableName = g.table || (assignedTable ? assignedTable.name : '-');
                return `<tr>
                    <td class="no-col">${idx + 1}</td>
                    <td><strong>${escapeHtml(g.name)}</strong></td>
                    <td>${escapeHtml(g.tag || '-')}</td>
                    <td class="pax-col">${g.guestCount || 1}</td>
                    <td>${escapeHtml(tableName)}</td>
                    <td class="signature-col"></td>
                    <td class="center">${g.souvenirGiven ? '✓' : ''}</td>
                    <td></td>
                </tr>`;
            }).join('')}
        </tbody>
    </table>
</body>
</html>`);
    printWin.document.close();
}

function renderGuests() {
    const summary = calculateGuestSummary();
    const hasData = weddingData.guests.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Daftar Tamu</h1>
            <p class="page-subtitle">Kelola undangan dan RSVP tamu</p>
        </div>
        
        ${hasData ? `
        <div class="kpi-grid mb-3">
            <div class="kpi-card kpi-card--start">
                <div class="kpi-card-header">
                    <div class="kpi-label">Total Undangan</div>
                    <div class="kpi-badge kpi-badge--primary">${ICONS.guests}</div>
                </div>
                <div class="kpi-value">${summary.totalInvitations}</div>
            </div>
            <div class="kpi-card kpi-card--start">
                <div class="kpi-card-header">
                    <div class="kpi-label">Total Tamu (Pax)</div>
                    <div class="kpi-badge kpi-badge--primary">${ICONS.guests}</div>
                </div>
                <div class="kpi-value">${summary.totalGuests}</div>
            </div>
            <div class="kpi-card kpi-card--start success">
                <div class="kpi-card-header">
                    <div class="kpi-label">Hadir</div>
                    <div class="kpi-badge kpi-badge--success">${ICONS.checkCircle}</div>
                </div>
                <div class="kpi-value">${summary.confirmed}</div>
            </div>
            <div class="kpi-card kpi-card--start danger">
                <div class="kpi-card-header">
                    <div class="kpi-label">Tidak Hadir</div>
                    <div class="kpi-badge kpi-badge--danger">${ICONS.close}</div>
                </div>
                <div class="kpi-value">${summary.notAttending}</div>
            </div>
            <div class="kpi-card kpi-card--start warning">
                <div class="kpi-card-header">
                    <div class="kpi-label">Belum Konfirmasi</div>
                    <div class="kpi-badge kpi-badge--warn">${ICONS.rundown}</div>
                </div>
                <div class="kpi-value">${summary.pending}</div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-search search-input">
                <input type="text" class="form-control" id="guestSearch" placeholder="Cari tamu...">
            </div>
            <div class="toolbar-filters">
                <select class="form-control" id="guestFilterTag">
                    <option value="all">Semua Tag</option>
                    ${weddingData.settings.guestTags.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
                <select class="form-control" id="guestFilterRSVP">
                    <option value="all">Semua RSVP</option>
                    ${RSVP_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                <button class="btn btn-secondary" data-filter-reset="guest" disabled onclick="resetGuestFilters()" title="Reset filter">Reset</button>
            </div>
            <div class="toolbar-actions">
                <button class="btn btn-secondary" onclick="printGuestBook()" title="Cetak Buku Tamu / Daftar Hadir">${ICONS.print} Cetak Buku Tamu</button>
                <button class="btn btn-primary" onclick="openAddGuestModal()">+ Tambah Tamu</button>
            </div>
        </div>
        
        <div class="vendor-grid" id="guestsGrid">
            ${weddingData.guests.map(g => {
                const assignedTable = weddingData.seating?.find(t => t.guests && t.guests.includes(g.name));
                const tableName = g.table || (assignedTable ? assignedTable.name : '');
                const waUrl = formatWhatsAppUrl(g.phone, g.name);
                
                return `
                <div class="card card--elevated guest-card ${g.rsvp === 'Tidak Hadir' ? 'completed' : ''}" data-name="${escapeHtml(g.name)}" data-tag="${g.tag || ''}" data-rsvp="${g.rsvp || 'Belum Dikonfirmasi'}">
                    <div class="vendor-card-header">
                        <div>
                            <div class="vendor-name">${escapeHtml(g.name)}</div>
                            <div class="vendor-category">${escapeHtml(g.tag || '-')}</div>
                        </div>
                        <span class="badge badge-${getRSVPBadge(g.rsvp)}">${g.rsvp || 'Belum Dikonfirmasi'}</span>
                    </div>
                    <div class="vendor-card-body">
                        ${g.phone ? `
                        <div class="vendor-info">
                            <span class="vendor-info-label">Telepon</span>
                            <span><a href="tel:${escapeHtml(g.phone)}">${escapeHtml(g.phone)}</a></span>
                        </div>` : ''}
                        <div class="vendor-info">
                            <span class="vendor-info-label">Jumlah Tamu</span>
                            <span>${g.guestCount || 1} orang</span>
                        </div>
                        <div class="vendor-info">
                            <span class="vendor-info-label">Meja</span>
                            <span>${tableName ? `<span class="badge badge-primary">${escapeHtml(tableName)}</span>` : '<span class="text-muted">Belum diatur</span>'}</span>
                        </div>
                        <div class="vendor-info">
                            <span class="vendor-info-label">Status</span>
                            <span>
                                ${g.invitationSent ? `<span class="badge badge-primary badge-spacing">${ICONS.check} Undangan</span>` : ''}
                                ${g.souvenirGiven ? `<span class="badge badge-success">${ICONS.check} Souvenir</span>` : ''}
                                ${!g.invitationSent && !g.souvenirGiven ? '-' : ''}
                            </span>
                        </div>
                    </div>
                    <div class="vendor-card-footer">
                        <div>
                            ${waUrl ? `
                                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-outline-success" title="Kirim Undangan WhatsApp">
                                    ${ICONS.whatsapp} Kirim WA
                                </a>
                            ` : ''}
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-ghost" onclick="showGuestDetail('${g.id}')" title="Detail">${ICONS.info}</button>
                            <button class="btn btn-sm btn-ghost" onclick="editGuest('${g.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteGuest('${g.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                        </div>
                    </div>
                </div>
            `}).join('')}
        </div>
        ` : renderEmptyState(ICONS.guests, 'Belum ada tamu', 'Tambahkan daftar tamu untuk pernikahan Anda', '+ Tambah Tamu', 'openAddGuestModal()')}
    `;
}

function getRSVPBadge(rsvp) {
    return getBadgeClass('rsvpStatus', rsvp);
}

function filterGuestCards() {
    const search = document.getElementById('guestSearch')?.value?.toLowerCase() ||'';
    const tag = document.getElementById('guestFilterTag')?.value ||'all';
    const rsvp = document.getElementById('guestFilterRSVP')?.value ||'all';

    document.querySelectorAll('.guest-card').forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cardTag = card.dataset.tag;
        const cardRsvp = card.dataset.rsvp;

        let matches = true;
        if (search && !name.includes(search)) matches = false;
        if (tag !== 'all' && cardTag !== tag) matches = false;
        if (rsvp !== 'all' && cardRsvp !== rsvp) matches = false;

        card.style.display = matches ?'' : 'none';
    });

    const guestsGrid = document.getElementById('guestsGrid');
    if (guestsGrid) {
        const visibleCards = guestsGrid.querySelectorAll('.guest-card:not([style*="display: none"])');
        let emptyMsg = guestsGrid.querySelector('.no-results-msg');
        if (visibleCards.length === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'no-results-msg';
                emptyMsg.textContent = 'Tidak ada tamu yang cocok';
                guestsGrid.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    }
    balanceAllGrids();
}

function initGuestsEvents() {
    const search = document.getElementById('guestSearch');
    const tagFilter = document.getElementById('guestFilterTag');
    const rsvpFilter = document.getElementById('guestFilterRSVP');

    if (search) search.addEventListener('input', debounce(() => filterGuestCards(), 300));
    if (tagFilter) tagFilter.addEventListener('change', () => filterGuestCards());
    if (rsvpFilter) rsvpFilter.addEventListener('change', () => filterGuestCards());
}

function resetGuestFilters() {
    const search = document.getElementById('guestSearch');
    const tagFilter = document.getElementById('guestFilterTag');
    const rsvpFilter = document.getElementById('guestFilterRSVP');

    if (search) search.value = '';
    if (tagFilter) tagFilter.value = 'all';
    if (rsvpFilter) rsvpFilter.value = 'all';

    filterGuestCards();
    updateFilterResetButtons();
    sizeListPreviews();
    showToast('Filter direset', 'info');
}

function openAddGuestModal() {
    currentEditId = null;
    const seatingTables = weddingData.seating || [];

    openModal('Tambah Tamu', `
        <div class="form-group">
            <label class="form-label required">Nama</label>
            <input type="text" class="form-control" id="guestName" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tag</label>
                <select class="form-control" id="guestTag">
                    ${weddingData.settings.guestTags.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Pihak</label>
                <select class="form-control" id="guestSide">
                    <option value="Wanita">Pengantin Wanita</option>
                    <option value="Pria">Pengantin Pria</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Telepon</label>
                <input type="tel" class="form-control" id="guestPhone" placeholder="08xxxxxxxxxx">
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah Tamu</label>
                <input type="number" class="form-control" id="guestCount" value="1" min="1">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Alamat</label>
            <textarea class="form-control" id="guestAddress" rows="2"></textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">RSVP</label>
                <select class="form-control" id="guestRSVP">
                    ${RSVP_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Meja</label>
                ${seatingTables.length > 0 ? `
                <select class="form-control" id="guestTable">
                    <option value="">- Belum Ditentukan -</option>
                    ${seatingTables.map(t => `<option value="${escapeHtml(t.name)}">${escapeHtml(t.name)} (${t.guests?.length || 0}/${t.capacity} kursi)</option>`).join('')}
                </select>
                ` : `
                <input type="text" class="form-control" id="guestTable" placeholder="Contoh: Meja 1">
                `}
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Undangan Terkirim</label>
                <select class="form-control" id="guestInvitation">
                    <option value="false">Belum</option>
                    <option value="true">Sudah</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Souvenir</label>
                <select class="form-control" id="guestSouvenir">
                    <option value="false">Belum</option>
                    <option value="true">Sudah</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="guestNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveGuest }
    ]);
}

function editGuest(id) {
    const item = weddingData.guests.find(g => g.id === id);
    if (!item) return;

    currentEditId = id;
    const seatingTables = weddingData.seating || [];
    const assignedTable = seatingTables.find(t => t.guests && t.guests.includes(item.name));
    const currentTable = item.table || (assignedTable ? assignedTable.name : '');

    openModal('Edit Tamu', `
        <div class="form-group">
            <label class="form-label required">Nama</label>
            <input type="text" class="form-control" id="guestName" value="${escapeHtml(item.name)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tag</label>
                <select class="form-control" id="guestTag">
                    ${weddingData.settings.guestTags.map(t => `<option value="${t}" ${item.tag === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Pihak</label>
                <select class="form-control" id="guestSide">
                    <option value="Wanita" ${item.side === 'Wanita' ? 'selected' : ''}>Pengantin Wanita</option>
                    <option value="Pria" ${item.side === 'Pria' ? 'selected' : ''}>Pengantin Pria</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Telepon</label>
                <input type="tel" class="form-control" id="guestPhone" value="${item.phone || ''}" placeholder="08xxxxxxxxxx">
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah Tamu</label>
                <input type="number" class="form-control" id="guestCount" value="${item.guestCount || 1}" min="1">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Alamat</label>
            <textarea class="form-control" id="guestAddress" rows="2">${escapeHtml(item.address) || ''}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">RSVP</label>
                <select class="form-control" id="guestRSVP">
                    ${RSVP_STATUSES.map(s => `<option value="${s}" ${item.rsvp === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Meja</label>
                ${seatingTables.length > 0 ? `
                <select class="form-control" id="guestTable">
                    <option value="">- Belum Ditentukan -</option>
                    ${seatingTables.map(t => `<option value="${escapeHtml(t.name)}" ${currentTable === t.name ? 'selected' : ''}>${escapeHtml(t.name)} (${t.guests?.length || 0}/${t.capacity} kursi)</option>`).join('')}
                </select>
                ` : `
                <input type="text" class="form-control" id="guestTable" value="${escapeHtml(item.table || '')}" placeholder="Contoh: Meja 1">
                `}
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Undangan Terkirim</label>
                <select class="form-control" id="guestInvitation">
                    <option value="false" ${!item.invitationSent ? 'selected' : ''}>Belum</option>
                    <option value="true" ${item.invitationSent ? 'selected' : ''}>Sudah</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Souvenir</label>
                <select class="form-control" id="guestSouvenir">
                    <option value="false" ${!item.souvenirGiven ? 'selected' : ''}>Belum</option>
                    <option value="true" ${item.souvenirGiven ? 'selected' : ''}>Sudah</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="guestNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveGuest }
    ]);
}

function saveGuest() {
    const name = document.getElementById('guestName').value.trim();
    if (!name) {
        showToast('Nama tamu harus diisi', 'error');
        return;
    }

    const oldGuest = currentEditId ? weddingData.guests.find(g => g.id === currentEditId) : null;
    const oldName = oldGuest ? oldGuest.name : null;

    const data = {
        id: currentEditId || generateId(),
        name: name,
        tag: document.getElementById('guestTag').value,
        side: document.getElementById('guestSide').value,
        phone: document.getElementById('guestPhone').value,
        guestCount: parseInt(document.getElementById('guestCount').value) || 1,
        address: document.getElementById('guestAddress').value,
        rsvp: document.getElementById('guestRSVP').value,
        table: document.getElementById('guestTable').value,
        invitationSent: document.getElementById('guestInvitation').value === 'true',
        souvenirGiven: document.getElementById('guestSouvenir').value === 'true',
        notes: document.getElementById('guestNotes').value
    };

    if (currentEditId) {
        const index = weddingData.guests.findIndex(g => g.id === currentEditId);
        if (index !== -1) {
            weddingData.guests[index] = data;
        }
    } else {
        weddingData.guests.push(data);
    }

    // Sync seating tables
    if (weddingData.seating && weddingData.seating.length > 0) {
        weddingData.seating.forEach(t => {
            if (!t.guests) t.guests = [];
            t.guests = t.guests.filter(gn => gn !== name && (!oldName || gn !== oldName));
            if (data.table && t.name === data.table) {
                t.guests.push(name);
            }
        });
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Tamu berhasil disimpan', 'success');
}

function deleteGuest(id) {
    const guest = weddingData.guests.find(g => g.id === id);
    if (!guest) return;

    openModal('Hapus Tamu', `<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus tamu <strong>${escapeHtml(guest.name)}</strong>?</p>`, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                if (weddingData.seating) {
                    weddingData.seating.forEach(t => {
                        if (t.guests) {
                            t.guests = t.guests.filter(gn => gn !== guest.name);
                        }
                    });
                }
                weddingData.guests = weddingData.guests.filter(g => g.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Tamu berhasil dihapus', 'success');
        }}
    ]);
}

function showGuestDetail(id) {
    const guest = weddingData.guests.find(g => g.id === id);
    if (!guest) return;

    const assignedTable = weddingData.seating?.find(t => t.guests && t.guests.includes(guest.name));
    const tableName = guest.table || (assignedTable ? assignedTable.name : '');
    const waUrl = formatWhatsAppUrl(guest.phone, guest.name);

    const buttons = [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editGuest(id)); } }
    ];
    if (waUrl) {
        buttons.unshift({
            label: 'Kirim WhatsApp',
            class: 'btn-success',
            onClick: () => { window.open(waUrl, '_blank'); }
        });
    }

    openModal(`Detail Tamu: ${escapeHtml(guest.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama</div><div>${escapeHtml(guest.name) || '-'}</div>
                <div class="text-muted">Tag</div>
                <div>${guest.tag ? `<span class="badge badge-primary">${escapeHtml(guest.tag)}</span>` : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Pihak</div>
                <div>${guest.side ? escapeHtml(guest.side) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Telepon</div>
                <div>${guest.phone ? `<a href="tel:${escapeHtml(guest.phone)}">${escapeHtml(guest.phone)}</a>` : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Jumlah Tamu</div>
                <div>${guest.guestCount || 1} orang</div>
                <div class="text-muted">Alamat</div>
                <div>${guest.address ? escapeHtml(guest.address).replace(/\n/g, '<br>') : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">RSVP</div>
                <div><span class="badge badge-${getRSVPBadge(guest.rsvp)}">${guest.rsvp || 'Belum Dikonfirmasi'}</span></div>
                <div class="text-muted">Meja</div>
                <div>${tableName ? `<span class="badge badge-primary">${escapeHtml(tableName)}</span>` : '<span class="text-muted">Belum diatur</span>'}</div>
                <div class="text-muted">Undangan Terkirim</div><div>${guest.invitationSent ? 'Ya' : 'Belum'}</div>
                <div class="text-muted">Souvenir</div><div>${guest.souvenirGiven ? 'Sudah diberikan' : 'Belum diberikan'}</div>
                <div class="text-muted">Catatan</div><div class="detail-value">${escapeHtml(guest.notes) || '-'}</div>
            </div>

        </div>
    `, buttons);
}

// ========================================
// WEDDING PARTY
// ========================================
function renderWeddingParty() {
    const hasData = weddingData.weddingParty.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Pesta Pernikahan</h1>
            <p class="page-subtitle">Kelola orang-orang dengan peran khusus</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddWeddingPartyModal()">+ Tambah Anggota</button>
            </div>
        </div>
        
        <div class="vendor-grid">
                ${weddingData.weddingParty.map(p => `
                    <div class="card card--elevated">
                        <div class="vendor-card-header">
                            <div>
                                <div class="vendor-name">${escapeHtml(p.name)}</div>
                                <div class="vendor-category">${p.role}</div>
                            </div>
                        </div>
                        <div class="vendor-card-body">
                            ${p.contact ? `<div class="vendor-info"><span class="vendor-info-label">Kontak</span><span>${escapeHtml(p.contact)}</span></div>` : ''}
                            ${p.attire ? `<div class="vendor-info"><span class="vendor-info-label">Pakaian</span><span>${escapeHtml(p.attire)}</span></div>` : ''}
                            ${p.tasks ? `<div class="mt-1 fs-sm"><strong>Tugas:</strong> ${escapeHtml(p.tasks)}</div>` : ''}
                        </div>
                        <div class="vendor-card-footer">
                            <div class="btn-group push-end">
                                <button class="btn btn-sm btn-ghost" onclick="showWeddingPartyDetail('${p.id}')" title="Detail">${ICONS.info}</button>
                                <button class="btn btn-sm btn-ghost" onclick="editWeddingParty('${p.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                <button class="btn btn-sm btn-ghost text-danger" onclick="deleteWeddingParty('${p.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : renderEmptyState(ICONS.weddingParty, 'Belum ada anggota', 'Tambahkan orang-orang dengan peran khusus', '+ Tambah Anggota', 'openAddWeddingPartyModal()')}
    `;
}

function openAddWeddingPartyModal() {
    currentEditId = null;
    openModal('Tambah Anggota', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama</label>
                <input type="text" class="form-control" id="wpName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Peran</label>
                <select class="form-control" id="wpRole">
                    ${weddingData.settings.weddingRoles.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Kontak</label>
            <input type="text" class="form-control" id="wpContact">
        </div>
        <div class="form-group">
            <label class="form-label">Pakaian</label>
            <input type="text" class="form-control" id="wpAttire">
        </div>
        <div class="form-group">
            <label class="form-label">Tugas</label>
            <textarea class="form-control" id="wpTasks" rows="2"></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="wpNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveWeddingParty }
    ]);
}

function editWeddingParty(id) {
    const item = weddingData.weddingParty.find(p => p.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Anggota', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama</label>
                <input type="text" class="form-control" id="wpName" value="${escapeHtml(item.name)}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Peran</label>
                <select class="form-control" id="wpRole">
                    ${weddingData.settings.weddingRoles.map(r => `<option value="${r}" ${item.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Kontak</label>
            <input type="text" class="form-control" id="wpContact" value="${escapeHtml(item.contact) || ''}">
        </div>
        <div class="form-group">
            <label class="form-label">Pakaian</label>
            <input type="text" class="form-control" id="wpAttire" value="${escapeHtml(item.attire) || ''}">
        </div>
        <div class="form-group">
            <label class="form-label">Tugas</label>
            <textarea class="form-control" id="wpTasks" rows="2">${escapeHtml(item.tasks) || ''}</textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="wpNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveWeddingParty }
    ]);
}

function saveWeddingParty() {
    const name = document.getElementById('wpName').value.trim();
    if (!name) {
        showToast('Nama harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        role: document.getElementById('wpRole').value,
        contact: document.getElementById('wpContact').value,
        attire: document.getElementById('wpAttire').value,
        tasks: document.getElementById('wpTasks').value,
        notes: document.getElementById('wpNotes').value
    };

    if (currentEditId) {
        const index = weddingData.weddingParty.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            weddingData.weddingParty[index] = data;
        }
    } else {
        weddingData.weddingParty.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Anggota berhasil disimpan', 'success');
}

function deleteWeddingParty(id) {
    openModal('Hapus Anggota', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus anggota ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.weddingParty = weddingData.weddingParty.filter(p => p.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Anggota berhasil dihapus', 'success');
        }}
    ]);
}

function showWeddingPartyDetail(memberId) {
    const member = weddingData.weddingParty.find(p => p.id === memberId);
    if (!member) return;

    openModal(`Detail: ${escapeHtml(member.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama</div><div>${escapeHtml(member.name) || '-'}</div>
                <div class="text-muted">Peran</div>
                <div>${escapeHtml(member.role)}</div>
                <div class="text-muted">Kontak</div>
                <div>${member.contact ? escapeHtml(member.contact) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Pakaian</div>
                <div>${member.attire ? escapeHtml(member.attire) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Tugas</div>
                <div>${member.tasks ? escapeHtml(member.tasks) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Catatan</div>
                <div>${member.notes ? escapeHtml(member.notes) : '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editWeddingParty(memberId)); } }
    ], 'modal-lg');
}

// ========================================
// VENUES
// ========================================
function renderVenues() {
    const hasData = weddingData.venues.length > 0;
    const selectedVenue = weddingData.venues.find(v => v.selected);

    return `
        <div class="page-header">
            <h1 class="page-title">Pilihan Tempat Acara</h1>
            <p class="page-subtitle">Bandingkan dan pilih venue terbaik</p>
        </div>
        
        ${hasData ? `
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddVenueModal()">+ Tambah Venue</button>
            </div>
        </div>
            ${selectedVenue ? `
                <div class="card card--highlight-success mb-3">
                    <div class="card-header">
                        <h3 class="card-title text-success">${ICONS.check} Venue Terpilih: ${escapeHtml(selectedVenue.name)}</h3>
                    </div>
                    <div class="card-body venue-selection-summary">
                        <div class="form-row">
                            <div><strong>Lokasi:</strong> ${escapeHtml(selectedVenue.location) || '-'}</div>
                            <div><strong>Kapasitas:</strong> ${selectedVenue.capacity || '-'} orang</div>
                            <div><strong>Harga:</strong> ${formatCurrency(selectedVenue.price)}</div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="vendor-grid">
                ${weddingData.venues.map(v => renderVenueCard(v)).join('')}
            </div>
        ` : renderEmptyState(ICONS.venues, 'Belum ada venue', 'Tambahkan venue untuk mulai membandingkan', '+ Tambah Venue', 'openAddVenueModal()')}
    `;
}

function renderVenueCard(venue) {
    const isSelected = venue.selected;

    return `
        <div class="card card--elevated ${isSelected ? 'card--selected' : ''}">
            <div class="vendor-card-header">
                <div>
                    <div class="vendor-name">${escapeHtml(venue.name)}</div>
                    <div class="vendor-category">${escapeHtml(venue.location) || '-'}</div>
                </div>
                ${isSelected ? '<span class="badge badge-success">Terpilih</span>' : ''}
            </div>
            <div class="vendor-card-body">
                <div class="vendor-info">
                    <span class="vendor-info-label">Kapasitas</span>
                    <span>${venue.capacity || '-'} orang</span>
                </div>
                <div class="vendor-info">
                    <span class="vendor-info-label">Harga</span>
                    <span>${formatCurrency(venue.price)}</span>
                </div>
                <div class="vendor-info">
                    <span class="vendor-info-label">Tipe</span>
                    <span>${venue.type || '-'}</span>
                </div>
                ${venue.facilities ? `<div class="mt-1 fs-sm"><strong>Fasilitas:</strong> ${escapeHtml(venue.facilities)}</div>` : ''}
                ${venue.pros ? `<div class="mt-1 text-success fs-sm">+ ${escapeHtml(venue.pros)}</div>` : ''}
                ${venue.cons ? `<div class="mt-1 text-danger fs-sm">- ${escapeHtml(venue.cons)}</div>` : ''}
            </div>
            <div class="vendor-card-footer">
                <button class="btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}" onclick="selectVenue('${venue.id}')">
                    ${isSelected ? 'Batal' : 'Pilih'}
                </button>
                <div class="btn-group">
                    <button class="btn btn-sm btn-ghost" onclick="showVenueDetail('${venue.id}')" title="Detail">${ICONS.info}</button>
                    <button class="btn btn-sm btn-ghost" onclick="editVenue('${venue.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                    <button class="btn btn-sm btn-ghost text-danger" onclick="deleteVenue('${venue.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                </div>
            </div>
        </div>
    `;
}

function openAddVenueModal() {
    currentEditId = null;
    openModal('Tambah Venue', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Venue</label>
                <input type="text" class="form-control" id="venueName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="venueLocation">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kapasitas</label>
                <input type="number" class="form-control" id="venueCapacity" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Harga</label>
                <input type="number" class="form-control" id="venuePrice" min="0">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tipe</label>
                <select class="form-control" id="venueType">
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Semi Outdoor">Semi Outdoor</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Kontak</label>
                <input type="text" class="form-control" id="venueContact">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Fasilitas</label>
            <textarea class="form-control" id="venueFacilities" rows="2"></textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kelebihan</label>
                <textarea class="form-control" id="venuePros" rows="2"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Kekurangan</label>
                <textarea class="form-control" id="venueCons" rows="2"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="venueNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveVenue }
    ]);
}

function editVenue(id) {
    const item = weddingData.venues.find(v => v.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Venue', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Venue</label>
                <input type="text" class="form-control" id="venueName" value="${escapeHtml(item.name)}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="venueLocation" value="${escapeHtml(item.location) || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kapasitas</label>
                <input type="number" class="form-control" id="venueCapacity" value="${item.capacity || ''}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Harga</label>
                <input type="number" class="form-control" id="venuePrice" value="${item.price || ''}" min="0">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tipe</label>
                <select class="form-control" id="venueType">
                    <option value="Indoor" ${item.type === 'Indoor' ? 'selected' : ''}>Indoor</option>
                    <option value="Outdoor" ${item.type === 'Outdoor' ? 'selected' : ''}>Outdoor</option>
                    <option value="Semi Outdoor" ${item.type === 'Semi Outdoor' ? 'selected' : ''}>Semi Outdoor</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Kontak</label>
                <input type="text" class="form-control" id="venueContact" value="${escapeHtml(item.contact) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Fasilitas</label>
            <textarea class="form-control" id="venueFacilities" rows="2">${escapeHtml(item.facilities) || ''}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kelebihan</label>
                <textarea class="form-control" id="venuePros" rows="2">${escapeHtml(item.pros) || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Kekurangan</label>
                <textarea class="form-control" id="venueCons" rows="2">${escapeHtml(item.cons) || ''}</textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="venueNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveVenue }
    ]);
}

function saveVenue() {
    const name = document.getElementById('venueName').value.trim();
    if (!name) {
        showToast('Nama venue harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        location: document.getElementById('venueLocation').value,
        capacity: parseInt(document.getElementById('venueCapacity').value) || 0,
        price: parseInt(document.getElementById('venuePrice').value) || 0,
        type: document.getElementById('venueType').value,
        contact: document.getElementById('venueContact').value,
        facilities: document.getElementById('venueFacilities').value,
        pros: document.getElementById('venuePros').value,
        cons: document.getElementById('venueCons').value,
        notes: document.getElementById('venueNotes').value,
        selected: false
    };

    if (currentEditId) {
        const index = weddingData.venues.findIndex(v => v.id === currentEditId);
        if (index !== -1) {
            data.selected = weddingData.venues[index].selected;
            weddingData.venues[index] = data;
        }
    } else {
        weddingData.venues.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Venue berhasil disimpan', 'success');
}

function selectVenue(id) {
    const venue = weddingData.venues.find(v => v.id === id);
    if (!venue) return;
    const wasSelected = Boolean(venue.selected);
    weddingData.venues.forEach(v => v.selected = false);
    if (!wasSelected) {
        venue.selected = true;
        showToast(`${venue.name} dipilih sebagai venue`, 'success');
    } else {
        showToast(`Pilihan venue ${venue.name} dibatalkan`, 'info');
    }
    saveData();

    // Re-render only the page content to avoid blink
    const pageContainer = document.querySelector('.page');
    if (pageContainer) {
        pageContainer.innerHTML = renderVenues();
    } else {
        renderPage();
    }
}

function deleteVenue(id) {
    openModal('Hapus Venue', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus venue ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.venues = weddingData.venues.filter(v => v.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Venue berhasil dihapus', 'success');
        }}
    ]);
}

function showVenueDetail(venueId) {
    const venue = weddingData.venues.find(v => v.id === venueId);
    if (!venue) return;

    openModal(`Detail Venue: ${escapeHtml(venue.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama Venue</div><div>${escapeHtml(venue.name) || '-'}</div>
                <div class="text-muted">Lokasi</div>
                <div>${escapeHtml(venue.location) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kapasitas</div>
                <div>${venue.capacity ? venue.capacity + ' orang' : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Harga</div>
                <div>${formatCurrency(venue.price)}</div>
                <div class="text-muted">Tipe</div>
                <div>${venue.type || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kontak</div>
                <div>${venue.contact ? escapeHtml(venue.contact) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Fasilitas</div>
                <div>${venue.facilities ? escapeHtml(venue.facilities) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kelebihan</div>
                <div>${venue.pros ? escapeHtml(venue.pros) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Kekurangan</div>
                <div>${venue.cons ? escapeHtml(venue.cons) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Catatan</div>
                <div>${venue.notes ? escapeHtml(venue.notes) : '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editVenue(venueId)); } }
    ], 'modal-lg');
}

// ========================================
// FOOD & DRINKS
// ========================================
function renderFoodDrinks() {
    const totalEstimate = weddingData.foodDrinks.reduce((sum, f) => sum + ((f.price || 0) * (f.quantity || 1)), 0);
    const selectedItems = weddingData.foodDrinks.filter(f => f.selected);
    const hasData = weddingData.foodDrinks.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Makanan & Minuman</h1>
            <p class="page-subtitle">Kelola menu dan catering</p>
        </div>
        
        ${hasData ? `
        <div class="kpi-grid mb-3">
            <div class="kpi-card">
                <div class="kpi-value">${weddingData.foodDrinks.length}</div>
                <div class="kpi-label">Total Item</div>
            </div>
            <div class="kpi-card success">
                <div class="kpi-value">${selectedItems.length}</div>
                <div class="kpi-label">Item Terpilih</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value">${formatCurrency(totalEstimate)}</div>
                <div class="kpi-label">Total Estimasi</div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddFoodModal()">+ Tambah Menu</button>
            </div>
        </div>
        
        ${FOOD_CATEGORIES.map(cat => {
            const items = weddingData.foodDrinks.filter(f => f.category === cat);
            if (items.length === 0) return '';
            return `
                <div class="mb-3">
                    <h3 class="mb-2 text-muted fs-lg">${cat}</h3>
                    <div class="vendor-grid">
                        ${items.map(f => renderFoodCard(f)).join('')}
                    </div>
                </div>
            `;
        }).join('')}
        ` : renderEmptyState(ICONS.foodDrinks, 'Belum ada menu', 'Tambahkan menu untuk pernikahan Anda', '+ Tambah Menu', 'openAddFoodModal()')}
    `;
}

function renderFoodCard(food) {
    const isSelected = food.selected;

    return `
        <div class="card card--elevated ${isSelected ? 'card--selected' : ''}" data-food-id="${food.id}">
            <div class="vendor-card-header">
                <div>
                    <div class="vendor-name">${escapeHtml(food.name)}</div>
                    <div class="vendor-category">${escapeHtml(food.vendor) || 'Tanpa Vendor'}</div>
                </div>
                ${isSelected ? '<span class="badge badge-success">Terpilih</span>' : ''}
            </div>
            <div class="vendor-card-body">
                <div class="vendor-info">
                    <span class="vendor-info-label">Harga per porsi</span>
                    <span>${formatCurrency(food.price)}</span>
                </div>
                <div class="vendor-info">
                    <span class="vendor-info-label">Jumlah porsi</span>
                    <span>${food.quantity || 1}</span>
                </div>
                <div class="vendor-info mt-1 vendor-info-divider">
                    <span class="vendor-info-label fw-600">Total</span>
                    <span class="price-total">${formatCurrency((food.price || 0) * (food.quantity || 1))}</span>
                </div>
            </div>
            <div class="vendor-card-footer">
                <button class="btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}" onclick="toggleFoodSelect('${food.id}')">
                    ${isSelected ? 'Batal' : 'Pilih'}
                </button>
                <div class="btn-group">
                    <button class="btn btn-sm btn-ghost" onclick="showFoodDetail('${food.id}')" title="Detail">${ICONS.info}</button>
                    <button class="btn btn-sm btn-ghost" onclick="editFood('${food.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                    <button class="btn btn-sm btn-ghost text-danger" onclick="deleteFood('${food.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                </div>
            </div>
        </div>
    `;
}

function toggleFoodSelect(id) {
    const item = weddingData.foodDrinks.find(f => f.id === id);
    if (item) {
        item.selected = !item.selected;
        saveData();

        const card = document.querySelector(`.card[data-food-id="${id}"]`);
        if (card) {
            if (item.selected) card.classList.add('card--selected');
            else card.classList.remove('card--selected');

            const btn = card.querySelector(`button[onclick="toggleFoodSelect('${id}')"]`);
            if (btn) {
                btn.className = `btn btn-sm ${item.selected ? 'btn-secondary' : 'btn-primary'}`;
                btn.innerHTML = item.selected ?'Batal' : 'Pilih';
            }

            const header = card.querySelector('.vendor-card-header');
            if (header) {
                let badge = header.querySelector('.badge-success');
                if (item.selected) {
                    if (!badge) {
                        badge = document.createElement('span');
                        badge.className = 'badge badge-success';
                        badge.textContent = 'Terpilih';
                        header.appendChild(badge);
                    }
                } else if (badge) {
                    badge.remove();
                }
            }
        }

        // Update KPIs
        const selectedItems = weddingData.foodDrinks.filter(f => f.selected).length;
        const kpiValue = document.querySelectorAll('.kpi-card.success .kpi-value')[0];
        if (kpiValue) kpiValue.textContent = selectedItems;

        if (item.selected) {
            showToast(`${item.name} dipilih ke menu`, 'success');
        } else {
            showToast(`Pilihan menu ${item.name} dibatalkan`, 'info');
        }
    }
}

function openAddFoodModal() {
    currentEditId = null;
    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih' && v.category === 'Catering');

    openModal('Tambah Menu', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Menu</label>
                <input type="text" class="form-control" id="foodName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="foodCategory">
                    ${FOOD_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <select class="form-control" id="foodVendor">
                <option value="">- Pilih Vendor -</option>
                ${selectedVendors.map(v => `<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)}</option>`).join('')}
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Harga per Porsi</label>
                <input type="number" class="form-control" id="foodPrice" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah Porsi</label>
                <input type="number" class="form-control" id="foodQuantity" value="1" min="1">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="foodNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveFood }
    ]);
}

function editFood(id) {
    const item = weddingData.foodDrinks.find(f => f.id === id);
    if (!item) return;

    currentEditId = id;
    const selectedVendors = weddingData.vendors.filter(v => v.status === 'Terpilih' && v.category === 'Catering');

    openModal('Edit Menu', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Nama Menu</label>
                <input type="text" class="form-control" id="foodName" value="${escapeHtml(item.name)}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="foodCategory">
                    ${FOOD_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Vendor</label>
            <select class="form-control" id="foodVendor">
                <option value="">- Pilih Vendor -</option>
                ${selectedVendors.map(v => `<option value="${escapeHtml(v.name)}" ${item.vendor === v.name ? 'selected' : ''}>${escapeHtml(v.name)}</option>`).join('')}
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Harga per Porsi</label>
                <input type="number" class="form-control" id="foodPrice" value="${item.price || ''}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">Jumlah Porsi</label>
                <input type="number" class="form-control" id="foodQuantity" value="${item.quantity || 1}" min="1">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="foodNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveFood }
    ]);
}

function saveFood() {
    const name = document.getElementById('foodName').value.trim();
    if (!name) {
        showToast('Nama menu harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        category: document.getElementById('foodCategory').value,
        vendor: document.getElementById('foodVendor').value,
        price: parseInt(document.getElementById('foodPrice').value) || 0,
        quantity: parseInt(document.getElementById('foodQuantity').value) || 1,
        notes: document.getElementById('foodNotes').value,
        selected: true
    };

    if (currentEditId) {
        const index = weddingData.foodDrinks.findIndex(f => f.id === currentEditId);
        if (index !== -1) {
            weddingData.foodDrinks[index] = data;
        }
    } else {
        weddingData.foodDrinks.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Menu berhasil disimpan', 'success');
}

function deleteFood(id) {
    openModal('Hapus Menu', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus menu ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.foodDrinks = weddingData.foodDrinks.filter(f => f.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Menu berhasil dihapus', 'success');
        }}
    ]);
}

function showFoodDetail(foodId) {
    const f = weddingData.foodDrinks.find(x => x.id === foodId);
    if (!f) return;

    openModal(`Detail Menu: ${escapeHtml(f.name)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Nama Menu</div><div>${escapeHtml(f.name) || '-'}</div>
                <div class="text-muted">Kategori</div><div>${escapeHtml(f.category)}</div>
                <div class="text-muted">Vendor</div><div>${escapeHtml(f.vendor) || '-'}</div>
                <div class="text-muted">Harga per Porsi</div><div>${formatCurrency(f.price)}</div>
                <div class="text-muted">Jumlah Porsi</div><div>${f.quantity || 1}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(f.notes) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Total</div><div>${formatCurrency((f.price || 0) * (f.quantity || 1))}</div>
                <div class="text-muted">Status</div><div>${f.selected ? '<span class="badge badge-success">Terpilih</span>' : '<span class="badge badge-muted">Tidak Terpilih</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editFood(foodId)); } }
    ], 'modal-lg');
}

// ========================================
// SEATING
// ========================================
function renderSeating() {
    const guestSummary = calculateGuestSummary();
    const totalSeats = weddingData.seating.reduce((sum, t) => sum + (t.capacity || 0), 0);
    const usedSeats = weddingData.seating.reduce((sum, t) => sum + (t.guests?.length || 0), 0);
    const unassignedCount = Math.max(0, guestSummary.totalGuests - usedSeats);
    const hasData = weddingData.seating.length > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Rencana Duduk Tamu</h1>
            <p class="page-subtitle">Atur penempatan meja dan kursi tamu undangan</p>
        </div>
        
        ${hasData ? `
        <div class="kpi-grid mb-3">
            <div class="kpi-card">
                <div class="kpi-value">${guestSummary.totalGuests}</div>
                <div class="kpi-label">Total Tamu</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value">${totalSeats}</div>
                <div class="kpi-label">Kapasitas Kursi</div>
            </div>
            <div class="kpi-card ${usedSeats > totalSeats ? 'danger' : 'success'}">
                <div class="kpi-value">${usedSeats}</div>
                <div class="kpi-label">Kursi Terisi</div>
            </div>
            <div class="kpi-card ${unassignedCount > 0 ? 'warning' : 'success'}">
                <div class="kpi-value">${unassignedCount}</div>
                <div class="kpi-label">Belum Dapat Meja</div>
            </div>
        </div>
        
        ${unassignedCount > 0 ? `
            <div class="card card--highlight-warn mb-3">
                <div class="card-body flex-between">
                    <div>
                        <strong>${ICONS.warningSmall} ${unassignedCount} tamu belum dialokasikan ke meja.</strong>
                        <div class="text-muted fs-sm mt-1">Gunakan tombol "+ Assign Tamu" di tiap meja untuk menempatkan mereka.</div>
                    </div>
                    <button class="btn btn-sm btn-secondary" onclick="navigateTo('guests')">Daftar Tamu</button>
                </div>
            </div>
        ` : ''}
        
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddTableModal()">+ Tambah Meja</button>
            </div>
        </div>
        
        <div class="seating-grid">
                ${weddingData.seating.map(table => {
                    const guestCount = table.guests?.length || 0;
                    const isWarning = guestCount > table.capacity;
                    const isFull = guestCount === table.capacity;
                    
                    return `
                        <div class="card card--elevated ${isWarning ? 'warning' : ''} ${isFull ? 'full' : ''}">
                            <div class="table-card-header">
                                <span class="table-card-name">${escapeHtml(table.name)}</span>
                                <span class="table-card-capacity">${guestCount} / ${table.capacity} kursi</span>
                            </div>
                            <div class="table-card-body">
                                ${table.guests && table.guests.length > 0 ? table.guests.map(g => `
                                    <div class="table-guest">
                                        <span>${escapeHtml(g)}</span>
                                        <button class="btn btn-sm btn-ghost text-danger" onclick="removeGuestFromTable('${table.id}', '${escapeHtml(g)}')">${ICONS.close}</button>
                                    </div>
                                `).join('') : '<div class="empty-block-msg">Belum ada tamu</div>'}
                            </div>
                            <div class="table-card-footer">
                                <button class="btn btn-sm btn-secondary" onclick="openAssignGuestModal('${table.id}')">+ Assign Tamu</button>
                                <button class="btn btn-sm btn-ghost" onclick="showTableDetail('${table.id}')" title="Detail" aria-label="Lihat detail meja">${ICONS.info}</button>
                                <button class="btn btn-sm btn-ghost text-danger" onclick="deleteTable('${table.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        ` : renderEmptyState(ICONS.seating, 'Belum ada meja', 'Tambahkan meja untuk mulai mengatur tempat duduk', '+ Tambah Meja', 'openAddTableModal()')}
    `;
}

function openAddTableModal() {
    openModal('Tambah Meja', `
        <div class="form-group">
            <label class="form-label required">Nama/Nomor Meja</label>
            <input type="text" class="form-control" id="tableName" placeholder="Contoh: Meja 1" required>
        </div>
        <div class="form-group">
            <label class="form-label">Kapasitas</label>
            <input type="number" class="form-control" id="tableCapacity" value="8" min="1">
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveTable }
    ]);
}

function saveTable() {
    const name = document.getElementById('tableName').value.trim();
    if (!name) {
        showToast('Nama meja harus diisi', 'error');
        return;
    }

    weddingData.seating.push({
        id: generateId(),
        name: name,
        capacity: parseInt(document.getElementById('tableCapacity').value) || 8,
        guests: []
    });

    saveData();
    closeModal();
    renderPage();
    showToast('Meja berhasil ditambahkan', 'success');
}

function deleteTable(id) {
    const table = weddingData.seating.find(t => t.id === id);
    if (!table) return;

    openModal('Hapus Meja', `<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus meja <strong>${escapeHtml(table.name)}</strong>?</p>`, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                if (weddingData.guests) {
                    weddingData.guests.forEach(g => {
                        if (g.table === table.name || (table.guests && table.guests.includes(g.name))) {
                            g.table = '';
                        }
                    });
                }
                weddingData.seating = weddingData.seating.filter(t => t.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Meja berhasil dihapus', 'success');
        }}
    ]);
}

function openAssignGuestModal(tableId) {
    const table = weddingData.seating.find(t => t.id === tableId);
    if (!table) return;

    const assignedGuests = weddingData.seating.flatMap(t => t.guests || []);
    const availableGuests = weddingData.guests.filter(g => !assignedGuests.includes(g.name));

    openModal('Assign Tamu', `
        <p><strong>Meja:</strong> ${escapeHtml(table.name)}</p>
        <p><strong>Sisa Kursi:</strong> ${table.capacity - (table.guests?.length || 0)}</p>
        <div class="form-group">
            <label class="form-label">Pilih Tamu</label>
            <select class="form-control" id="guestToAssign">
                <option value="">- Pilih Tamu -</option>
                ${availableGuests.map(g => `<option value="${escapeHtml(g.name)}">${escapeHtml(g.name)} (${g.guestCount || 1} orang)</option>`).join('')}
            </select>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Assign', class: 'btn-primary', onClick: () => assignGuestToTable(tableId) }
    ]);
}

function assignGuestToTable(tableId) {
    const guestName = document.getElementById('guestToAssign').value;
    if (!guestName) {
        showToast('Pilih tamu terlebih dahulu', 'error');
        return;
    }

    const table = weddingData.seating.find(t => t.id === tableId);
    if (!table) return;

    if (!table.guests) table.guests = [];

    if (table.guests.length >= table.capacity) {
        showToast('Meja sudah penuh', 'error');
        return;
    }

    table.guests.push(guestName);

    const guest = weddingData.guests.find(g => g.name === guestName);
    if (guest) {
        guest.table = table.name;
    }

    saveData();
    closeModal();
    renderPage();
    showToast(`${guestName} ditempatkan di ${table.name}`, 'success');
}

function removeGuestFromTable(tableId, guestName) {
    const table = weddingData.seating.find(t => t.id === tableId);
    if (!table || !table.guests) return;

    table.guests = table.guests.filter(g => g !== guestName);

    const guest = weddingData.guests.find(g => g.name === guestName);
    if (guest) {
        guest.table = '';
    }

    saveData();
    renderPage();
    showToast(`${guestName} dikeluarkan dari ${table.name}`, 'info');
}

// ========================================
// PHOTOS
// ========================================
function renderPhotos() {
    const completedCount = weddingData.photos.filter(p => p.completed).length;
    const totalCount = weddingData.photos.length;
    const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const hasData = totalCount > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Daftar Foto</h1>
            <p class="page-subtitle">Checklist moment yang harus diabadikan</p>
        </div>
        
        ${hasData ? `
        <div class="card mb-3 p-3">
            <div class="flex-between mb-2">
                <span class="fs-sm fw-500">Progress Pengambilan Gambar</span>
                <span class="fs-sm fw-600 text-primary">${completedCount} dari ${totalCount} selesai</span>
            </div>
            <div class="progress-bar mt-1">
                <div class="progress-fill" style="--progress-value: ${percentage}%"></div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddPhotoModal()">+ Tambah Shot</button>
            </div>
        </div>
        
        ${PHOTO_CATEGORIES.map(cat => {
            const items = weddingData.photos.filter(p => p.category === cat);
            if (items.length === 0) return '';
            return `
                <div class="mb-3">
                    <h3 class="mb-2 text-muted fs-lg">${cat}</h3>
                    <div class="vendor-grid">
                        ${items.map(p => `
                            <div class="card card--elevated ${p.completed ? 'card--selected' : ''}" data-photo-id="${p.id}">
                                <div class="vendor-card-header">
                                    <div>
                                        <div class="vendor-name">${escapeHtml(p.shot)}</div>
                                        <div class="vendor-category">Prioritas: <span class="badge badge-${getPriorityBadge(p.priority)}">${p.priority || 'Sedang'}</span></div>
                                    </div>
                                    <span class="photo-status-badge">
                                        ${p.completed ? '<span class="badge badge-success">Selesai</span>' : ''}
                                    </span>
                                </div>
                                <div class="vendor-card-body">
                                    ${p.time ? `
                                    <div class="vendor-info">
                                        <span class="vendor-info-label">Waktu</span>
                                        <span>${p.time}</span>
                                    </div>` : ''}
                                    
                                    ${p.location ? `
                                    <div class="vendor-info">
                                        <span class="vendor-info-label">Lokasi</span>
                                        <span>${escapeHtml(p.location)}</span>
                                    </div>` : ''}
                                    
                                    ${p.notes ? `
                                    <div class="mt-1 text-muted fs-sm"><strong>Catatan:</strong> ${escapeHtml(p.notes)}</div>` : ''}
                                </div>
                                <div class="vendor-card-footer">
                                    <button class="btn btn-sm ${p.completed ? 'btn-secondary' : 'btn-primary'}" onclick="togglePhotoComplete('${p.id}')">
                                        ${p.completed ? 'Batal' : 'Tandai'}
                                    </button>
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-ghost" onclick="showPhotoDetail('${p.id}')" title="Detail">${ICONS.info}</button>
                                        <button class="btn btn-sm btn-ghost" onclick="editPhoto('${p.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                        <button class="btn btn-sm btn-ghost text-danger" onclick="deletePhoto('${p.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('')}
        ` : renderEmptyState(ICONS.photos, 'Belum ada daftar foto', 'Tambahkan daftar momen untuk diabadikan', '+ Tambah Shot', 'openAddPhotoModal()')}
    `;
}

function togglePhotoComplete(id) {
    const item = weddingData.photos.find(p => p.id === id);
    if (item) {
        item.completed = !item.completed;
        saveData();

        const card = document.querySelector(`.card[data-photo-id="${id}"]`);
        if (card) {
            if (item.completed) card.classList.add('card--selected');
            else card.classList.remove('card--selected');

            const badgeContainer = card.querySelector('.photo-status-badge');
            if (badgeContainer) {
                badgeContainer.innerHTML = item.completed ?'<span class="badge badge-success">Selesai</span>' : '';
            }

            const btn = card.querySelector(`button[onclick="togglePhotoComplete('${id}')"]`);
            if (btn) {
                btn.className = `btn btn-sm ${item.completed ? 'btn-secondary' : 'btn-primary'}`;
                btn.innerHTML = item.completed ?'Batal' : 'Tandai';
            }
        }

        // Update Progress Bar
        const completedCount = weddingData.photos.filter(p => p.completed).length;
        const totalCount = weddingData.photos.length;
        const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        const fill = document.querySelector('.page-header + .card .progress-fill');
        if (fill) fill.style.width = percentage + '%';
        const text = document.querySelector('.page-header + .card .flex-between span:last-child');
        if (text) text.textContent = `${completedCount} dari ${totalCount} selesai`;

        if (item.completed) {
            showToast(`Shot "${item.shot}" ditandai selesai`, 'success');
        } else {
            showToast(`Shot "${item.shot}" dibatalkan`, 'info');
        }
    }
}

function openAddPhotoModal() {
    currentEditId = null;
    openModal('Tambah Shot', `
        <div class="form-group">
            <label class="form-label required">Shot</label>
            <input type="text" class="form-control" id="photoShot" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="photoCategory">
                    ${PHOTO_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Prioritas</label>
                <select class="form-control" id="photoPriority">
                    ${PRIORITIES.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="photoTime">
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="photoLocation">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="photoNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: savePhoto }
    ]);
}

function editPhoto(id) {
    const item = weddingData.photos.find(p => p.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Shot', `
        <div class="form-group">
            <label class="form-label required">Shot</label>
            <input type="text" class="form-control" id="photoShot" value="${escapeHtml(item.shot)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="photoCategory">
                    ${PHOTO_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Prioritas</label>
                <select class="form-control" id="photoPriority">
                    ${PRIORITIES.map(p => `<option value="${p}" ${item.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="photoTime" value="${item.time || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="photoLocation" value="${escapeHtml(item.location) || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="photoNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: savePhoto }
    ]);
}

function savePhoto() {
    const shot = document.getElementById('photoShot').value.trim();
    if (!shot) {
        showToast('Shot harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        shot: shot,
        category: document.getElementById('photoCategory').value,
        priority: document.getElementById('photoPriority').value,
        time: document.getElementById('photoTime').value,
        location: document.getElementById('photoLocation').value,
        notes: document.getElementById('photoNotes').value,
        completed: false
    };

    if (currentEditId) {
        const index = weddingData.photos.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            data.completed = weddingData.photos[index].completed;
            weddingData.photos[index] = data;
        }
    } else {
        weddingData.photos.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Shot berhasil disimpan', 'success');
}

function deletePhoto(id) {
    openModal('Hapus Shot', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus shot ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.photos = weddingData.photos.filter(p => p.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Shot berhasil dihapus', 'success');
        }}
    ]);
}

function showPhotoDetail(photoId) {
    const p = weddingData.photos.find(x => x.id === photoId);
    if (!p) return;

    openModal(`Detail Shot: ${escapeHtml(p.shot)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Shot</div><div>${escapeHtml(p.shot) || '-'}</div>
                <div class="text-muted">Kategori</div><div>${escapeHtml(p.category)}</div>
                <div class="text-muted">Prioritas</div><div><span class="badge badge-${getPriorityBadge(p.priority)}">${p.priority || 'Sedang'}</span></div>
                <div class="text-muted">Waktu</div><div>${p.time || '-'}</div>
                <div class="text-muted">Lokasi</div><div>${escapeHtml(p.location) || '-'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(p.notes) || '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Status</div><div>${p.completed ? '<span class="badge badge-success">Selesai</span>' : '<span class="badge badge-warning">Belum Selesai</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editPhoto(photoId)); } }
    ], 'modal-lg');
}

// ========================================
// GIFTS
// ========================================
function renderGifts() {
    const totalGifts = weddingData.gifts.length;
    const thankYouSent = weddingData.gifts.filter(g => g.thankYouSent).length;
    const pendingThankYou = totalGifts - thankYouSent;
    const hasData = totalGifts > 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Hadiah & Ucapan Terima Kasih</h1>
            <p class="page-subtitle">Gift tracker</p>
        </div>
        
        ${hasData ? `
        <div class="kpi-grid mb-3">
            <div class="kpi-card">
                <div class="kpi-value">${totalGifts}</div>
                <div class="kpi-label">Hadiah Diterima</div>
            </div>
            <div class="kpi-card success">
                <div class="kpi-value">${thankYouSent}</div>
                <div class="kpi-label">Ucapan Terkirim</div>
            </div>
            <div class="kpi-card warning">
                <div class="kpi-value">${pendingThankYou}</div>
                <div class="kpi-label">Belum Terkirim</div>
            </div>
        </div>
        
        <div class="toolbar">
            <div class="toolbar-actions">
                <button class="btn btn-primary" onclick="openAddGiftModal()">+ Tambah Hadiah</button>
            </div>
        </div>
        
        <div class="card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pemberi</th>
                            <th>Jenis Hadiah</th>
                            <th>Nilai/Keterangan</th>
                            <th>Tanggal Diterima</th>
                            <th class="text-center">Ucapan Terima Kasih</th>
                            <th class="actions-cell">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${weddingData.gifts.map(g => `
                            <tr class="${g.thankYouSent ? 'completed' : ''}">
                                <td>${escapeHtml(g.giver)}</td>
                                <td>${escapeHtml(g.type)}</td>
                                <td>${escapeHtml(g.value) || '-'}</td>
                                <td>${g.dateReceived ? formatDateShort(g.dateReceived) : '-'}</td>
                                <td class="text-center">
                                    ${g.thankYouSent 
                                        ? `<span class="badge badge-success">${ICONS.check} Terkirim ${g.thankYouDate ? formatDateShort(g.thankYouDate) : ''}</span>` 
                                        : '<span class="badge badge-warning">Belum</span>'}
                                </td>
                                <td class="actions-cell">
                                    <button class="btn btn-sm btn-ghost" onclick="showGiftDetail('${g.id}')" title="Detail" aria-label="Lihat detail hadiah">${ICONS.info}</button>
                                    <button class="btn btn-sm btn-ghost" onclick="editGift('${g.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                    <button class="btn btn-sm btn-ghost text-danger" onclick="deleteGift('${g.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        ` : renderEmptyState(ICONS.gifts, 'Belum ada hadiah', 'Catat hadiah yang diterima', '+ Tambah Hadiah', 'openAddGiftModal()')}
    `;
}

function openAddGiftModal() {
    currentEditId = null;
    openModal('Tambah Hadiah', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Pemberi</label>
                <input type="text" class="form-control" id="giftGiver" required>
            </div>
            <div class="form-group">
                <label class="form-label required">Jenis Hadiah</label>
                <input type="text" class="form-control" id="giftType" placeholder="Contoh: Amplop, Barang, Transfer" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Nilai/Keterangan</label>
                <input type="text" class="form-control" id="giftValue">
            </div>
            <div class="form-group">
                <label class="form-label">Tanggal Diterima</label>
                <input type="date" class="form-control" id="giftDateReceived">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Ucapan Terima Kasih</label>
                <select class="form-control" id="giftThankYou">
                    <option value="false">Belum Dikirim</option>
                    <option value="true">Sudah Dikirim</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Tanggal Kirim</label>
                <input type="date" class="form-control" id="giftThankYouDate">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="giftNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveGift }
    ]);
}

function editGift(id) {
    const item = weddingData.gifts.find(g => g.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Hadiah', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Pemberi</label>
                <input type="text" class="form-control" id="giftGiver" value="${escapeHtml(item.giver)}" required>
            </div>
            <div class="form-group">
                <label class="form-label required">Jenis Hadiah</label>
                <input type="text" class="form-control" id="giftType" value="${escapeHtml(item.type)}" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Nilai/Keterangan</label>
                <input type="text" class="form-control" id="giftValue" value="${escapeHtml(item.value) || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Tanggal Diterima</label>
                <input type="date" class="form-control" id="giftDateReceived" value="${item.dateReceived || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Ucapan Terima Kasih</label>
                <select class="form-control" id="giftThankYou">
                    <option value="false" ${!item.thankYouSent ? 'selected' : ''}>Belum Dikirim</option>
                    <option value="true" ${item.thankYouSent ? 'selected' : ''}>Sudah Dikirim</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Tanggal Kirim</label>
                <input type="date" class="form-control" id="giftThankYouDate" value="${item.thankYouDate || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="giftNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveGift }
    ]);
}

function saveGift() {
    const giver = document.getElementById('giftGiver').value.trim();
    const type = document.getElementById('giftType').value.trim();
    if (!giver || !type) {
        showToast('Pemberi dan jenis hadiah harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        giver: giver,
        type: type,
        value: document.getElementById('giftValue').value,
        dateReceived: document.getElementById('giftDateReceived').value,
        thankYouSent: document.getElementById('giftThankYou').value === 'true',
        thankYouDate: document.getElementById('giftThankYouDate').value,
        notes: document.getElementById('giftNotes').value
    };

    if (currentEditId) {
        const index = weddingData.gifts.findIndex(g => g.id === currentEditId);
        if (index !== -1) {
            weddingData.gifts[index] = data;
        }
    } else {
        weddingData.gifts.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Hadiah berhasil disimpan', 'success');
}

function deleteGift(id) {
    openModal('Hapus Hadiah', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus hadiah ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.gifts = weddingData.gifts.filter(g => g.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Hadiah berhasil dihapus', 'success');
        }}
    ]);
}

function showGiftDetail(giftId) {
    const g = weddingData.gifts.find(x => x.id === giftId);
    if (!g) return;

    openModal(`Detail Hadiah: ${escapeHtml(g.giver)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Pemberi</div><div>${escapeHtml(g.giver)}</div>
                <div class="text-muted">Jenis Hadiah</div><div>${escapeHtml(g.type)}</div>
                <div class="text-muted">Nilai/Keterangan</div><div>${escapeHtml(g.value) || '-'}</div>
                <div class="text-muted">Tanggal Diterima</div><div>${g.dateReceived ? formatDateShort(g.dateReceived) : '-'}</div>
                <div class="text-muted">Ucapan Terima Kasih</div><div>${g.thankYouSent ? `<span class="badge badge-success">${ICONS.check} Terkirim</span>` : '<span class="badge badge-warning">Belum</span>'}</div>
                <div class="text-muted">Tanggal Kirim</div><div>${g.thankYouDate ? formatDateShort(g.thankYouDate) : '<span class="text-muted">-</span>'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(g.notes) || '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editGift(giftId)); } }
    ], 'modal-lg');
}

// ========================================
// HONEYMOON
// ========================================
function renderHoneymoon() {
    const h = weddingData.honeymoon;
    const dest = h.destination || {};
    const totalExpenses = (h.expenses || []).reduce((sum, e) => sum + (e.amount || 0), 0);
    const budget = dest.budget || 0;
    const remaining = budget - totalExpenses;
    const isOverBudget = remaining < 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Bulan Madu</h1>
            <p class="page-subtitle">Honeymoon planner & itinerary</p>
        </div>
        
<div class="card mb-3">
            <div class="card-header card-header--with-actions">
                <h3 class="card-title">Destinasi & Budget</h3>
                <button class="btn btn-sm btn-ghost" onclick="openEditDestinationModal()">${ICONS.edit} Edit</button>
            </div>
            <div class="card-body">
                <div class="kpi-grid">
                    <div class="kpi-card kpi-card--start">
                        <div class="kpi-card-header">
                            <div class="kpi-label">Destinasi</div>
                            <div class="kpi-badge kpi-badge--primary">${ICONS.venues}</div>
                        </div>
                        <div class="kpi-value">${escapeHtml(dest.city || '-')} ${dest.country ? `, ${escapeHtml(dest.country)}` : ''}</div>
                        <div class="text-muted fs-sm mt-1">
                            ${dest.departureDate ? formatDateShort(dest.departureDate) : '-'} s/d ${dest.returnDate ? formatDateShort(dest.returnDate) : '-'}
                        </div>
                    </div>
                    <div class="kpi-card kpi-card--start">
                        <div class="kpi-card-header">
                            <div class="kpi-label">Budget Honeymoon</div>
                            <div class="kpi-badge kpi-badge--primary">${ICONS.budget}</div>
                        </div>
                        <div class="kpi-value">${formatCurrency(budget)}</div>
                    </div>
                    <div class="kpi-card kpi-card--start ${isOverBudget ? 'danger' : 'warning'}">
                        <div class="kpi-card-header">
                            <div class="kpi-label">Total Pengeluaran</div>
                            <div class="kpi-badge ${isOverBudget ? 'kpi-badge--danger' : 'kpi-badge--warn'}">${ICONS.card}</div>
                        </div>
                        <div class="kpi-value">${formatCurrency(totalExpenses)}</div>
                    </div>
                    <div class="kpi-card kpi-card--start ${isOverBudget ? 'danger' : 'success'}">
                        <div class="kpi-card-header">
                            <div class="kpi-label">Sisa Budget</div>
                            <div class="kpi-badge ${isOverBudget ? 'kpi-badge--danger' : 'kpi-badge--success'}">${ICONS.target}</div>
                        </div>
                        <div class="kpi-value">${formatCurrency(remaining)}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mb-3">
            ${renderHoneymoonExpenses()}
        </div>
        <div>
            ${renderHoneymoonItinerary()}
        </div>
    `;
}

function openEditDestinationModal() {
    const h = weddingData.honeymoon.destination || {};
    openModal('Edit Destinasi & Budget', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Negara</label>
                <input type="text" class="form-control" id="hCountry" value="${escapeHtml(h.country || '')}">
            </div>
            <div class="form-group">
                <label class="form-label">Kota</label>
                <input type="text" class="form-control" id="hCity" value="${escapeHtml(h.city || '')}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal Berangkat</label>
                <input type="date" class="form-control" id="hDeparture" value="${h.departureDate || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Tanggal Pulang</label>
                <input type="date" class="form-control" id="hReturn" value="${h.returnDate || ''}">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Budget Honeymoon</label>
            <input type="number" class="form-control" id="hBudget" value="${h.budget || 0}" min="0">
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: () => {
                weddingData.honeymoon.destination = {
                    country: document.getElementById('hCountry').value,
                    city: document.getElementById('hCity').value,
                    departureDate: document.getElementById('hDeparture').value,
                    returnDate: document.getElementById('hReturn').value,
                    budget: parseInt(document.getElementById('hBudget').value) || 0
                };
                saveData();
                closeModal();
                renderPage();
                showToast('Destinasi berhasil disimpan', 'success');
        }}
    ]);
}

function renderHoneymoonItinerary() {
    return `
        <div class="card">
            <div class="card-header card-header--with-actions">
                <h3 class="card-title">Itinerary</h3>
                <button class="btn btn-primary" onclick="openAddItineraryModal()">+ Tambah Aktivitas</button>
            </div>
            <div class="card-body">
${weddingData.honeymoon.itinerary.length > 0 ? `
                    <div class="timeline">
                        ${weddingData.honeymoon.itinerary.sort((a, b) => new Date(a.date) - new Date(b.date)).map(i => `
                            <div class="timeline-item">
                                <div class="timeline-item-content">
                                    <div class="flex-between mb-1">
                                        <div>
                                            <strong>${escapeHtml(i.activity)}</strong>
                                            <div class="text-muted fs-sm">${i.date ? formatDateShort(i.date) : ''} ${i.time || ''}</div>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-ghost" onclick="showItineraryDetail('${i.id}')" title="Detail" aria-label="Lihat detail aktivitas">${ICONS.info}</button>
                                            <button class="btn btn-sm btn-ghost" onclick="editItinerary('${i.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteItinerary('${i.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                        </div>
                                    </div>
                                    ${i.location ? `<div class="text-muted fs-sm">${ICONS.venues} ${escapeHtml(i.location)}</div>` : ''}
                                    ${i.cost ? `<div class="fs-sm"> ${formatCurrency(i.cost)}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="empty-block-msg">Belum ada itinerary</div>'}
            </div>
        </div>
    `;
}

function renderHoneymoonExpenses() {
    return `
        <div class="card">
            <div class="card-header card-header--with-actions">
                <h3 class="card-title">Pengeluaran</h3>
                <button class="btn btn-primary" onclick="openAddExpenseModal()">+ Tambah Pengeluaran</button>
            </div>
            <div class="card-body list-panel">
                ${weddingData.honeymoon.expenses.length > 0 ? `
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Kategori</th>
                                    <th>Deskripsi</th>
                                    <th class="text-right">Jumlah</th>
                                    <th class="actions-cell">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
${weddingData.honeymoon.expenses.map(e => `
                                    <tr>
                                        <td>${e.date ? formatDateShort(e.date) : '-'}</td>
                                        <td>${escapeHtml(e.category)}</td>
                                        <td>${escapeHtml(e.description)}</td>
                                        <td class="text-right">${formatCurrency(e.amount)}</td>
                                        <td class="actions-cell">
                                            <button class="btn btn-sm btn-ghost" onclick="showExpenseDetail('${e.id}')" title="Detail" aria-label="Lihat detail pengeluaran">${ICONS.info}</button>
                                            <button class="btn btn-sm btn-ghost" onclick="editExpense('${e.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteExpense('${e.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : '<div class="empty-block-msg">Belum ada pengeluaran honeymoon</div>'}
            </div>
        </div>
    `;
}

function openAddItineraryModal() {
    openModal('Tambah Aktivitas', `
        <div class="form-group">
            <label class="form-label required">Aktivitas</label>
            <input type="text" class="form-control" id="iActivity" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="iDate">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="iTime">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="iLocation">
            </div>
            <div class="form-group">
                <label class="form-label">Biaya</label>
                <input type="number" class="form-control" id="iCost" min="0">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="iNotes" rows="2"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveItinerary }
    ]);
}

function saveItinerary() {
    const activity = document.getElementById('iActivity').value.trim();
    if (!activity) {
        showToast('Aktivitas harus diisi', 'error');
        return;
    }

    weddingData.honeymoon.itinerary.push({
        id: generateId(),
        activity: activity,
        date: document.getElementById('iDate').value,
        time: document.getElementById('iTime').value,
        location: document.getElementById('iLocation').value,
        cost: parseInt(document.getElementById('iCost').value) || 0,
        notes: document.getElementById('iNotes').value
    });

    saveData();
    closeModal();
    renderPage();
    showToast('Aktivitas berhasil ditambahkan', 'success');
}

function deleteItinerary(id) {
    openModal('Hapus Aktivitas', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus aktivitas ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.honeymoon.itinerary = weddingData.honeymoon.itinerary.filter(i => i.id !== id);
                saveData();
                renderPage();
                showToast('Aktivitas berhasil dihapus', 'success');
        }}
    ]);
}

function openAddExpenseModal() {
    currentEditId = null;
    openModal('Tambah Pengeluaran', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="eDate">
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="eCategory">
                    <option>Penerbangan</option>
                    <option>Hotel</option>
                    <option>Transportasi</option>
                    <option>Makanan</option>
                    <option>Aktivitas</option>
                    <option>Belanja</option>
                    <option>Lainnya</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Deskripsi</label>
                <input type="text" class="form-control" id="eDescription" required>
            </div>
            <div class="form-group">
                <label class="form-label required">Jumlah</label>
                <input type="number" class="form-control" id="eAmount" min="0" required>
            </div>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveExpense }
    ]);
}

function editExpense(id) {
    const e = weddingData.honeymoon.expenses.find(x => x.id === id);
    if (!e) return;

    currentEditId = id;
    openModal('Edit Pengeluaran', `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="eDate" value="${e.date || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Kategori</label>
                <select class="form-control" id="eCategory">
                    ${['Penerbangan', 'Hotel', 'Transportasi', 'Makanan', 'Aktivitas', 'Belanja', 'Lainnya'].map(c => 
                        `<option value="${c}" ${e.category === c ? 'selected' : ''}>${c}</option>`
                    ).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label required">Deskripsi</label>
                <input type="text" class="form-control" id="eDescription" value="${escapeHtml(e.description)}" required>
            </div>
            <div class="form-group">
                <label class="form-label required">Jumlah</label>
                <input type="number" class="form-control" id="eAmount" value="${e.amount || 0}" min="0" required>
            </div>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveExpense }
    ]);
}

function saveExpense() {
    const description = document.getElementById('eDescription').value.trim();
    const amount = parseInt(document.getElementById('eAmount').value);

    if (!description || !amount) {
        showToast('Deskripsi dan jumlah harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        date: document.getElementById('eDate').value,
        category: document.getElementById('eCategory').value,
        description: description,
        amount: amount
    };

    if (currentEditId) {
        const index = weddingData.honeymoon.expenses.findIndex(x => x.id === currentEditId);
        if (index !== -1) {
            weddingData.honeymoon.expenses[index] = data;
        }
    } else {
        weddingData.honeymoon.expenses.push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Pengeluaran berhasil disimpan', 'success');
}

function deleteExpense(id) {
    openModal('Hapus Pengeluaran', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus pengeluaran ini?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.honeymoon.expenses = weddingData.honeymoon.expenses.filter(e => e.id !== id);
                saveData();
                renderPage();
                showToast('Pengeluaran berhasil dihapus', 'success');
        }}
    ]);
}

function showItineraryDetail(itineraryId) {
    const i = weddingData.honeymoon.itinerary.find(x => x.id === itineraryId);
    if (!i) return;

    openModal(`Detail Aktivitas: ${escapeHtml(i.activity)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Aktivitas</div><div>${escapeHtml(i.activity) || '-'}</div>
                <div class="text-muted">Tanggal</div><div>${i.date ? formatDateShort(i.date) : '-'}</div>
                <div class="text-muted">Waktu</div><div>${i.time || '-'}</div>
                <div class="text-muted">Lokasi</div><div>${escapeHtml(i.location) || '-'}</div>
                <div class="text-muted">Biaya</div><div>${i.cost ? formatCurrency(i.cost) : '-'}</div>
                <div class="text-muted">Catatan</div><div>${escapeHtml(i.notes) || '<span class="text-muted">-</span>'}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editItinerary(itineraryId)); } }
    ], 'modal-lg');
}

function showExpenseDetail(expenseId) {
    const e = weddingData.honeymoon.expenses.find(x => x.id === expenseId);
    if (!e) return;

    openModal(`Detail Pengeluaran: ${escapeHtml(e.description)}`, `
        <div class="detail-stack">
            <div class="details-grid">
                <div class="text-muted">Tanggal</div><div>${e.date ? formatDateShort(e.date) : '-'}</div>
                <div class="text-muted">Kategori</div><div>${escapeHtml(e.category)}</div>
                <div class="text-muted">Deskripsi</div><div>${escapeHtml(e.description)}</div>
                <div class="text-muted">Jumlah</div><div>${formatCurrency(e.amount)}</div>
            </div>
        </div>
    `, [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Edit', class: 'btn-primary', onClick: () => { closeModal(() => editExpense(expenseId)); } }
    ], 'modal-lg');
}

function editItinerary(id) {
    const item = weddingData.honeymoon.itinerary.find(i => i.id === id);
    if (!item) return;

    openModal('Edit Aktivitas', `
        <div class="form-group">
            <label class="form-label required">Aktivitas</label>
            <input type="text" class="form-control" id="iActivity" value="${escapeHtml(item.activity)}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" id="iDate" value="${item.date || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Waktu</label>
                <input type="time" class="form-control" id="iTime" value="${item.time || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Lokasi</label>
                <input type="text" class="form-control" id="iLocation" value="${escapeHtml(item.location) || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Biaya</label>
                <input type="number" class="form-control" id="iCost" value="${item.cost || ''}" min="0">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="iNotes" rows="2">${escapeHtml(item.notes) || ''}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveItinerary }
    ]);
}

// ========================================
// KUA CHECKLIST
// ========================================
function renderKUA() {
    const progress = calculateKuaProgress();

    return `
        <div class="page-header">
            <h1 class="page-title">Checklist KUA</h1>
            <p class="page-subtitle">Administrasi pernikahan Indonesia</p>
        </div>
        
        <div class="progress-section mb-3">
            <div class="flex-between">
                <span class="progress-title">Progress Keseluruhan</span>
                <span>${progress.checked}/${progress.total} (${progress.percentage}%)</span>
            </div>
            <div class="progress-bar mt-1">
                <div class="progress-fill" style="--progress-value: ${progress.percentage}%"></div>
            </div>
        </div>
        
        <div class="card card--highlight-primary mb-3">
            <div class="card-body card-body--compact content-note">
                <p class="text-muted mb-0">
                    <strong>Catatan:</strong> Persyaratan dan biaya dapat berubah. Konfirmasi kembali dengan KUA/Kementerian Agama sesuai domisili dan tanggal pernikahan.
                </p>
            </div>
        </div>
        
        ${renderKUASection('Persiapan Awal', 'persiapanAwal')}
        ${renderKUASection('Formulir Nikah', 'formulirNikah')}
        ${renderKUASection('Dokumen Tambahan', 'dokumenTambahan')}
        ${renderKUASection('Pendaftaran KUA', 'pendaftaran')}
    `;
}

function renderKUASection(title, key) {
    const items = weddingData.kuaChecklist[key] || [];
    const completed = items.filter(i => i.checked).length;
    const total = items.length;

    return `
        <div class="card mb-2">
            <div class="card-header">
                <div class="kua-section-header">
                    <h3 class="card-title">${title}</h3>
                    <div class="kua-section-actions">
                        <span class="badge badge-primary">${completed}/${total}</span>
                        <button class="btn btn-primary" onclick="openAddKUAModal('${key}')" title="Tambah Dokumen">+ Tambah</button>
                    </div>
                </div>
            </div>
            <div class="card-body list-panel">
                ${items.length > 0 ? items.map(item => `
                    <div class="checklist-item ${item.checked ? 'checked' : ''}">
                        <input type="checkbox" class="checklist-item-checkbox" id="kua_${item.id}" ${item.checked ? 'checked' : ''} onchange="toggleKUAItem('${key}', '${item.id}')">
                        <label for="kua_${item.id}" class="checklist-item-content checklist-label">
                            <div class="checklist-item-text">${escapeHtml(item.name)}</div>
                            ${item.notes && String(item.notes).trim() ? `<div class="checklist-item-meta">${escapeHtml(item.notes)}</div>` : ''}
                        </label>
                        <div class="btn-group push-end-fixed">
                            <button class="btn btn-sm btn-ghost" onclick="showKUADetail('${key}', '${item.id}')" title="Detail" aria-label="Lihat detail dokumen">${ICONS.info}</button>
                            <button class="btn btn-sm btn-ghost" onclick="editKUAItem('${key}', '${item.id}')" title="Edit" aria-label="Edit">${ICONS.edit}</button>
                            <button class="btn btn-sm btn-ghost text-danger" onclick="deleteKUAItem('${key}', '${item.id}')" title="Hapus" aria-label="Hapus">${ICONS.del}</button>
                        </div>
                    </div>
                `).join('') : '<div class="empty-block-msg">Belum ada dokumen</div>'}
            </div>
        </div>
    `;
}

function toggleKUAItem(section, itemId) {
    const item = weddingData.kuaChecklist[section].find(i => i.id === itemId);
    if (item) {
        item.checked = !item.checked;
        saveData();

        const checkbox = document.getElementById(`kua_${itemId}`);
        if (checkbox) checkbox.checked = item.checked;

        const row = checkbox ? checkbox.closest('.checklist-item') : null;
        if (row) {
            if (item.checked) row.classList.add('checked');
            else row.classList.remove('checked');
        }

        // Update Progress Bar
        let total = 0;
        let checked = 0;
        Object.values(weddingData.kuaChecklist).forEach(sectionItems => {
            total += sectionItems.length;
            checked += sectionItems.filter(i => i.checked).length;
        });

        const pct = total === 0 ? 0 : Math.round((checked / total) * 100);
        const fill = document.querySelector('.page-header + .card .progress-fill');
        if (fill) fill.style.width = pct + '%';

        const text = document.querySelector('.page-header + .card .flex-between span:last-child');
        if (text) text.textContent = `${checked} dari ${total} syarat terpenuhi`;

        if (item.checked) {
            showToast(`Dokumen "${item.name}" ditandai selesai`, 'success');
        } else {
            showToast(`Dokumen "${item.name}" belum selesai`, 'info');
        }
    }
}

function openAddKUAModal(section) {
    currentEditId = null;
    openModal('Tambah Dokumen KUA', `
        <input type="hidden" id="kuaSection" value="${section}">
        <div class="form-group">
            <label class="form-label required">Nama Dokumen/Persyaratan</label>
            <input type="text" class="form-control" id="kuaName" placeholder="Contoh: Fotokopi KTP Suami" required>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan/Keterangan</label>
            <textarea class="form-control" id="kuaNotes" rows="2" placeholder="Contoh: Bawa asli dan 2 lembar fotokopi"></textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveKUAItem }
    ]);
}

function editKUAItem(section, id) {
    const item = weddingData.kuaChecklist[section].find(i => i.id === id);
    if (!item) return;

    currentEditId = id;
    openModal('Edit Dokumen KUA', `
        <input type="hidden" id="kuaSection" value="${section}">
        <div class="form-group">
            <label class="form-label required">Nama Dokumen/Persyaratan</label>
            <input type="text" class="form-control" id="kuaName" value="${escapeHtml(item.name)}" required>
        </div>
        <div class="form-group">
            <label class="form-label">Catatan/Keterangan</label>
            <textarea class="form-control" id="kuaNotes" rows="2">${escapeHtml(item.notes || '')}</textarea>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Simpan', class: 'btn-primary', onClick: saveKUAItem }
    ]);
}

function saveKUAItem() {
    const section = document.getElementById('kuaSection').value;
    const name = document.getElementById('kuaName').value.trim();
    const notes = document.getElementById('kuaNotes').value.trim();

    if (!name) {
        showToast('Nama dokumen harus diisi', 'error');
        return;
    }

    const data = {
        id: currentEditId || generateId(),
        name: name,
        notes: notes,
        checked: false
    };

    if (currentEditId) {
        const index = weddingData.kuaChecklist[section].findIndex(i => i.id === currentEditId);
        if (index !== -1) {
            data.checked = weddingData.kuaChecklist[section][index].checked; // preserve state
            weddingData.kuaChecklist[section][index] = data;
        }
    } else {
        weddingData.kuaChecklist[section].push(data);
    }

    saveData();
    closeModal();
    renderPage();
    showToast('Dokumen berhasil disimpan', 'success');
}

function deleteKUAItem(section, id) {
    openModal('Hapus Dokumen', '<p class="modal-confirm-message text-center">Apakah Anda yakin ingin menghapus dokumen ini dari checklist?</p>', [
        { label: 'Batal', class: 'btn-secondary', onClick: closeModal },
        { label: 'Hapus', class: 'btn-danger', onClick: () => {
                weddingData.kuaChecklist[section] = weddingData.kuaChecklist[section].filter(i => i.id !== id);
                saveData();
                closeModal();
                renderPage();
                showToast('Dokumen berhasil dihapus', 'success');
        }}
    ]);
}

// ========================================
// COUNTDOWN REMINDERS
// ========================================
function checkCountdownReminders() {
    const data = getCountdownMessage();
    let days = data.days;
    if (data.type === 'today') days = 0;

    if (days === null || days < 0) return;

    // Allow toast to show after 1 second of loading
    setTimeout(() => {
        if(days === 30) {
            showToast('H-30! Pastikan vendor utama sudah final dan DP dibayarkan.', 'info');
        } else if(days === 7) {
            showToast('H-7! Cek kembali rundown dan RSVP tamu.', 'warning');
        } else if(days === 1) {
            showToast('H-1! Jaga kesehatan & istirahat yang cukup untuk besok.', 'success');
        } else if(days === 0) {
            showToast('Hari Pernikahan! Selamat berbahagia dan nikmati momen Anda!', 'success');
        }
    }, 1000);
}

// ========================================
// SAMPLE DATA
// ========================================
function fillSampleData() {
    openModal('Skenario Data Contoh', `
        <p class="text-center">Pilih kondisi untuk menguji tampilan, banner dan alur setiap modul. Data tidak diganti sebelum konfirmasi. Nama, kontak, harga, dan detail layanan adalah data simulasi untuk pengujian, bukan informasi atau penawaran resmi.</p>
        <div class="sample-scenario-grid">
            ${SAMPLE_SCENARIOS.map(s => `<div class="sample-scenario"><h4>${s.label}</h4><p>${s.description}</p><button class="btn btn-secondary btn-sm" onclick="confirmSampleScenario('${s.id}')">Gunakan skenario</button><button class="btn btn-ghost btn-sm" onclick="exportSampleScenario('${s.id}')">Export JSON untuk import</button></div>`).join('')}
        </div>
    `, [{ label: 'Tutup', class: 'btn-secondary', onClick: closeModal }], 'modal-lg');
}

const SAMPLE_SCENARIOS = [
    { id: 'empty', label: 'Kosong', description: 'Modul kosong, onboarding, empty state dan tombol tambah.' },
    { id: 'unconfigured', label: 'Tanggal belum diatur', description: 'Data terisi, profil/tanggal kosong: welcome panel dan countdown tanpa angka.' },
    { id: 'normal', label: 'Persiapan normal', description: 'H-75, semua modul terisi, status campuran dan catatan dengan/tanpa isi.' },
    { id: 'warnings', label: 'Peringatan & jatuh tempo', description: 'Over-budget, tugas/tagihan terlambat, KUA belum lengkap dan tamu belum mendapat meja.' },
    { id: 'h30', label: 'H-30', description: 'Countdown 30 hari dan notifikasi pengingat vendor/DP.' },
    { id: 'h7', label: 'H-7', description: 'Countdown satu minggu dan notifikasi rundown/RSVP.' },
    { id: 'h1', label: 'H-1', description: 'Countdown satu hari dan pengingat menjelang pernikahan.' },
    { id: 'today', label: 'Hari pernikahan', description: 'Pesan Hari Pernikahan, notifikasi ucapan dan acara pada kalender hari ini.' },
    { id: 'past', label: 'Setelah pernikahan', description: 'Tanggal lampau, hadiah, countdown selesai dan honeymoon.' },
    { id: 'complete', label: 'Semua selesai', description: 'Progress 100%, tagihan lunas, dokumen/foto selesai dan ucapan terkirim.' },
    { id: 'dense', label: 'Daftar panjang', description: 'Seluruh modul berisi daftar panjang, status campuran, catatan multiline, dan agenda per tanggal untuk menguji scroll/filter/detail.' }
];

function confirmSampleScenario(id) {
    const scenario = SAMPLE_SCENARIOS.find(s => s.id === id);
    if (!scenario) return;
    openModal('Gunakan Data Contoh: ' + scenario.label, `
        <div class="modal-confirm-content">
            <p class="modal-confirm-message">Data aplikasi saat ini akan ditimpa dan penanda backup direset untuk menampilkan reminder. Export backup terlebih dahulu jika ingin menyimpan data sebelumnya.</p>
            <p class="text-muted mb-0">${scenario.description}</p>
        </div>
    `, [
        { label: 'Batal', class: 'btn-secondary', onClick: fillSampleData },
        { label: 'Ganti dengan data contoh', class: 'btn-primary', onClick: () => {
            applySampleData(id);
            closeModal(() => {
                navigateTo('dashboard', true);
                showToast('Skenario ' + scenario.label + ' berhasil diisi', 'success');
            });
        } }
    ]);
}

function applySampleData(scenario = 'normal') {
    weddingData = buildSampleData(scenario);
    settingsDraft = null;
    currentEditId = null;
    calendarDate = new Date();
    localStorage.removeItem('wp_last_backup');
    saveData();
}

function exportSampleScenario(id) {
    if (!SAMPLE_SCENARIOS.some(s => s.id === id)) return;
    const payload = { version: DATA_VERSION, data: buildSampleData(id) };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wedding-planner-sample-${id}-${getSampleDate(0)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('File skenario diunduh; dapat dipakai untuk menguji Import', 'success');
}

function enrichSampleData(data) {
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
    data.venues.push({ id: generateId(), name: 'Taman Arunika (Venue Simulasi)', location: 'Jakarta Selatan', capacity: 350, price: 55000000, type: 'Outdoor', contact: '081200000030', facilities: 'Taman, ruang rias, parkir, dan opsi tenda cadangan', pros: 'Cahaya sore dan akses kursi roda', cons: 'Memerlukan rencana cadangan hujan', selected: false, notes: 'Alternatif pembanding; biaya dan fasilitas merupakan data simulasi.' });
    data.foodDrinks.push({ id: generateId(), name: 'Air Mineral dan Teh Melati', category: 'Minuman', vendor: 'Puspa Catering Services', price: 12000, quantity: 600, selected: true, notes: 'Termasuk kebutuhan keluarga, vendor, dan kru.' });
    data.foodDrinks.push({ id: generateId(), name: 'Pilihan Menu Vegetarian', category: 'Main Course', vendor: 'Puspa Catering Services', price: 50000, quantity: 40, selected: false, notes: 'Alternatif untuk tamu vegetarian; konfirmasi kebutuhan saat RSVP.' });
    data.budget.push({ id: generateId(), category: 'Catering', description: 'Kue pernikahan dekoratif dan sajian keluarga', vendor: 'Le Novelle Cake', budget: 15000000, actualCost: 15000000, paid: 5000000, dueDate: relativeDate(-7), status: 'DP', fundSource: data.settings.fundSources[0], notes: 'Biaya contoh terpisah dari paket catering utama.' });
    data.photos.push({ id: generateId(), shot: 'Foto keluarga lengkap sebelum resepsi', category: 'Keluarga', priority: 'Tinggi', time: '18:30', location: 'Pelaminan', completed: false, notes: 'Daftar urutan keluarga dibawa koordinator agar sesi efisien.' });
    data.photos.forEach((item, i) => { item.completed = i % 4 === 0; });
    data.packing.forEach((item, i) => {
        if (!PACKING_CATEGORIES.includes(item.category)) item.category = 'Lainnya';
        item.notes ||= 'Periksa jumlah, kondisi, dan label pemilik sebelum dimasukkan ke tas.';
        item.carrier ||= 'Koordinator perlengkapan';
        item.destination ||= 'Ruang persiapan venue';
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
        if (!data.vendors.some(vendor => vendor.name === name)) data.vendors.push({ id: generateId(), name, category: /Ballroom/.test(name) ? 'Venue' : 'Lainnya', contact: '081200000031', social: 'https://example.com/vendor', price, rating: 4, package: 'Paket layanan contoh sesuai kebutuhan acara', pros: 'PIC tersedia saat koordinasi', cons: 'Jadwal dan biaya perlu dikonfirmasi', status: 'Terpilih', notes: 'Vendor simulasi untuk menguji hubungan anggaran/menu/rundown.' });
    });
    const contactNames = new Set([...data.rundown.map(item => item.pic), ...data.vendors.map(item => item.name), ...data.weddingParty.map(item => item.name)].filter(Boolean));
    contactNames.forEach(name => {
        if (!data.contacts.some(contact => contact.name === name)) data.contacts.push({ id: generateId(), name, category: data.vendors.some(vendor => vendor.name === name) ? 'Vendor' : 'Keluarga', company: data.vendors.find(vendor => vendor.name === name)?.name || 'Tim keluarga dan pendamping', phone: '', whatsapp: '', email: '', instagram: '', address: 'Jakarta', notes: 'Kontak simulasi untuk koordinasi persiapan dan hari acara.' });
    });
    data.contacts.forEach((contact, i) => {
        contact.phone = '0812000' + String(i+1).padStart(5,'0');
        contact.whatsapp = contact.phone;
        contact.email = 'kontak' + (i+1) + '@example.com';
        contact.instagram ||= 'https://example.com/kontak/' + (i+1);
        contact.company ||= 'Koordinator keluarga';
        contact.address ||= 'Jakarta';
    });
    data.vendors.forEach(vendor => { vendor.contact = data.contacts.find(contact => contact.name === vendor.name).phone; });
    data.weddingParty.forEach(member => { member.contact = data.contacts.find(contact => contact.name === member.name).phone; });
    data.settings.weddingRoles = [...new Set([...data.settings.weddingRoles, ...data.weddingParty.map(member => member.role)])];
    data.guests.forEach((guest, i) => {
        guest.phone = '0812100' + String(i+1).padStart(5,'0');
        guest.notes ||= 'Konfirmasi kehadiran, jumlah rombongan, dan kebutuhan aksesibilitas.';
    });
    data.honeymoon.destination.currency = data.settings.currency;
    data.honeymoon.destination.budget = 75000000;
    data.honeymoon.expenses.push({ id: generateId(), date: getSampleDate(-1), category: 'Transportasi', description: 'Transfer bandara dan penginapan untuk dua orang (simulasi)', amount: 4000000 });
    data.honeymoon.expenses.push({ id: generateId(), date: getSampleDate(-1), category: 'Aktivitas', description: 'Pemesanan awal snorkeling dan wisata lokal (simulasi)', amount: 2500000 });
    data.honeymoon.itinerary.forEach(item => { item.notes += '\nRencana simulasi; cek cuaca, jam layanan, dan konfirmasi reservasi.'; });
    return data;
}

function enrichDenseSample(data) {
    const names = ['Alya Putri', 'Bagas Prakoso', 'Citra Lestari', 'Dewi Laras', 'Eko Saputra', 'Farah Aulia', 'Gilang Mahendra', 'Hana Kirana', 'Indra Wijaya', 'Jihan Maharani', 'Kevin Aditya', 'Laras Permata'];
    names.forEach((name, i) => {
        data.guests.push({ ...data.guests[0], id: generateId(), name, phone: '0812200'+String(i+1).padStart(5,'0'), tag: data.settings.guestTags[i % data.settings.guestTags.length], rsvp: RSVP_STATUSES[i % RSVP_STATUSES.length], table: '', guestCount: i % 3 + 1, invitationSent: i % 2 === 0, souvenirGiven: false, notes: 'Tamu simulasi untuk pengujian RSVP, pencarian, dan penempatan meja.\nKonfirmasi jumlah rombongan sebelum finalisasi.' });
        data.contacts.push({ ...data.contacts[0], id: generateId(), name: 'Koordinator '+name, email: 'koordinator'+i+'@example.com', phone: '0812300'+String(i+1).padStart(5,'0'), whatsapp: '0812300'+String(i+1).padStart(5,'0') });
        data.venues.push({ ...data.venues[2], id: generateId(), name: 'Alternatif venue '+name, price: 35000000+i*2500000, capacity: 200+i*25, selected: false });
        data.foodDrinks.push({ ...data.foodDrinks[0], id: generateId(), name: 'Menu alternatif '+name, category: FOOD_CATEGORIES[i % FOOD_CATEGORIES.length], selected: i % 2 === 0 });
        data.photos.push({ ...data.photos[0], id: generateId(), shot: 'Sesi dokumentasi '+name, category: PHOTO_CATEGORIES[i % PHOTO_CATEGORIES.length], priority: PRIORITIES[i % PRIORITIES.length], completed: i % 2 === 0 });
        data.packing.push({ ...data.packing[0], id: generateId(), name: 'Perlengkapan tim '+name, category: PACKING_CATEGORIES[i % PACKING_CATEGORIES.length], packed: i % 2 === 0 });
        data.weddingParty.push({ ...data.weddingParty[0], id: generateId(), name: 'Koordinator '+name, contact: '0812300'+String(i+1).padStart(5,'0'), role: data.settings.weddingRoles[i % data.settings.weddingRoles.length], notes: 'PIC contoh untuk koordinasi rombongan dan dokumentasi.' });
        data.rundown.push({ id: generateId(), activity: 'Koordinasi kedatangan rombongan '+name, startTime: '06:'+String(i*5).padStart(2,'0'), endTime: '07:'+String(i*5).padStart(2,'0'), location: 'Area drop-off dan meja registrasi', pic: 'Koordinator '+name, vendor: data.vendors.find(vendor => vendor.category === 'Wedding Organizer').name, notes: 'Agenda simulasi paralel untuk penerimaan rombongan, akses kursi roda, dan distribusi informasi.', date: data.settings.weddingDate });
        data.seating.push({ id: generateId(), name: 'Meja rombongan '+(i+1), capacity: 8, guests: [] });
        data.gifts.push({ ...data.gifts[0], id: generateId(), giver: name, value: 'Rp '+(500000+i*100000), dateReceived: getSampleDate(-i), thankYouSent: i % 2 === 0, thankYouDate: i % 2 === 0 ? getSampleDate(0) : '', notes: 'Hadiah simulasi; verifikasi pencatatan dan status ucapan.' });
        data.honeymoon.itinerary.push({ ...data.honeymoon.itinerary[3], id: generateId(), activity: 'Agenda perjalanan '+(i+1)+': jalan santai dan wisata lokal', date: data.honeymoon.destination.departureDate });
        data.honeymoon.expenses.push({ id: generateId(), date: getSampleDate(-i), category: 'Lainnya', description: 'Pengeluaran perjalanan simulasi '+(i+1), amount: 150000+i*25000 });
        const section = Object.keys(data.kuaChecklist)[i % 4];
        data.kuaChecklist[section].push({ id: generateId(), name: 'Verifikasi administrasi tambahan '+(i+1)+' (simulasi)', checked: i % 2 === 0, notes: i % 3 ? 'Konfirmasi kebutuhan dokumen ini kepada petugas; bukan persyaratan resmi.' : '' });
    });
}

function customizeSampleData(data, scenario) {
    const today = getSampleDate(0);
    const actual = data.budget.reduce((sum, b) => sum + (b.actualCost || 0), 0);
    data.settings.targetBudget = Math.max(data.settings.targetBudget, Math.ceil(actual * 1.2));
    ['Dipertimbangkan', 'Dihubungi', 'Meeting', 'Ditolak'].forEach((status, i) => {
        const original = data.vendors[i];
        data.vendors.push({ ...original, id: generateId(), name: 'Alternatif '+original.category+' '+(i+1)+' (simulasi)', status, notes: 'Pembanding vendor untuk uji shortlist, filter, dan detail; belum menjadi kontrak utama.' });
    });
    data.guests.slice(-RSVP_STATUSES.length).forEach((guest, i) => { guest.rsvp = RSVP_STATUSES[i]; });
    data.budget.slice(-PAYMENT_STATUSES.length).forEach((item, i) => {
        item.status = PAYMENT_STATUSES[i];
        item.paid = item.status === 'Lunas' ? item.actualCost : item.status === 'Belum Dibayar' ? 0 : Math.floor(item.actualCost / 2);
    });
    Object.values(data.kuaChecklist).forEach(items => items.forEach((item, i) => {
        item.checked = i % 3 === 0;
        item.notes = i % 2 ? '' : 'Verifikasi '+item.name+'. Siapkan dokumen asli dan salinan, lalu konfirmasi kepada petugas. Catatan simulasi, bukan daftar persyaratan resmi.';
    }));
    if (scenario === 'empty') {
        const empty = getDefaultData();
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
        data.timeline.forEach((t, i) => { t.completed = false; t.deadline = getSampleDate(-i - 1); });
        data.budget.forEach((b, i) => { b.paid = 0; b.status = 'Belum Dibayar'; b.dueDate = getSampleDate(-i - 1); });
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
            data.timeline.push({ ...data.timeline[0], id: generateId(), task: 'Konfirmasi rombongan ' + (i + 1) + ': kedatangan, transportasi, dan kebutuhan aksesibilitas', completed: false, deadline: getSampleDate(i + 1) });
            data.budget.push({ ...data.budget[0], id: generateId(), description: 'Transportasi dan logistik rombongan ' + (i + 1), vendor: 'Mitra logistik rombongan ' + (i + 1), category: 'Transportasi', budget: 2000000+i*100000, actualCost: 2000000+i*100000, paid: 0, status: 'Belum Dibayar', dueDate: getSampleDate(i + 1) });
            data.vendors.push({ ...data.vendors[0], id: generateId(), name: 'Mitra logistik rombongan ' + (i + 1), category: 'Transportasi', price: 2000000+i*100000, notes: 'Vendor simulasi; biaya kendaraan dan pengantaran perlengkapan.', status: 'Terpilih' });
            data.events.push({ id: generateId(), name: 'Koordinasi rombongan ' + (i + 1), date: today, time: String(8+Math.floor(i/4)).padStart(2,'0')+':'+String((i%4)*15).padStart(2,'0'), location: 'Ruang koordinasi keluarga', notes: i % 2 ? '' : 'Contoh catatan acara.' });
        }
    }
    if (scenario === 'dense') enrichDenseSample(data);
    data.vendors.forEach((vendor, i) => {
        let contact = data.contacts.find(contact => contact.name === vendor.name);
        if (!contact) {
            const phone = '0812400'+String(i+1).padStart(5,'0');
            contact = { id: generateId(), name: vendor.name, category: 'Vendor', company: vendor.name, phone, whatsapp: phone, email: 'vendor'+(i+1)+'@example.com', instagram: 'https://example.com/vendor/'+(i+1), address: 'Jakarta', notes: 'Kontak simulasi untuk pengujian hubungan vendor dan acara.' };
            data.contacts.push(contact);
        }
        vendor.contact = contact.phone;
    });
    data.venues.forEach((venue, i) => {
        let contact = data.contacts.find(contact => contact.name === venue.name);
        if (!contact) {
            const phone = '0812500'+String(i+1).padStart(5,'0');
            contact = { id: generateId(), name: venue.name, category: 'Venue', company: venue.name, phone, whatsapp: phone, email: 'venue'+(i+1)+'@example.com', instagram: 'https://example.com/venue/'+(i+1), address: venue.location, notes: 'Kontak venue simulasi untuk pengujian; bukan kontak resmi.' };
            data.contacts.push(contact);
        }
        venue.contact = contact.phone;
        const payment = data.budget.find(item => item.vendor === venue.name);
        venue.notes = venue.selected && payment
            ? 'Venue terpilih. Status pembayaran: '+payment.status+'. Dibayar '+formatCurrency(payment.paid)+'. Sisa '+formatCurrency(payment.actualCost-payment.paid)+'.'
            : 'Alternatif venue pembanding; belum dipilih atau belum memiliki tagihan.';
        venue.notes += '\nData simulasi; harga, fasilitas, dan kontak bukan penawaran atau informasi resmi.';
    });
    data.budget.forEach(item => {
        const deadline = item.status === 'Lunas' ? 'pembayaran selesai' : item.dueDate ? item.dueDate < today ? 'terlewat' : item.dueDate === today ? 'hari ini' : 'mendatang' : 'belum diatur';
        const payment = item.status === 'Lunas' ? 'Lunas; tidak ada sisa pembayaran.' : 'Dibayar '+formatCurrency(item.paid)+', sisa tagihan '+formatCurrency(item.actualCost-item.paid)+'.';
        item.notes = 'Simulasi biaya '+item.description+'.\nStatus: '+item.status+'. '+payment+'\nJatuh tempo: '+(item.dueDate || '-')+' ('+deadline+').';
    });
    data.settings.guestTags = [...new Set([...data.settings.guestTags, ...data.guests.map(guest => guest.tag)])];
    data.settings.weddingRoles = [...new Set([...data.settings.weddingRoles, ...data.weddingParty.map(member => member.role)])];
    data.guests.forEach(guest => { guest.table = data.seating.find(table => table.guests?.includes(guest.name))?.name || ''; });
    return data;
}

function getSampleDate(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

const SAMPLE_POPUP_MODULES = [
    { label: 'Timeline', path: 'timeline', add: openAddTaskModal, edit: editTask, detail: showTaskDetail, remove: deleteTask },
    { label: 'Rundown', path: 'rundown', add: openAddRundownModal, edit: editRundown, detail: showRundownDetail, remove: deleteRundown },
    { label: 'Acara', path: 'events', add: openAddEventModal, edit: editEvent, detail: showEventDetail, remove: deleteEvent },
    { label: 'Packing', path: 'packing', add: openAddPackingModal, edit: editPacking, detail: showPackingDetail, remove: deletePacking },
    { label: 'Vendor', path: 'vendors', add: openAddVendorModal, edit: editVendor, detail: showVendorDetail, remove: deleteVendor },
    { label: 'Kontak', path: 'contacts', add: openAddContactModal, edit: editContact, detail: showContactDetail, remove: deleteContact },
    { label: 'Anggaran', path: 'budget', add: openAddBudgetModal, edit: editBudget, detail: showBudgetDetail, remove: deleteBudget },
    { label: 'Tamu', path: 'guests', add: openAddGuestModal, edit: editGuest, detail: showGuestDetail, remove: deleteGuest },
    { label: 'Wedding Party', path: 'weddingParty', add: openAddWeddingPartyModal, edit: editWeddingParty, detail: showWeddingPartyDetail, remove: deleteWeddingParty },
    { label: 'Venue', path: 'venues', add: openAddVenueModal, edit: editVenue, detail: showVenueDetail, remove: deleteVenue },
    { label: 'Makanan/Minuman', path: 'foodDrinks', add: openAddFoodModal, edit: editFood, detail: showFoodDetail, remove: deleteFood },
    { label: 'Seating', path: 'seating', add: openAddTableModal, detail: showTableDetail, remove: deleteTable },
    { label: 'Foto', path: 'photos', add: openAddPhotoModal, edit: editPhoto, detail: showPhotoDetail, remove: deletePhoto },
    { label: 'Hadiah', path: 'gifts', add: openAddGiftModal, edit: editGift, detail: showGiftDetail, remove: deleteGift },
    { label: 'Itinerary Honeymoon', path: 'honeymoon.itinerary', add: openAddItineraryModal, edit: editItinerary, detail: showItineraryDetail, remove: deleteItinerary },
    { label: 'Pengeluaran Honeymoon', path: 'honeymoon.expenses', add: openAddExpenseModal, edit: editExpense, detail: showExpenseDetail, remove: deleteExpense },
    ...Object.keys(KUA_CHECKLIST).map(section => ({ label: 'KUA: ' + section, path: 'kuaChecklist.' + section, section, add: openAddKUAModal, edit: editKUAItem, detail: showKUADetail, remove: deleteKUAItem }))
];

function openSamplePreviewMenu() {
    const options = SAMPLE_POPUP_MODULES.map((module, index) => '<option value="' + index + '">' + escapeHtml(module.label) + '</option>').join('');
    openModal('Uji Pop-up Modul', '<p class="text-center">Pilih modul dan jenis dialog. Edit/detail/hapus memakai data pertama; tombol Hapus hanya membuka konfirmasi. Gunakan skenario data contoh dahulu jika tidak ingin mengubah data asli.</p><label class="form-label" for="samplePopupModule">Modul</label><select class="form-control" id="samplePopupModule">' + options + '</select>', [
        { label: 'Tutup', class: 'btn-secondary', onClick: closeModal },
        { label: 'Tambah', class: 'btn-primary', onClick: () => previewSamplePopup('add') },
        { label: 'Edit', class: 'btn-secondary', onClick: () => previewSamplePopup('edit') },
        { label: 'Detail', class: 'btn-secondary', onClick: () => previewSamplePopup('detail') },
        { label: 'Hapus', class: 'btn-danger', onClick: () => previewSamplePopup('remove') }
    ], 'modal-lg');
}

function previewSamplePopup(action) {
    const module = SAMPLE_POPUP_MODULES[Number(document.getElementById('samplePopupModule').value)];
    if (!module || !module[action]) { showToast('Jenis dialog ini tidak tersedia pada modul tersebut', 'info'); return; }
    const records = module.path.split('.').reduce((value, key) => value?.[key], weddingData);
    const record = records?.[0];
    if (action !== 'add' && !record) { showToast('Belum ada data. Pilih skenario terisi atau tambahkan data dahulu.', 'info'); return; }
    closeModal(() => {
        if (action === 'add') module[action](module.section);
        else if (module.section) module[action](module.section, record.id);
        else module[action](record.id);
    });
}

function buildSampleData(scenario = 'normal') {
    const weddingData = getDefaultData();
    const d = getDefaultData();
    const offsets = { normal: 75, unconfigured: 75, warnings: 7, h30: 30, h7: 7, h1: 1, today: 0, past: -7, complete: -7, dense: 75, empty: 75 };
    const offset = offsets[scenario] ?? 75;
    const sampleFutureDate = days => getSampleDate(days + offset - 75);
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
    const venueId1 = generateId();
    const venueId2 = generateId();
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
    const woId = generateId();
    const photoId = generateId();
    const muaId = generateId();
    const caterId = generateId();
    const decorId = generateId();
    const attireId = generateId();
    const musicId = generateId();
    const inviteId = generateId();
    const giftVendorId = generateId();

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
        { id: generateId(), name: 'Mbak Rina Wijaya', category: 'Vendor', company: 'The Signature Wedding Organizer', phone: '081299887766', whatsapp: '081299887766', email: 'rina@signature.co.id', instagram: '@rina.signature', address: '', notes: 'PIC Utama Wedding Organizer D-Day' },
        { id: generateId(), name: 'Bapak Surya Atmaja', category: 'Vendor', company: 'Hotel Mulia Senayan', phone: '081100001111', whatsapp: '081100001111', email: 'surya.banquet@hotelmulia.com', instagram: '', address: '', notes: 'Banquet & Venue Manager Hotel Mulia' },
        { id: generateId(), name: 'Ibu Hj. Yuni Astuti', category: 'Keluarga Pengantin Wanita', company: 'Keluarga Besar Anindya', phone: '081244556677', whatsapp: '081244556677', email: 'yuni.astuti@gmail.com', instagram: '', address: 'Bintaro Jaya Sektor 7', notes: 'Koordinator Seragam & Konsumsi Keluarga Inti' },
        { id: generateId(), name: 'Bpk. Dr. H. Bambang Susanto, M.M.', category: 'Keluarga Pengantin Wanita', company: 'Ayah / Wali Nikah', phone: '081122334455', whatsapp: '081122334455', email: '', instagram: '', address: 'Pondok Indah, Jakarta Selatan', notes: 'Wali Nikah Pengantin Wanita' },
        { id: generateId(), name: 'Dimas Prasetyo', category: 'Pengiring Pria', company: 'Sahabat Pengantin Pria', phone: '081555667788', whatsapp: '081555667788', email: '', instagram: '@dimas.pras', address: 'Kemang, Jaksel', notes: 'Best Man / PIC Cincin Kawin' },
        { id: generateId(), name: 'Ust. Ahmad Fauzi (KUA Tanah Abang)', category: 'KUA', company: 'KUA Kecamatan Tanah Abang', phone: '081399881122', whatsapp: '081399881122', email: '', instagram: '', address: 'Jl. KH. Mas Mansyur, Tanah Abang', notes: 'Penghulu Petugas Akad Nikah Resmi SIMKAH' }
    ];

    // 5. Budget (Cross-linked with vendors & demonstrates over-budget alert)
    weddingData.budget = [
        { id: generateId(), category: 'Venue', description: 'Grand Ballroom Hotel Mulia Senayan', vendor: 'Grand Ballroom Hotel Mulia', budget: 165000000, actualCost: 165000000, paid: 82500000, dueDate: getPastDate(15), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Sisa pelunasan H-14' },
        { id: generateId(), category: 'Catering', description: 'Paket Buffet 500 Pax + 6 Food Stall Pilihan', vendor: 'Puspa Catering Services', budget: 120000000, actualCost: 135000000, paid: 40000000, dueDate: sampleFutureDate(20), status: 'DP', fundSource: 'Keluarga Pengantin Pria', notes: 'Penambahan 100 porsi kambing guling (Over budget)' },
        { id: generateId(), category: 'Dekorasi', description: 'Dekorasi Pelaminan 18m, Foyer, & Lorong Bunga Masuk', vendor: 'Stupa Caspea Decoration', budget: 60000000, actualCost: 65000000, paid: 30000000, dueDate: sampleFutureDate(35), status: 'DP', fundSource: 'Keluarga Pengantin Wanita', notes: 'Rangkaian fresh flower impor wangi' },
        { id: generateId(), category: 'Lainnya', description: 'Wedding Organizer Full Day Service (12 Crew)', vendor: 'The Signature Wedding Organizer', budget: 45000000, actualCost: 45000000, paid: 45000000, dueDate: getPastDate(30), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Lunas kontrak kerja' },
        { id: generateId(), category: 'Foto & Video', description: 'Dokumentasi Prewedding, Liputan D-Day & SDE Video', vendor: 'Lumina Pictures', budget: 25000000, actualCost: 25000000, paid: 15000000, dueDate: getPastDate(3), status: 'Sebagian', fundSource: 'Tabungan Bersama', notes: 'Termin dokumentasi dan serah terima album' },
        { id: generateId(), category: 'Busana', description: 'Jas Pengantin Bespoke & Beskap Tradisional', vendor: 'Wong Hang Distinguished Tailor', budget: 20000000, actualCost: 20000000, paid: 20000000, dueDate: getPastDate(45), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Lunas saat fitting bahan' },
        { id: generateId(), category: 'MUA', description: 'Rias Pengantin Akad, Resepsi, & 2 Ibu Pengantin', vendor: 'Bennu Sorumba Makeup', budget: 18000000, actualCost: 18000000, paid: 9000000, dueDate: sampleFutureDate(50), status: 'DP', fundSource: 'Keluarga Pengantin Wanita', notes: 'DP 50% terbayar' },
        { id: generateId(), category: 'Souvenir', description: '500 Pcs Reed Diffuser Aromatherapy Amber Bottle', vendor: 'Kencana Luxury Souvenir', budget: 15000000, actualCost: 15000000, paid: 7500000, dueDate: sampleFutureDate(10), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Pelunasan saat barang tiba di venue' },
        { id: generateId(), category: 'Entertainment', description: 'Mini Chamber Orchestra 6 Pcs & Sound System', vendor: 'Lala Entertainment & Orchestra', budget: 14000000, actualCost: 14000000, paid: 5000000, dueDate: sampleFutureDate(40), status: 'DP', fundSource: 'Tabungan Bersama', notes: 'Sisa H-3 acara' },
        { id: generateId(), category: 'Undangan', description: '300 Hardcover Foil Gold + Website Undangan Online', vendor: 'Byru Invitation & Digital', budget: 6000000, actualCost: 6000000, paid: 6000000, dueDate: getPastDate(20), status: 'Lunas', fundSource: 'Tabungan Bersama', notes: 'Selesai cetak dan lunas' },
        { id: generateId(), category: 'KUA', description: 'Biaya Pencatatan Nikah Luar Balai & Transport Penghulu', vendor: 'KUA Kecamatan Tanah Abang', budget: 1000000, actualCost: 1000000, paid: 600000, dueDate: getPastDate(10), status: 'Sebagian', fundSource: 'Tabungan Bersama', notes: 'PNBP Rp 600.000 sudah disetor ke bank via SIMKAH' }
    ];

    // 6. Guests (Demonstrates WhatsApp integration & table assignment)
    const g1 = generateId(), g2 = generateId(), g3 = generateId(), g4 = generateId(), g5 = generateId(), g6 = generateId(), g7 = generateId(), g8 = generateId(), g9 = generateId(), g10 = generateId();
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
        { id: generateId(), name: 'VIP 1 (Keluarga Inti)', capacity: 8, guests: ['Bpk. Dr. H. Bambang Susanto & Ibu', 'Prof. Dr. Ir. Hendra Gunawan & Istri'] },
        { id: generateId(), name: 'VIP 2 (Keluarga Inti)', capacity: 8, guests: ['Bpk. H. Rahmat Rahardjo & Keluarga'] },
        { id: generateId(), name: 'Meja 1 (Sahabat SMA)', capacity: 8, guests: ['Dr. Sisca Wijaya, Sp.A & Suami', 'Reza Pratama, S.E. & Pasangan'] },
        { id: generateId(), name: 'Meja 2 (Bridesmaid & Groomsmen)', capacity: 6, guests: ['Dimas Prasetyo (Groomsman)', 'Nadine Aurelia (Bridesmaid)'] },
        { id: generateId(), name: 'Meja 3 (Kolega Kantor)', capacity: 10, guests: [] }
    ];

    // 8. Gifts
    weddingData.gifts = [
        { id: generateId(), giver: 'Dr. Sisca Wijaya, Sp.A & Keluarga', type: 'Transfer', value: 'Rp 25.000.000', dateReceived: getPastDate(2), thankYouSent: true, thankYouDate: getPastDate(1), notes: 'Via BCA, ucapan selamat via WhatsApp' },
        { id: generateId(), giver: 'Keluarga Besar Bpk. H. Rahmat Rahardjo', type: 'Barang', value: 'Logam Mulia Emas Antam 25 Gram', dateReceived: getPastDate(10), thankYouSent: true, thankYouDate: getPastDate(8), notes: 'Kado pernikahan dari keluarga besar ayah Dimas' },
        { id: generateId(), giver: 'Rekan Divisi Brand Marketing & Tech', type: 'Barang', value: 'Dyson Airwrap Multi-Styler & Vacuum', dateReceived: getPastDate(1), thankYouSent: false, thankYouDate: '', notes: 'Hadiah patungan dikirim ke alamat rumah baru' }
    ];

    // 9. Wedding Party
    weddingData.weddingParty = [
        { id: generateId(), name: 'Dimas Prasetyo', role: 'Pendamping Pengantin Pria', contact: '081555667788', attire: 'Jas Dark Charcoal (Wong Hang) + Dasi Champagne', tasks: 'Membawa cincin kawin saat akad, koordinasi mobil pengantin & foto groomsmen', notes: 'Ukuran Jas: L (Fitting selesai)' },
        { id: generateId(), name: 'Nadine Aurelia', role: 'Pendamping Pengantin Wanita', contact: '081677889900', attire: 'Gaun Silk Lilac Sage + Corsage Mawar Putih', tasks: 'Memegang hand bouquet pengantin, merapikan train gaun, koordinasi ruang rias', notes: 'Ukuran Gaun: M (Sudah diambil)' },
        { id: generateId(), name: 'Bpk. Dr. H. Bambang Susanto, M.M.', role: 'Wali Nikah', contact: '081122334455', attire: 'Beskap Tradisional Jawa Solo Modern + Blangkon', tasks: 'Mengikrarkan ijab qabul di depan penghulu KUA', notes: 'Ayah kandung Nabila' },
        { id: generateId(), name: 'Prof. Dr. Ir. Hendra Gunawan', role: 'Saksi', contact: '081388990011', attire: 'Jas Formal Gelap + Peci Hitam', tasks: 'Menandatangani buku nikah sebagai saksi pihak pria', notes: 'Paman dari pihak ayah Dimas' },
        { id: generateId(), name: 'Raffi & Rayyan', role: 'Pembawa Cincin', contact: '081244556677 (Ibu Yuni)', attire: 'Setelan Jas Mini Tuxedo', tasks: 'Membawa kotak cincin ukir akrilik saat prosesi cincin', notes: 'Keponakan pengantin wanita (usia 6 tahun)' }
    ];

    // 10. Packing List
    weddingData.packing = [
        { id: generateId(), name: 'Buku Nikah Asli (2 Buku) & Map Dokumen KUA', category: 'Akad', quantity: 2, carrier: 'Mbak Rina Wijaya', destination: 'Meja Akad Nikah Ballroom', packed: true, notes: 'Diserahkan oleh penghulu selesai ijab qabul' },
        { id: generateId(), name: 'Kotak Cincin Kawin & Perhiasan Mahar', category: 'Akad', quantity: 1, carrier: 'Dimas Prasetyo', destination: 'Meja Akad', packed: true, notes: 'Disimpan di safety box kamar suite' },
        { id: generateId(), name: 'Uang Mahar Pigura & Logam Mulia Antam', category: 'Akad', quantity: 1, carrier: 'Bapak Surya Atmaja', destination: 'Meja Akad', packed: true, notes: 'Dicek keaslian sertifikat Antam' },
        { id: generateId(), name: 'Gaun Resepsi Modern & Veil Pengantin', category: 'Resepsi', quantity: 1, carrier: 'Nabila Safira Anindya', destination: 'Ruang Rias VIP Suite', packed: false, notes: 'Sudah di-steam oleh butik' },
        { id: generateId(), name: 'Tuxedo Pria & Sepatu Pantofel Bespoke', category: 'Resepsi', quantity: 1, carrier: 'Dimas Arya Pratama', destination: 'Kamar Suite 1202', packed: false, notes: 'Beserta dasi kupu-kupu & cufflinks' },
        { id: generateId(), name: 'Kotak Angpao Gembok & Kunci Cadangan', category: 'Resepsi', quantity: 2, carrier: 'Ibu Hj. Yuni Astuti', destination: 'Meja Penerima Tamu Foyer', packed: true, notes: 'Kunci dipegang Ibu Yuni & Tante Tari' },
        { id: generateId(), name: 'Buku Tamu Resepsi & Spidol Emas', category: 'Resepsi', quantity: 4, carrier: 'Mbak Rina Wijaya', destination: 'Meja Penerima Tamu', packed: true, notes: 'Beserta lembar absensi cetak backup' },
        { id: generateId(), name: 'Souvenir Reed Diffuser (500 Box)', category: 'Vendor', quantity: 500, carrier: 'Kencana Luxury Souvenir', destination: 'Gudang Logistik Ballroom', packed: true, notes: 'Tiba di venue H-1 sore' },
        { id: generateId(), name: 'Seserahan & Hantaran Pengantin (11 Box)', category: 'Akad', quantity: 11, carrier: 'Keluarga Pengantin Pria', destination: 'Holding Room Akad', packed: true, notes: 'Box akrilik berpita satin champagne' },
        { id: generateId(), name: 'Emergency Kit & Obat-obatan Pribadi', category: 'Lainnya', quantity: 1, carrier: 'Nadine Aurelia', destination: 'Ruang Rias Pengantin', packed: true, notes: 'Minyak kayu putih, tolak angin, plester kaki, permen' }
    ];

    // 11. Events (Save the date)
    weddingData.events = [
        { id: generateId(), name: 'Lamaran & Pertemuan Keluarga', date: getPastDate(90), time: '10:00', location: 'Plataran Menteng, Jakarta Pusat', notes: 'Tukar cincin tunangan, penyerahan hantaran buah & kue. Dresscode batik.' },
        { id: generateId(), name: 'Foto Prewedding Studio & Outdoor', date: getPastDate(45), time: '06:00', location: 'Kebun Raya Bogor & Studio Lumina', notes: 'Tema formal modern & kasual outdoor.' },
        { id: generateId(), name: 'Pengajian Pranikah & Siraman', date: sampleFutureDate(72), time: '09:00', location: 'Kediaman Keluarga Anindya, Bintaro', notes: 'Doa bersama 100 tamu, pembagian buku pengajian & souvenir sajadah.' },
        { id: generateId(), name: 'Akad Nikah Adat & Syukuran', date: wedDate, time: '08:00', location: 'Grand Ballroom Section A, Hotel Mulia', notes: 'Ijab qabul dengan busana adat Jawa Solo modern, dilanjutkan prosesi panggih.' },
        { id: generateId(), name: 'Resepsi Pernikahan (Grand Wedding)', date: wedDate, time: '19:00', location: 'Grand Ballroom Hotel Mulia Senayan', notes: 'Resepsi modern internasional dengan 500 tamu undangan.' }
    ];

    // 12. Rundown (Cross-linked to Contacts & Vendors)
    weddingData.rundown = [
        { id: generateId(), activity: 'Make Up & Rias Pengantin Wanita', startTime: '04:30', endTime: '07:00', location: 'Ruang Rias Suite 1201', pic: 'Mbak Rina Wijaya', vendor: 'Bennu Sorumba Makeup', notes: 'Nabila dan kedua Ibu pengantin. Sarapan ringan disediakan hotel.', date: wedDate },
        { id: generateId(), activity: 'Persiapan & Fitting Jas Pengantin Pria', startTime: '06:00', endTime: '07:00', location: 'Kamar Suite 1202', pic: 'Dimas Prasetyo', vendor: 'Wong Hang Distinguished Tailor', notes: 'Groomsmen standby membantu persiapan.', date: wedDate },
        { id: generateId(), activity: 'Briefing Final Seluruh Vendor & Kru', startTime: '07:00', endTime: '07:30', location: 'Ballroom Foyer', pic: 'Mbak Rina Wijaya', vendor: 'The Signature Wedding Organizer', notes: 'Cek kesiapan sound system, display foto, catering, dan meja KUA.', date: wedDate },
        { id: generateId(), activity: 'Prosesi Akad Nikah & Ijab Qabul', startTime: '08:00', endTime: '09:30', location: 'Area Akad Ballroom', pic: 'Ust. Ahmad Fauzi (KUA Tanah Abang)', vendor: 'KUA Kecamatan Tanah Abang', notes: "Khitbah, pembacaan ayat suci Al-Qur'an, ijab qabul, doa, dan penyerahan buku nikah.", date: wedDate },
        { id: generateId(), activity: 'Sesi Foto Keluarga Inti & Mahar', startTime: '09:30', endTime: '10:30', location: 'Pelaminan Akad', pic: 'Mbak Rina Wijaya', vendor: 'Lumina Pictures', notes: 'Daftar nama keluarga inti dipandu oleh WO.', date: wedDate },
        { id: generateId(), activity: 'Istirahat, Makan Siang & Retouch Busana Resepsi', startTime: '11:00', endTime: '16:00', location: 'Suite Room Hotel Mulia', pic: 'Ibu Hj. Yuni Astuti', vendor: 'Bennu Sorumba Makeup', notes: 'Pengantin istirahat tidur siang. Makan siang diantarkan room service.', date: wedDate },
        { id: generateId(), activity: 'Gladi Bersih Grand Entrance & Soundcheck Band', startTime: '16:30', endTime: '17:30', location: 'Main Ballroom', pic: 'Mbak Rina Wijaya', vendor: 'Lala Entertainment & Orchestra', notes: 'Pengantin, orang tua, bridesmaid & groomsman ikut gladi posisi jalan.', date: wedDate },
        { id: generateId(), activity: 'Open Gate & Registrasi Tamu Resepsi', startTime: '18:30', endTime: '19:00', location: 'Foyer Meja Penerima Tamu', pic: 'Ibu Hj. Yuni Astuti', vendor: 'The Signature Wedding Organizer', notes: 'Meja penerima tamu aktif, pengisian buku tamu & pembagian souvenir.', date: wedDate },
        { id: generateId(), activity: 'Grand Entrance Pengantin & Keluarga', startTime: '19:00', endTime: '19:20', location: 'Main Ballroom & Pelaminan', pic: 'Mbak Rina Wijaya', vendor: 'Lala Entertainment & Orchestra', notes: 'Lagu grand entrance: A Thousand Years dibawakan orkestra chamber.', date: wedDate },
        { id: generateId(), activity: 'Sambutan, Doa Restu & Ramah Tamah (Dinner)', startTime: '19:20', endTime: '21:00', location: 'Main Ballroom', pic: 'Bapak Surya Atmaja', vendor: 'Puspa Catering Services', notes: 'Buffet dan seluruh food stall dibuka. Tamu VIP bersalaman di pelaminan.', date: wedDate },
        { id: generateId(), activity: 'Lempar Hand Bouquet & After Party Mingle', startTime: '21:00', endTime: '22:30', location: 'Dance Floor Ballroom', pic: 'Dimas Prasetyo', vendor: 'Lala Entertainment & Orchestra', notes: 'Pengantin berganti gaun pesta ringan, foto bersama teman-teman.', date: wedDate }
    ];

    // 13. Food & Drinks
    weddingData.foodDrinks = [
        { id: generateId(), name: 'Kambing Guling Muda & Lontong', category: 'Stall', vendor: 'Puspa Catering Services', price: 65000, quantity: 400, notes: 'Menu favorit tamu, sajikan lengkap dengan kecap rawit & acar timun', selected: true },
        { id: generateId(), name: 'Salmon En Croute with Creamy Dill Sauce', category: 'Stall', vendor: 'Puspa Catering Services', price: 85000, quantity: 250, notes: 'Kulit pastry renyah, saus disajikan hangat', selected: true },
        { id: generateId(), name: 'Zuppa Soup Creamy Chicken & Mushroom', category: 'Appetizer', vendor: 'Puspa Catering Services', price: 35000, quantity: 500, notes: 'Disajikan langsung dari oven pemanas di stall', selected: true },
        { id: generateId(), name: 'Sate Ayam Madura & Lontong', category: 'Stall', vendor: 'Puspa Catering Services', price: 45000, quantity: 400, notes: 'Daging empuk tanpa lemak, bumbu kacang medok', selected: true },
        { id: generateId(), name: 'Nasi Pandan Wangi & Beef Teriyaki', category: 'Main Course', vendor: 'Puspa Catering Services', price: 55000, quantity: 500, notes: 'Menu buffet utama, daging sapi empuk saus teriyaki gurih', selected: true },
        { id: generateId(), name: 'Es Puter Kelapa Kopyor & Durian', category: 'Dessert', vendor: 'Puspa Catering Services', price: 25000, quantity: 400, notes: 'Disajikan di gelas kaca mini dengan topping nangka & ketan hitam', selected: true },
        { id: generateId(), name: 'Wedding Cake 5 Tier Floral Cascading', category: 'Wedding Cake', vendor: 'Le Novelle Cake', price: 15000000, quantity: 1, notes: 'Kue dekoratif 5 tingkat dengan bunga gula edible, tingkat dasar rasa Chocolate Fudge', selected: true }
    ];

    // 14. Photos Checklist
    weddingData.photos = [
        { id: generateId(), shot: 'Detail Cincin Kawin di atas Mahar Akrilik & Undangan', category: 'Detail', priority: 'Tinggi', time: '05:30', location: 'Kamar Pengantin', notes: 'Komposisi flat-lay bersama parfum & sepatu', completed: false },
        { id: generateId(), shot: 'Proses Pemasangan Veil & Riasan Final Nabila', category: 'Persiapan Pengantin', priority: 'Tinggi', time: '06:30', location: 'Ruang Rias Suite', notes: 'Close-up mata dan senyuman pengantin wanita', completed: false },
        { id: generateId(), shot: 'First Look: Reaksi Dimas pertama kali melihat Nabila berbusana pengantin', category: 'Couple', priority: 'Sangat Tinggi', time: '07:15', location: 'Lobby Lounge Mulia', notes: 'Momen sangat emosional, kamera video dan foto stand by candid', completed: false },
        { id: generateId(), shot: 'Momen Ijab Qabul: Jabat Tangan Wali & Pengantin Pria', category: 'Akad', priority: 'Sangat Tinggi', time: '08:15', location: 'Meja Akad Ballroom', notes: 'Fokus ekspresi wajah Dimas & Ayah Nabila saat ijab', completed: false },
        { id: generateId(), shot: 'Pamer Buku Nikah & Cincin Kawin Bersama', category: 'Akad', priority: 'Sangat Tinggi', time: '09:00', location: 'Pelaminan Akad', notes: 'Pose resmi untuk album cetak', completed: false },
        { id: generateId(), shot: 'Sungkeman: Pelukan Haru Pengantin dengan Orang Tua', category: 'Candid', priority: 'Sangat Tinggi', time: '09:15', location: 'Area Pelaminan', notes: 'Tangkap air mata bahagia dan pelukan erat', completed: false },
        { id: generateId(), shot: 'Pose Kompak Bridesmaid & Groomsmen Melempar Bunga', category: 'Bridesmaid/Groomsman', priority: 'Sedang', time: '10:15', location: 'Taman Kaca Foyer', notes: 'Gaya bebas ceria penuh tawa', completed: false },
        { id: generateId(), shot: 'Grand Entrance di bawah Chandelier Lampu Gantung', category: 'Resepsi', priority: 'Tinggi', time: '19:05', location: 'Main Ballroom', notes: 'Sudut pandang simetris dari belakang tamu menghadap pelaminan', completed: false },
        { id: generateId(), shot: 'Foto Khusus Bersama Kakek & Nenek di Kursi Roda', category: 'Special Request', priority: 'Sangat Tinggi', time: '19:45', location: 'Samping Pelaminan VIP', notes: 'Prioritas utama agar kakek nenek tidak lelah menunggu', completed: false }
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
            { id: generateId(), date: sampleFutureDate(78), time: '08:00', activity: 'Penerbangan Singapore Airlines CGK-SIN-MLE', location: 'Bandara Soekarno-Hatta (CGK) Terminal 3', cost: 14000000, notes: 'Bawa paspor, tiket PP, dan sertifikat pernikahan' },
            { id: generateId(), date: sampleFutureDate(78), time: '16:00', activity: 'Transfer Seaplane ke Resort Water Villa', location: 'Male Seaplane Terminal', cost: 6000000, notes: 'Pemandangan atol spektakuler dari udara' },
            { id: generateId(), date: sampleFutureDate(78), time: '18:00', activity: 'Check-in Sunset Ocean Villa with Private Pool', location: 'Ayada Maldives Resort', cost: 0, notes: 'Welcome drink kelapa muda & honeymoon cake complimentary' },
            { id: generateId(), date: sampleFutureDate(79), time: '08:30', activity: 'Floating Breakfast di Kolam Renang Pribadi', location: 'Private Villa Pool', cost: 1500000, notes: 'Momen foto estetik pagi hari' },
            { id: generateId(), date: sampleFutureDate(80), time: '10:00', activity: 'Snorkeling Trip Bersama Penyu & Manta Ray', location: 'House Reef Ayada', cost: 2500000, notes: 'Perlengkapan snorkeling disediakan dive center' },
            { id: generateId(), date: sampleFutureDate(81), time: '19:00', activity: 'Romantic Private Candlelight Dinner di Tepi Pantai', location: 'Beachfront Gazebo', cost: 4000000, notes: 'Set menu 4 course seafood, dekorasi lilin & obor romantis' },
            { id: generateId(), date: sampleFutureDate(82), time: '14:00', activity: 'Couples Spa Massage Aromatherapy', location: 'The Secret Garden AySpa', cost: 3000000, notes: 'Perawatan relaksasi 90 menit' },
            { id: generateId(), date: sampleFutureDate(84), time: '13:00', activity: 'Penerbangan Pulang Menuju Jakarta', location: 'Velana International Airport (MLE)', cost: 14000000, notes: 'Transit di Changi Singapore belanja oleh-oleh' }
        ],
        bookings: {
            flights: [],
            hotels: [],
            transport: [],
            activities: [],
            restaurants: []
        },
        expenses: [
            { id: generateId(), date: getPastDate(10), category: 'Penerbangan', description: 'Tiket Pesawat Singapore Airlines CGK-MLE PP (2 Pax)', amount: 28000000 },
            { id: generateId(), date: getPastDate(5), category: 'Hotel', description: 'DP 50% Ayada Maldives Resort (5 Hari 4 Malam)', amount: 15000000 },
            { id: generateId(), date: getPastDate(2), category: 'Belanja', description: 'Koper Rimowa Cabin & Perlengkapan Pantai', amount: 5500000 }
        ]
    };

    // 16. KUA Checklist
    const kuaChecklist = JSON.parse(JSON.stringify(KUA_CHECKLIST));
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
        { id: generateId(), period: '12plus', task: 'Tentukan Tanggal & Konsep Pernikahan', deadline: getPastDate(60), assignee: 'Dimas & Nabila', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: true, notes: 'Konsep adat Jawa Solo & modern' },
        { id: generateId(), period: '12plus', task: 'Booking Grand Ballroom Hotel Mulia', deadline: getPastDate(45), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Venue', completed: true, notes: 'DP 50% lunas' },
        { id: generateId(), period: '6to12', task: 'Pilih & Kontrak Wedding Organizer (The Signature)', deadline: getPastDate(35), assignee: 'Nabila', priority: 'Tinggi', category: 'Vendor', completed: true, notes: 'Full planning 12 crew' },
        { id: generateId(), period: '6to12', task: 'Food Tasting & Finalisasi Menu Puspa Catering', deadline: getPastDate(15), assignee: 'Keluarga Besar', priority: 'Tinggi', category: 'Vendor', completed: true, notes: 'Kambing guling & salmon di-acc' },
        { id: generateId(), period: '3to6', task: 'Fitting Pertama Jas Wong Hang & Gaun Resepsi', deadline: getPastDate(10), assignee: 'Dimas & Nabila', priority: 'Tinggi', category: 'Busana', completed: true, notes: 'Fitting kedua dijadwalkan' },
        { id: generateId(), period: '3to6', task: 'Daftar Online SIMKAH & Lengkapi Berkas KUA', deadline: sampleFutureDate(10), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: false, notes: 'Verifikasi berkas fisik ke KUA Tanah Abang' },
        { id: generateId(), period: '1to3', task: 'Distribusi Undangan Fisik & Kirim WhatsApp', deadline: sampleFutureDate(25), assignee: 'Nabila & Tim WO', priority: 'Tinggi', category: 'Undangan', completed: false, notes: 'Gunakan fitur 1-klik WA di aplikasi' },
        { id: generateId(), period: '1to3', task: 'Beli Cincin Kawin & Perhiasan Mahar', deadline: sampleFutureDate(35), assignee: 'Dimas', priority: 'Sangat Tinggi', category: 'Perencanaan', completed: false, notes: 'Frank & Co Plaza Indonesia' },
        { id: generateId(), period: '2to4weeks', task: 'Final Technical Meeting (TM) Seluruh Vendor di Venue', deadline: sampleFutureDate(60), assignee: 'Dimas, Nabila & WO', priority: 'Sangat Tinggi', category: 'Vendor', completed: false, notes: 'Hotel Mulia Senayan' },
        { id: generateId(), period: '1week', task: 'Pengajian Pranikah & Siraman di Rumah', deadline: sampleFutureDate(72), assignee: 'Keluarga Nabila', priority: 'Tinggi', category: 'Acara', completed: false, notes: 'Bintaro' },
        { id: generateId(), period: 'dayof', task: 'Hari H: Akad Nikah & Resepsi Pernikahan', deadline: wedDate, assignee: 'Dimas & Nabila', priority: 'Sangat Tinggi', category: 'Acara', completed: false, notes: 'Grand Ballroom Hotel Mulia' },
        { id: generateId(), period: 'after', task: 'Keberangkatan Honeymoon ke Maldives', deadline: sampleFutureDate(78), assignee: 'Dimas & Nabila', priority: 'Sedang', category: 'Perencanaan', completed: false, notes: 'Singapore Airlines' }
    ];

    return customizeSampleData(enrichSampleData(weddingData), scenario);
}

function getFutureDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
}

function getPastDate(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
}

// ========================================
// THEME MANAGEMENT
// ========================================
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ?'light' : 'dark';
    document.body.classList.add('theme-changing');
    html.setAttribute('data-theme', newTheme);
    setTimeout(() => document.body.classList.remove('theme-changing'), motionDuration('base'));
    localStorage.setItem('wp_theme', newTheme);
    updateThemeIcon();
    showToast(newTheme === 'dark' ?'Mode gelap diaktifkan' : 'Mode terang diaktifkan', 'info');
}

function updateThemeIcon() {
    const btn = document.getElementById('themeToggleBtn');
    if(!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
    ?`${ICONS.sun} Light Mode`
    : `${ICONS.moon} Dark Mode`;
}

// Keep keyboard navigation within the active dialog, including swapped dialogs.
document.addEventListener('keydown', event => {
    const overlay = document.getElementById('modalOverlay');
    if (event.key !== 'Tab' || !overlay?.classList.contains('active')) return;
    const modal = document.getElementById('modal');
    const controls = [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
    .filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (!first) { event.preventDefault(); modal.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
    }
});

// ========================================
// APPLICATION BOOTSTRAP
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    try {
        initStaticIcons();
        loadData();

        if (!weddingData) {
            weddingData = getDefaultData();
        }

        if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
        currentPage = getInitialPage();
        rememberCurrentPage();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        renderApp();
        initMobileMenu();
        initSidebarScrollPersistence();
        updateSidebarCountdown();
        checkCountdownReminders();
        updateThemeIcon();
        initGridObserver();
        initListWheelScroll();
        initListInteractions();
        window.addEventListener('resize', debounce(() => balanceAllGrids(), 100));

        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

    } catch(error) {
        console.error('Initialization error:', error);
        console.error('Error stack:', error.stack);
        const main = document.getElementById('mainContent');
        if (main) {
            main.innerHTML = '<div class="page"><div class="empty-state empty-state--canvas"><div class="empty-state-icon">' + (window.ICONS ? ICONS.warningSmall : '⚠️') + '</div><div class="empty-state-title">Terjadi kesalahan</div><div class="empty-state-text">Detail: ' + (error.message ||'Unknown error') + '</div><button class="btn btn-primary" onclick="location.reload()">Muat Ulang</button></div></div>';
        }
    }
});
