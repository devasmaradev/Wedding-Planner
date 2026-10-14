# Wedding Planner App

Aplikasi Wedding Planner offline-first berbasis web (HTML, CSS, JavaScript) tanpa backend. Data perencanaan disimpan secara lokal di browser (localStorage), sehingga data perencanaan tetap berada pada perangkat yang digunakan.

## Fitur Utama

- **Dashboard Interaktif**: Ringkasan persiapan, target anggaran vs realisasi, dan countdown hari H.
- **Manajemen Tamu & RSVP**: Kelola daftar tamu, kategori undangan, dan status kehadiran.
- **Budget & Keuangan**: Lacak target anggaran, pencatatan biaya riil, dan status pembayaran.
- **Timeline & Rundown**: Rencanakan tugas bulanan dan rundown acara di hari H.
- **Vendor & Checklist KUA**: Lacak status vendor pilihan Anda dan persyaratan administrasi KUA.
- **Tema**: Light mode sebagai bawaan; pilihan tema pengguna tetap disimpan.
- **Print / PDF Export**: Setiap halaman dapat dicetak atau disimpan sebagai PDF dengan tampilan yang sudah dioptimasi (@media print).
- **Unified Design System**: Arsitektur visual berbasis token semantik untuk warna, tipografi, jarak, elevasi, layering dan motion; styling dinamis mengikuti data melalui CSS custom properties.

## Cara Penggunaan

1. Unduh atau clone repositori ini.
2. Buka file `index.html` menggunakan browser modern (Chrome, Firefox, Safari, Edge).
3. Isi nama pengantin dan tanggal pernikahan di halaman **Pengaturan**, lalu tekan **Simpan Pengaturan**.
4. Form tambah/edit menyimpan data setelah tombol **Simpan** ditekan; aksi langsung seperti checklist menyimpan perubahan saat dijalankan. Data tersimpan di browser pada perangkat yang digunakan.

## Daftar isi

- [Penggunaan dan data](#penggunaan-dan-data)
- [Arsitektur aplikasi](#arsitektur-aplikasi)
- [Design system](#design-system)
- [Kondisi dan batas implementasi](#kondisi-dan-batas-implementasi-saat-ini)
- [Panduan optimasi](#panduan-optimasi)
- [Verifikasi perubahan](#verifikasi-perubahan)
- [Catatan perubahan](#catatan-perubahan)

## Penggunaan dan data

Aplikasi dapat dibuka langsung melalui `index.html` tanpa instalasi atau build. Data disimpan dalam localStorage browser; browser, profil, atau perangkat lain mempunyai penyimpanan sendiri. Menghapus data situs dapat menghapus data perencanaan. Gunakan **Backup & Data** untuk export JSON dan import pemulihan.

Pengaturan memakai draft: perubahan field, Tag, Peran, dan Sumber Dana baru diterapkan setelah **Simpan Pengaturan** ditekan. Berpindah menu membatalkan draft yang belum disimpan dan menampilkan pemberitahuan. Refresh juga tidak menyimpan draft tersebut.

Akses baru dimulai dari dashboard. Refresh/hard refresh memulihkan menu aktif dan posisi scroll sidebar dari sessionStorage tab yang sama; scroll konten utama kembali ke atas. Scroll sidebar disimpan melalui listener pasif dan pagehide, dipulihkan setelah layout/font siap, dan dibatasi rentang scroll yang tersedia. Interaksi pengguna membatalkan pemulihan tertunda agar tidak menarik scroll kembali. Akses baru memulai sidebar dari atas. Menu tersimpan yang tidak valid atau storage yang tidak tersedia kembali ke dashboard. Navigasi antar menu tetap berjalan selama aplikasi digunakan. Tema bawaan adalah light, termasuk ketika perangkat memakai dark mode; pilihan tema yang disimpan pengguna tetap dihormati.

Fitur cetak tersedia untuk halaman aplikasi dan buku tamu resepsi. Browser dapat menyimpan hasilnya sebagai PDF. Font Google merupakan aset opsional dari jaringan; fallback font sistem tetap tersedia ketika offline.

### Data contoh dan pengujian

Seluruh skenario memakai fixture simulasi yang diperbarui pada 14 Oktober 2026. Kategori sesuai opsi form, vendor yang dirujuk oleh anggaran/menu/rundown tersedia, PIC memiliki kontak, tag/peran tersedia di pengaturan, dan penempatan tamu konsisten dengan seating. Kontak memakai nomor contoh serta email/domain example.com; harga, nama layanan, dan fasilitas bukan penawaran resmi.

Skenario normal menyediakan 16 vendor, 27 kontak, 10 rombongan tamu, alternatif venue indoor/outdoor, menu minuman/vegetarian, biaya kue, status foto/packing campuran, serta itinerary dan pengeluaran honeymoon yang lengkap. Ini subset simulasi dari target tamu, bukan daftar seluruh undangan. Daftar panjang memperluas semua modul, termasuk kontak, tamu, venue, menu, packing, foto, wedding party, hadiah, seating, honeymoon, dan KUA. Skenario kosong tetap kosong dan tanggal belum diatur tetap menguji profil kosong; peringatan/selesai mempertahankan kondisi khususnya. Catatan kosong pada sebagian checklist tetap disengaja untuk pengujian alignment.


Buka **Backup & Data → Isi Data** untuk memilih salah satu dari 11 skenario: kosong, belum diatur, normal, peringatan, H-30, H-7, H-1, hari pernikahan, setelah pernikahan, selesai, dan daftar panjang. Skenario mencakup judul checklist dengan/tanpa catatan, variasi RSVP/vendor/pembayaran, anggaran berlebih, tugas terlambat, seating penuh, countdown, dan daftar yang perlu discroll.

**Gunakan skenario** meminta konfirmasi sebelum mengganti seluruh data lokal dan mereset penanda backup untuk pengujian pengingat backup. Export backup data pribadi terlebih dahulu. **Export JSON untuk import** hanya mengunduh fixture pilihan tanpa mengganti data aktif; file dapat diuji melalui import yang sudah tersedia.

Tombol **Uji Pop-up** membuka dialog tambah, edit, detail, penempatan tamu, atau konfirmasi hapus yang tersedia pada modul pilihan. Edit/detail/hapus memerlukan data pada modul tersebut. Membuka dialog tidak menyimpan perubahan; tombol simpan atau konfirmasi hapus di dalam dialog tetap menjalankan tindakan asli aplikasi. Gunakan data contoh untuk pengujian. Skenario mempermudah pemeriksaan kondisi utama, tetapi bukan jaminan mencakup setiap kombinasi interaksi.

## Arsitektur aplikasi

README.md adalah satu-satunya dokumentasi aplikasi. Gabungkan panduan, aturan, dan catatan pekerjaan baru ke bagian yang relevan di file ini; jangan membuat Markdown aplikasi terpisah.

### Struktur file

| File | Tanggung jawab |
| --- | --- |
| `index.html` | Shell aplikasi, font, tema awal, container, serta pemuatan CSS/JS |
| `style.css` | Token, komponen, utilitas, tema, responsivitas, motion, dan print |
| `script.js` | Konfigurasi, state, storage, registry ikon, renderer, event, dan CRUD |
| `README.md` | Penggunaan, arsitektur, kontrak desain, prompt optimasi, dan riwayat verifikasi |

Pertahankan arsitektur **zero-build dengan tiga file runtime**. Jangan menambahkan framework, bundler, compiler, dependensi runtime, modul terpisah, atau `@import` CSS sebagai bagian dari perapihan. Ikon SVG UI disimpan dalam registry `ICONS`; grafik countdown merupakan SVG data, sementara handle show/hide sidebar memakai karakter tiga titik vertikal sebagai penanda teks.

### Modul dan navigasi

Terdapat 19 halaman yang dikelompokkan oleh `NAV_SECTIONS`; `NAV_ITEMS`, `PAGE_RENDERERS`, dan `PAGE_INITIALIZERS` mengatur navigasi serta dispatch.

| Seksi | Modul |
| --- | --- |
| Utama | Dashboard, kalender |
| Perencanaan & Anggaran | Anggaran, KUA, timeline, acara |
| Vendor & Tempat | Venue, vendor, makanan/minuman, packing |
| Tamu & Acara | Tamu/RSVP, seating, wedding party, hadiah |
| Hari H & Pasca Acara | Rundown, foto, kontak, honeymoon |
| Sistem | Pengaturan; backup/import melalui modal |

### Kontrak data dan perilaku

- Pertahankan `STORAGE_KEY`, `DATA_VERSION`, skema data, format backup, aturan bisnis, dan kompatibilitas data yang sudah tersimpan.
- Pertahankan ID, `name`, `data-*`, ARIA, inline handler, dan binding renderer. Fungsi yang dipanggil oleh markup harus tetap tersedia.
- Sinkronisasi tamu dengan seating, vendor terpilih dengan anggaran, serta hubungan rundown dengan PIC/vendor harus tetap berjalan.
- Pertahankan quick actions dashboard, peringatan anggaran/KUA/backup, tautan WhatsApp, dan kolom cetak buku tamu.
- Formatter tanggal dipakai ulang; formatter currency dicache per kode. Listener pengaturan memakai WeakSet agar elemen yang sama tidak mendapat listener berulang.
- Gunakan fixture terisolasi untuk pengujian; jangan menimpa atau menghapus data pengguna.

## Design system

Definisi nilai aktual berada dalam `style.css`. Gunakan token dan kelas semantik yang sudah ada; jangan membuat nilai visual baru saat melakukan optimasi. Tema berada pada `:root` dan `:root[data-theme=dark]`.

### Warna semantik

| Peran | Token |
| --- | --- |
| Background/surface | `--bg`, `--bg-warm`, `--bg-soft`, `--surface`, `--surface-2` |
| Brand/aksen | `--primary*`, `--rose*`, `--sage*`, `--gold*` |
| Teks | `--ink`, `--ink-2`, `--ink-3`, `--ink-4`; `--ink-5` untuk detail dekoratif/scrollbar |
| Garis | `--line`, `--line-soft` |
| Status | `--success*`, `--warning*`, `--danger*`, `--info*`; alias `--ok*`, `--warn*`, `--bad*` |
| Tombol berisi | `--action-*`, `--on-brand`, `--on-status` |
| Hero/overlay/cetak | `--hero-*`, `--overlay-*`, `--glass-*`, `--paper*` |

Pisahkan warna teks status dari warna tombol berisi. Warna literal berada dalam deklarasi token CSS; favicon merupakan aset data URI mandiri. Jangan menulis hex/rgba langsung dalam renderer JavaScript. Target keterbacaan teks adalah WCAG AA; perubahan warna memerlukan pemeriksaan kontras, termasuk tema dan compositing browser. Angka tanggal di luar bulan memakai token ink-4 tanpa opacity tambahan; kontras terhadap surface-2 sekitar 5,54:1 pada light dan 6,81:1 pada dark. Perhitungan token ini tidak menggantikan pemeriksaan seluruh tampilan browser.

### Tipografi dan angka

Format tanggal umum mempertahankan locale id-ID dengan hari numeric, seperti 1 Okt 2026 atau 1 Oktober 2026. Penyesuaian tampilan difokuskan pada kalender: angka memakai font angka, line-height 1, tabular numerals, kotak persegi maksimum 32px yang menyusut sesuai ruang, dan penanda acara di bawah sel. Tanggal hari ini mewarisi geometri yang sama dengan tanggal lainnya.


- Font: `--f-display`, `--f-body`, `--f-number`, dan `--f-mono`.
- Skala ukuran: `--text-2xs`, `--text-xs`, `--text-caption`, `--text-sm`, `--text-base`, `--text-body`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl` hingga `--text-5xl`, `--text-display`, dan `--text-counter`. Print memakai `--text-print`/`--text-print-small`.
- Line height: `--lh-none` (1), `--lh-tight` (1.2), `--lh-snug` (1.35), `--lh-normal` (1.5), dan `--lh-relaxed` (1.65).
- Angka memakai `font-variant-numeric: tabular-nums`, diwariskan dari body untuk nominal, statistik, tanggal, dan waktu.

### Spasi, radius, dan elevasi

Ritme jarak aktif memakai **8px, 16px, 24px, dan 32px sesuai peran**. Desktop/tablet memakai aturan dasar; mobile mengikuti breakpoint maksimal 768px.

| Peran | Token | Desktop/tablet >768px | Mobile ≤768px |
| --- | --- | --- | --- |
| Ikon–teks dan elemen yang berdekatan | `--inline-gap` | 8px | 8px |
| Kelompok isi dan field yang berkaitan | `--stack-gap` | 16px | 16px |
| Antarkartu dan section utama | `--section-gap` | 24px | 16px |
| Padding internal panel | `--panel-padding` | 24px | 16px |
| Padding horizontal tepi halaman | `--page-padding` | 32px | 16px |

Aturan penerapan:

- Gunakan **padding** untuk ruang internal, **margin** untuk jarak luar, dan **gap** untuk jarak antar anak Flex/Grid. Jangan menambahkan beberapa sumber jarak untuk sambungan yang sama.
- Grid KPI/dashboard/vendor memakai gap section; form row memakai gap kelompok isi. Header/footer dan komponen padat dapat memakai kombinasi spacing sesuai peran, bukan selalu padding panel pada semua sisi.
- `.welcome-panel` dan `.dashboard-hero` memakai padding panel. Jarak keduanya berasal dari margin bawah welcome panel sebesar gap section; margin atas hero yang langsung mengikutinya adalah 0. Pada mobile, hero yang berdiri sendiri tetap mengikuti aturan margin atas 0.
- Kontrol standar dan sel tabel memakai padding 8px vertikal/16px horizontal. Tombol besar, tombol ikon, dan komponen khusus mempertahankan varian sesuai perannya. Label–input dan hint memakai jarak 8px.
- Badge memakai padding horizontal 8px, gap ikon 8px, dan tinggi minimum 24px. Area navigasi sidebar memakai padding 8px; collapse otomatis menjadi sidebar ringkas sudah diganti tombol show/hide eksplisit.
- Utilitas spacing tetap mengikuti skala aktif: level 1 memakai 8px, level 2 memakai 16px, dan level 3 memakai token panel/section yang menyesuaikan mobile. Jangan menyimpulkan nilainya dari nomor class tanpa memeriksa stylesheet.
- Nilai 0, auto, offset layout, dan alignment khusus tetap diperbolehkan. Padding atas halaman yang bernilai 0 dan offset sidebar/header merupakan aturan layout, bukan gap antar konten.
- Token skala lama tetap tersedia untuk dimensi non-spacing. Jangan mengubah ukuran ikon, border, tipografi, radius, atau geometri data hanya untuk mengikuti ritme jarak.

- Tinggi kontrol: `--control-height` (3rem) dan `--control-height-sm` (2.5rem). Pertahankan penyesuaian toolbar dan breakpoint yang sudah ada.
- Radius: `--r-xs` 4px, `--r-sm` 8px, `--r-md` 12px, `--r-lg` 16px, `--r-xl` 24px, `--r-2xl` 32px, `--r-full` untuk pill/avatar.
- Elevasi menggunakan `--sh-1` sampai `--sh-5`, token `--shadow-*`, dan `--blur-*` sesuai peran.
- Header/body/footer kartu dan modal, badges, tombol, form, tabel, empty state, serta scrollbar menggunakan kontrak komponen bersama. Nilai layout aktual dan override responsif tetap mengikuti stylesheet.

### Layering dan ikon

| Layer global | Token | Nilai |
| --- | --- | --- |
| Header | `--z-header` | 500 |
| Backdrop sidebar | `--z-sidebar-overlay` | 510 |
| Sidebar | `--z-sidebar` | 520 |
| Banner | `--z-banner` | 900 |
| Backdrop modal | `--z-modal-overlay` | 1000 |
| Dialog | `--z-modal` | 1050 |
| Loading | `--z-loading` | 1500 |
| Toast | `--z-toast` | 2000 |

`--z-local-*` digunakan untuk stacking internal komponen. Ikon memakai `ICONS`/`renderIcon`; placeholder `[data-icon]` pada shell HTML diisi oleh `initStaticIcons()` saat bootstrap. Role action 16px/stroke 2, navigasi/KPI 20px/stroke 1.75, dan empty state/dialog ilustratif 48px/stroke 1.75. Hindari definisi bentuk SVG berulang.

### Interaksi, aksesibilitas, dan motion

Ikon dan judul header sidebar dipusatkan horizontal dan vertikal sebagai satu kelompok flex dengan jarak 8px.


Dark Mode dan Backup & Data berada dalam daftar menu sidebar, setelah Pengaturan dan garis pemisah. sidebarActions dipertahankan ketika navigasi dirender ulang, sehingga ID, handler tombol, serta input import tetap sama. Kedua tombol mengikuti scroll sidebar.


Di layar, navigasi bulan kalender memakai grid tiga kolom: tombol 40px, judul fleksibel terpusat, tombol 40px. Area navigasi desktop maksimum 320px; mobile mengikuti lebar tersedia. Posisi tombol ditentukan container, bukan panjang teks nama bulan. Saat cetak, tombol dan spacer disembunyikan; navigasi memakai display block dengan lebar 100% agar judul bulan tetap terpusat tanpa kolom tombol kosong.


- Daftar dashboard memakai tinggi baris 68px dan batas viewport tetap `--dashboard-list-max-height` (306px). Daftar panjang menampilkan item berikutnya sebagian sebagai petunjuk, empat baris penuh dan setengah item kelima pada posisi awal (4.5 × 68px = 306px). Daftar pendek tidak memerlukan scroll, tetapi mempertahankan tinggi panel yang sama dengan kondisi kosong/panjang. Tinggi tidak berubah saat scroll; item terakhir dapat terlihat penuh di akhir. Ringkasan anggaran memakai tinggi area yang sama; cetak menampilkan seluruh isi.
- Sidebar memakai seluruh tinggi slot fleksibel tanpa menyesuaikan batas ke posisi item. Potongan menu mengikuti scroll secara natural, tanpa overlay gradasi di bawah. Saat ditutup, aside memakai inert dan aria-hidden=true; fokus di dalamnya dipindah ke handle pembuka desktop atau burger mobile. Saat dibuka kembali melalui toggle, inert dilepas dan fokus menuju tombol hide tanpa mengubah posisi scroll.
- Tanggal kalender beracara memiliki role button, tabindex=0, label tanggal/jumlah agenda, dan aria-haspopup=dialog. Enter atau Space membuka dialog yang sama dengan klik; repeat key diabaikan dan Space tidak menggulir halaman. Tanggal tanpa acara tidak ditambahkan ke urutan Tab; outline fokus berada di dalam sel agar tidak terpotong.
- Kolom `.form-control` memakai border utama berwarna primary saat fokus, tanpa shadow atau outline tambahan; kondisi invalid tetap memakai border danger. Pada forced colors, fokus kolom memakai border Highlight. Aturan ini berlaku pada input, select, textarea, pencarian, settings, dan dialog tambah/edit yang memakai kelas sama.
- Focus pada kontrol lain memakai outline `--focus-width` dan `--focus-offset` dengan warna `--primary`, sehingga tidak bergantung pada box-shadow. Jangan menggantinya dengan tint transparan saja.
- Disabled memakai opacity 0.5, cursor not-allowed, dan pointer-events none. Validation mendukung `aria-invalid`, `.is-invalid`, `:user-invalid`, dan `.form-error`.
- Modal memiliki role dialog, nama dari judul, fokus awal, loop Tab/Shift+Tab, dan pengembalian fokus. Toast mempunyai live region.
- Motion: `--duration-fast` 120ms, `--duration-base` 200ms, `--duration-slow` 260ms. Timer modal mengikuti `motionDuration()`; animasi dekoratif mempunyai token terpisah. Pertahankan reduced motion dan forced colors.

### Pengecualian runtime dan cetak

`index.html` tidak memakai inline style. Styling statis renderer berada dalam kelas CSS. Inline custom properties diperbolehkan untuk data runtime: `--progress-value`, `--progress-height`, `--progress-color`, dan `--item-color`. Mutasi `element.style` dipakai untuk filter, collapse, grid, scroll lock, tinggi viewport daftar, dan posisi/ukuran salinan dekoratif animasi. Animasi Web Animations API juga memakai nilai geometri runtime.

Breakpoint, minimum kolom/tabel, persentase, geometri SVG, border hairline, dan dimensi data merupakan batas layout yang disengaja; jangan menggantinya tanpa memeriksa perilaku. Buku tamu memakai stylesheet bersama melalui URL absolut dari `document.baseURI`, class `guestbook-print`, dan token paper. Parameter versinya mengikuti ASSET_VERSION pada script.js dan disamakan dengan referensi CSS/JS pada index.html. Output cetak tidak mengikuti warna tema gelap.

### Kondisi dan batas implementasi saat ini

Perbaikan runtime 14 Oktober 2026 menyelesaikan referensi cache buku tamu, preview setelah filter, overflow daftar pendek, scroll lock modal/sidebar, pembatalan animasi wheel oleh pointer/keyboard, dan kontras tanggal luar bulan.

- Preview dihitung saat render, reset, perubahan isi/visibilitas hasil filter, perubahan lebar, font siap, dan berakhirnya transisi display. Callback dibatch dengan requestAnimationFrame; perubahan tinggi panel sendiri tidak memicu loop pengukuran.
- Daftar kurang dari lima item memakai tinggi dasar dan bertambah jika isi melebihi area tersebut, sehingga catatan panjang tidak memerlukan scroll internal. Daftar lima item atau lebih tetap berhenti pada pertengahan item kelima di posisi awal.
- Scroll halaman terkunci selama modal aktif/menutup atau sidebar mobile terbuka. Perubahan breakpoint/status sidebar tidak membuka scroll selama modal masih aktif.
- Pointerdown, keydown, dan window blur membatalkan animasi wheel. Target scroll dibatasi ulang terhadap tinggi isi aktual setiap frame agar perubahan hasil filter tidak menyisakan animasi yang terus berjalan.
- Pengujian langsung Edge pada 14 Oktober 2026 mencakup akses baru (dashboard, light, sidebar tampil), hide sidebar, hard refresh menu Pengaturan dan posisi sidebar, tema dark/light, dialog Backup/skenario/konfirmasi dengan pembatalan dan Escape, tambah/simpan item anggaran di InPrivate, filter/Reset, detail dan pembukaan edit, navigasi bulan/Hari Ini, serta preview cetak kalender. Data di sesi utama tidak diganti. Banner KUA diverifikasi kembali pada data terisi; target anggaran kosong dan judul bulan pada preview cetak juga diperiksa setelah perbaikan. Responsivitas mobile, fokus keyboard menyeluruh, seluruh skenario/CRUD, dan ketepatan preview scroll 4.5 baris belum teruji langsung. Hasil ini tidak menjamin kesetaraan visual seluruh aplikasi.

Temuan browser yang diperbaiki: banner KUA membaca `checked` (sebelumnya properti `completed` yang tidak tersedia); ringkasan anggaran kosong menampilkan Rp 0 dengan penjagaan pembagi nol untuk persentase; layout navigasi kalender pada cetak tidak menyisakan kolom tombol tersembunyi sehingga judul bulan kembali terpusat. Versi aset HTML/JavaScript/buku tamu diselaraskan menjadi `20261014browser`.

## Panduan optimasi

Bagian ini adalah pedoman pekerjaan berikutnya, bukan klaim bahwa seluruh kode saat ini sudah tersusun atau bebas duplikasi. Aturan editable-list-row, body kartu data, tombol hide sidebar, dan fokus form sudah dirapikan untuk menghilangkan duplikasi/override yang tidak diperlukan. CSS tetap memakai override komponen, breakpoint, dan fallback yang diperlukan; urutan di bawah menjadi pedoman saat menyentuh blok terkait. Jangan menghapus atau mengurutkan ulang tanpa memeriksa cascade dan fallback.


Gunakan instruksi berikut untuk pekerjaan optimasi berikutnya. Ikuti kontrak arsitektur dan desain di atas; kondisi kode saat pekerjaan dimulai merupakan baseline utama.

### Peran dan tujuan

Kamu adalah Senior Frontend Engineer yang bertanggung jawab atas efisiensi, kebersihan, dan kemudahan pemeliharaan kode Wedding Planner. Lakukan seluruh tahap berikut secara berurutan dan menyeluruh, dengan mempertahankan seluruh fungsi dan pengalaman pengguna yang sudah berjalan.

### Persiapan: audit baseline

Sebelum mengubah kode:

1. Baca tiga file runtime dan README.md.
2. Petakan konfigurasi, state, helper, renderer, event listener, CRUD, penyimpanan, tema, serta fitur cetak dan backup.
3. Identifikasi duplikasi, fungsi tidak terpakai, listener berulang, perhitungan berulang, dan alokasi yang dapat dihindari.
4. Periksa referensi pada JavaScript, HTML, template string, inline handler, tabel dispatch, dan pemanggilan dinamis sebelum menyatakan kode tidak digunakan.
5. Simpan bukti baseline yang diperlukan untuk membandingkan perilaku, markup, dan stylesheet setelah perubahan. Gunakan data uji terisolasi; jangan menimpa data pengguna.

### 1. Optimasi dan efisiensi

- Sesuaikan seluruh script agar efektif, efisien, bersih, dan mudah dipelihara.
- Hilangkan kode redundan, duplikat, tidak terpakai, atau tidak diperlukan hanya setelah penggunaannya diperiksa.
- Terapkan praktik yang relevan dengan vanilla JavaScript dan CSS, tanpa mengubah hasil atau alur program.
- Utamakan pengurangan pekerjaan berulang: formatter, lookup, dispatch, perhitungan agregat, dan pemasangan listener.
- Cache hanya jika ketergantungan dan invalidasinya jelas. Jangan menyimpan hasil yang dapat menjadi usang ketika data, tema, halaman, atau pengaturan berubah.
- Pastikan elemen baru setelah render ulang tetap mendapatkan event listener yang diperlukan.
- Jangan menghapus fungsi karena hanya terlihat sekali di pencarian: fungsi tersebut mungkin dipanggil melalui HTML, string, atau nama yang dibentuk secara dinamis.
- Pertahankan token dan utilitas yang merupakan kontrak design system atau dipakai melalui pola dinamis.

### 2. Hapus quote yang tidak diperlukan

- Hapus quote pada key objek JavaScript hanya jika key valid sebagai identifier dan semantiknya tetap sama.
- Pilih delimiter string yang konsisten dan mengurangi escape tanpa mengubah nilai string.
- Hapus quote CSS hanya jika identifier tetap valid dan maknanya tidak berubah, termasuk pada selector atribut atau nama font.
- Pertahankan quote yang diperlukan pada string, key dengan spasi/karakter khusus, nama font majemuk, serta atribut HTML/SVG.
- Jangan mengubah isi template HTML, pesan pengguna, URL, regex, escape sequence, atau interpolation demi mengurangi quote.
- Hindari penggantian regex massal yang tidak memahami konteks sintaks. Verifikasi sintaks dan nilai literal setelah perubahan.

### 3. Rapikan dan urutkan struktur kode

#### JavaScript

Kelompokkan kode secara konsisten:

1. Konfigurasi, konstanta, registry ikon, dan tabel dispatch.
2. State aplikasi dan cache.
3. Penyimpanan, migrasi, backup, dan helper umum.
4. Helper UI, navigasi, dan lifecycle render.
5. Modul aplikasi: renderer, binding/event, lalu aksi CRUD dan detail yang berkaitan.
6. Data contoh, tema, dan utilitas pendukung.
7. Bootstrap/inisialisasi aplikasi.

Urutan ini boleh disesuaikan jika ada ketergantungan eksekusi. Pertahankan urutan inisialisasi yang diperlukan, scope, hoisting, serta ketersediaan fungsi global untuk inline handler. Rapikan indentation, komentar, dan whitespace tanpa mengubah isi literal atau template.

#### CSS

Urutkan deklarasi dalam blok berdasarkan kelompok berikut:

1. Position, inset, top/right/bottom/left, dan z-index.
2. Display dan visibility.
3. Flex/Grid, alignment, order, dan gap.
4. Width/height, min/max size, box sizing, dan overflow.
5. Margin.
6. Padding.
7. Typography dan warna teks.
8. Border, radius, dan outline.
9. Background dan elevation/shadow.
10. Animation dan transform.
11. Transition.
12. Properti lainnya.

Kelompokkan token menurut peran dan urutkan skala numerik jika aman. **Pertahankan urutan shorthand/longhand, logical/physical properties, prefiks/fallback, `all`, dan deklarasi yang saling menimpa.** Jangan memindahkan rule antar scope, breakpoint, atau layer jika dapat mengubah cascade. Jangan menghapus deklarasi berulang yang merupakan fallback kompatibilitas.

Untuk spacing baru, ikuti tabel peran pada bagian Spasi, radius, dan elevasi. Periksa sumber jarak pada induk dan anak agar margin, padding, atau gap tidak menumpuk tanpa sengaja. Verifikasi nilai desktop dan mobile, termasuk utility class dan selector yang lebih spesifik.

#### HTML

Pertahankan struktur DOM dan atributnya. Perapihan format sumber tidak boleh mengubah whitespace yang bermakna, konten teks, ID, `name`, `data-*`, ARIA, inline handler, atau data-binding.

### 4. Pertahankan UI/UX

Hasil akhir harus terlihat dan berfungsi sama seperti baseline dari sisi pengguna:

- Jangan mengubah struktur tampilan, desain visual, layout, posisi elemen, atau isi konten.
- Jangan mengubah warna, font, ukuran, spacing, radius, shadow, breakpoint, layering, maupun perilaku motion sebagai bagian dari perapihan.
- Pertahankan tema terang/gelap, responsivitas, focus ring, navigasi keyboard, dan perilaku modal.
- Pertahankan validasi, CRUD, pencarian/filter, pengaturan, kalender, sinkronisasi antar modul, autosave, backup/import, dan output cetak.
- Jangan menambahkan fitur, mengganti label, atau memperbaiki masalah di luar ruang lingkup secara diam-diam. Catat temuan terpisah jika perbaikannya akan mengubah perilaku atau UI.
- Pertahankan custom properties runtime dan mutasi `element.style` yang diperlukan untuk progress, filter, collapse, grid, scroll lock, atau grafik data.

### Verifikasi dan penyelesaian

1. Periksa sintaks JavaScript dengan `node --check script.js` atau parser ekuivalen yang tersedia.
2. Bandingkan output renderer seluruh halaman pada data awal dan data berisi, serta dialog tambah/edit/detail yang terdampak.
3. Pastikan ID, `name`, handler, binding, format data, dan payload penyimpanan tetap sama.
4. Verifikasi perilaku yang dioptimalkan, termasuk invalidasi cache, listener setelah render ulang, debounce, dan agregasi data.
5. Bandingkan nilai dan hubungan cascade CSS; uji tampilan mobile, tablet, desktop, kedua tema, keyboard/modal, dan cetak jika browser tersedia.
6. Perbarui cache buster `style.css` dan `script.js` di `index.html` jika file runtime berubah; selaraskan referensi stylesheet pada output buku tamu.
7. Catat perubahan dan bukti pengujian di bagian Catatan perubahan dalam README.md; jangan membuat file Markdown aplikasi baru. Sajikan ringkasan sebelum/sesudah, bagian yang dihapus atau disederhanakan, dan keterbatasan pengujian.
8. Jika alat tertentu tidak tersedia, lanjutkan pemeriksaan independen yang bisa dilakukan dan nyatakan batas verifikasinya. Jangan mengklaim kesetaraan pixel atau zero regression penuh tanpa bukti yang memadai.

Pekerjaan dianggap selesai setelah perubahan yang aman diterapkan dan diperiksa sesuai alat yang tersedia, dengan hasil serta batas verifikasi dilaporkan secara jelas.

## Verifikasi perubahan

- Jalankan `node --check script.js` atau parser JavaScript ekuivalen.
- Periksa seluruh 19 route dengan data kosong/awal dan data berisi; bandingkan markup, konten, handler, dialog tambah/edit/detail, serta format angka dan tanggal.
- Periksa CRUD, filter, cache, listener setelah render ulang, storage/backup/import, serta sinkronisasi antar modul yang terdampak.
- Bandingkan nilai CSS dan urutan declaration yang berkonflik. Jika browser tersedia, uji mobile/tablet/desktop, kedua tema, keyboard/modal, serta preview cetak.
- Perbarui parameter versi CSS/JS dan referensi stylesheet buku tamu bila runtime berubah. Perubahan dokumentasi saja tidak membutuhkan cache buster.
- Catat hasil dan batas pengujian di README.md. Jangan mengklaim kesetaraan pixel atau zero regression penuh dari DOM stub saja.

## Catatan perubahan

### Penyelarasan dokumentasi setelah pengujian browser

Panduan penggunaan menjelaskan tombol Simpan pada form dan draft Pengaturan, label menu mengikuti aplikasi, serta kontrak kalender membedakan layout layar dan cetak. Catatan pengujian terkini berada pada bagian [Kondisi dan batas implementasi saat ini](#kondisi-dan-batas-implementasi-saat-ini). Perbandingan ulang memeriksa penyimpanan draft, navigasi/sidebar, viewport daftar, tema, tombol tambah/Reset, versi aset, dan aturan cetak. Perubahan ini hanya pada dokumentasi.

### Riwayat sebelum pengujian browser langsung

Seluruh catatan di bawah merekam kondisi dan bukti pada saat pekerjaan masing-masing dilakukan. Pernyataan seperti “browser belum diverifikasi” dan “browser tidak tersedia” adalah batas pengujian saat itu; hasil pengujian Edge berikutnya tercatat pada bagian Kondisi dan batas implementasi. Angka audit, ukuran sumber, serta hasil DOM stub merupakan bukti historis, bukan hasil pengujian ulang kode terbaru. Kontrak utama menjelaskan perilaku saat ini.

### Akses keyboard sidebar dan kalender

Sidebar tersembunyi dinonaktifkan dari interaksi/fokus menggunakan inert dan disembunyikan dari accessibility tree melalui aria-hidden. Toggle menyelaraskan aria-expanded serta pemindahan fokus. Kalender beracara mendukung Tab, Enter, dan Space tanpa mengubah posisi/ukuran sel. Pemeriksaan terisolasi mencakup desktop/mobile, hide/reopen, fokus, repeat key, markup ARIA, dan 209 render halaman. Compare ulang kontrak aktif README terhadap bagian runtime yang berubah tidak menemukan ketidaksesuaian baru; pengujian keyboard browser nyata dan tampilan masih belum dilakukan.


### Penyelarasan lanjutan 14 Oktober 2026

Catatan pembayaran fixture kini dibangun setelah seluruh penyesuaian skenario: nominal dibayar/sisa, status, dan tanggal jatuh tempo selalu mengikuti data akhir. Item lunas diberi keterangan pembayaran selesai; venue terpilih mengambil status dari item anggaran terkait. Semua venue memiliki kontak simulasi dan record kontak yang sesuai. Skenario dense menambah 12 kegiatan rundown paralel dengan waktu valid serta PIC/vendor yang tersedia; normal memiliki 11 kegiatan dan dense 23.

Tombol tambah konfigurasi (Tag, Peran, Sumber Dana) memakai primary berukuran kecil, konsisten dengan fungsi tambah namun sesuai kepadatan form. CSS redundan pada editable-list-row, vendor-card-body, sidebar-close, dan fokus form dirapikan dengan mempertahankan aturan responsif/status. Definisi penyimpanan dibedakan antara data perencanaan localStorage dan navigasi sessionStorage. Pemeriksaan 11 skenario dan 209 render halaman lulus; browser visual belum diverifikasi.


### Pembaruan fixture contoh 14 Oktober 2026

Generator fixture dilengkapi tanpa mengubah skema penyimpanan/import. Vendor inti tidak lagi diubah menjadi status pembanding; alternatif terpisah mewakili status shortlist. Jadwal pembayaran dihitung relatif terhadap pernikahan, catatan multiline dan kategori valid dilengkapi, serta vendor–kontak/PIC dan tamu–seating disinkronkan. Skenario dense memakai agenda rombongan dan biaya logistik yang lebih relevan serta data panjang di semua modul. Export JSON tetap memakai envelope version/data dan tidak mengganti data aktif.

Verifikasi: 11 skenario lolos pemeriksaan ID unik, kategori, status/nilai pembayaran, relasi rundown/menu/seating, dan roundtrip JSON; 209 render halaman lulus. Pembuatan fixture tidak mengubah data aktif atau storage pada pengujian terisolasi. Visual browser dan import melalui UI belum diverifikasi.


### Hover kartu sesuai fungsi

Kartu informasi (KPI, dashboard, anggaran, vendor/venue, status terpilih, countdown, timeline, dan opsi backup) tidak lagi berubah elevasi, border, atau terangkat saat hover. Shadow dasar dan warna status tetap dipertahankan. Feedback hover tetap berlaku pada tombol, menu navigasi, tautan, checkbox, header yang bisa dibuka/tutup, serta tanggal kalender beracara; feedback area tersebut memakai perubahan warna ringan. Animasi perubahan data dan pop-up tetap tersedia.


### Penyelesaian runtime 14 Oktober 2026

Versi aset cetak disatukan melalui ASSET_VERSION; observer preview menangani perubahan hasil filter tanpa loop tinggi; panel pendek dapat membesar untuk menghilangkan overflow. syncPageScrollLock dipakai bersama oleh modal dan sidebar, termasuk saat breakpoint berubah. Animasi wheel dibatalkan oleh interaksi pointer/keyboard/blur dan targetnya mengikuti batas isi terbaru. Tanggal luar bulan tetap pasif memakai ink-4, dengan kontras light 5,54:1 dan dark 6,81:1.

Verifikasi terisolasi: 209 render halaman dan 209 callback frame lulus, cancel wheel dan delta 50% lulus, scroll lock modal/mobile/closing lulus, daftar pendek tinggi/pendek serta item kelima variabel lulus, observer filter dibatch tanpa feedback loop, dan versi aset konsisten. Tidak ada data pengguna yang diubah. Visual browser dan preview cetak belum diverifikasi.


### Penyelarasan dokumentasi 14 Oktober 2026

README disesuaikan dengan implementasi terkini: lokasi handle sidebar, viewport dinamis/daftar pendek, teks status detail tamu, pengecualian kontras, geometri animasi runtime, dan batas penanganan scroll/modal. Tidak ada perubahan pada HTML, CSS, JavaScript, atau data pengguna dalam pekerjaan dokumentasi ini.


### Sumbu marker timeline

Itinerary honeymoon dan rundown memakai sumbu bersama untuk lingkaran 18px dan garis 2px. Marker dipusatkan terhadap sumbu dan tinggi baris pertama isi kartu. Garis dibuat per item dari pusat marker ke marker berikutnya, hanya jika ada item berikutnya yang tampil, sehingga tidak memanjang di atas marker pertama atau setelah marker terakhir. Geometri sumbu diperiksa pada kode; browser visual belum diverifikasi.


### Kartu data tanpa scroll internal

Kartu KPI termasuk Destinasi honeymoon memakai min-height 160px, height auto, dan overflow visible agar tanggal/keterangan tambahan tidak memunculkan scroll internal. Kartu sebaris mengikuti tinggi item tertinggi. Panah seluruh select.form-control menggunakan satu gambar conic-gradient, sehingga tidak ada sambungan dua segitiga yang terpisah; warna mengikuti token tema.


Tombol tambah memakai warna primary secara konsisten: btn btn-primary untuk data modul, termasuk Itinerary, Pengeluaran bulan madu, dan checklist KUA; btn btn-primary btn-sm untuk tambah Tag, Peran, dan Sumber Dana di Pengaturan karena merupakan aksi konfigurasi ringkas. Tombol tambah kedua kartu bulan madu tetap di sisi kanan header kartu. Labelnya Tambah Aktivitas dan Tambah Pengeluaran; handler tambah tetap sama.

Itinerary bulan madu juga mengikuti tinggi isi tanpa scroll internal. Semua aktivitas tampil dalam kartu dan diakses lewat scroll halaman; panel pengeluaran bulan madu mempertahankan pengaturan sebelumnya.


Kartu seperti venue menggunakan body dengan tinggi auto, flex 1, dan overflow visible. Aturan ini berlaku bersama pada vendor, kontak, tamu, anggaran, wedding party, menu, dan foto yang memakai vendor-card-body. Batas 224px sebelumnya dihapus; data yang lebih panjang menambah tinggi kartu dan diakses melalui scroll halaman. Panel daftar dashboard, KUA, seating, dan tabel tetap memakai viewport daftar sesuai kontraknya. Handler wheel tidak lagi menarget body kartu data. Pemeriksaan aturan CSS dan sintaks JavaScript dilakukan; visual browser belum diverifikasi.


### Reset filter dan ruang scroll

Tombol reset filter memakai varian secondary yang netral, dengan warna mengikuti tema dan opacity disabled ketika terkunci. Reset filter pada timeline, vendor, anggaran, dan tamu dinonaktifkan saat pencarian kosong dan seluruh dropdown default. Input/change memperbarui status segera; reset mengosongkan pencarian serta pilihan dropdown. Body kartu data memakai padding vertikal 8px dan baris info terakhir tanpa padding bawah tambahan untuk mengurangi overflow yang hanya berasal dari padding, dengan tinggi kartu mengikuti isi tanpa scroll internal.

Panel KUA, seating, dan tabel di panel daftar mengukur posisi serta tinggi item kelima untuk menampilkan empat item penuh dan setengah item berikutnya pada posisi awal. Pengukuran terjadi saat render, reset, perubahan isi/visibilitas setelah filter, akhir transisi display, perubahan lebar container/layar, dan font siap; tidak saat scroll. Ini menggantikan perkiraan 306px untuk daftar dengan tinggi baris bervariasi. Daftar kurang dari lima item memakai tinggi dasar 306px dan bertambah sesuai tinggi isi jika diperlukan, sehingga catatan panjang tidak memunculkan scroll internal. Print tetap melepas batas tinggi. Pengujian terisolasi mencakup reset default/pencarian/dropdown dan geometri item kelima; sintaks JavaScript lulus. Visual browser belum diverifikasi.


### Urutan informasi detail

Seluruh 17 jenis detail mengikuti urutan form tambah/edit, membaca field kiri ke kanan lalu ke baris berikutnya. Field identitas juga ditampilkan sebagai baris pertama yang sesuai form, meskipun tercantum pada judul dialog. Rundown memisahkan waktu mulai/selesai; detail tamu memisahkan undangan/souvenir dan menempatkan catatan setelah keduanya. Data turunan (sisa tagihan, total menu, status checklist, kapasitas meja) ditempatkan setelah field input. Badge pada field seperti prioritas/RSVP, tautan kontak, tombol Edit/Assign, escaping, dan skema data dipertahankan. Undangan Terkirim dan Souvenir pada detail tamu kini ditampilkan sebagai dua baris teks biasa sesuai urutan form. Verifikasi: urutan 114 field pada 17 jenis form cocok dengan detail, urutan tambah/edit sama, dan 200 dialog detail pada skenario contoh berhasil dirender tanpa perubahan data. Browser visual belum diverifikasi.

### Akses detail data

Kartu anggaran, checklist KUA, dan meja seating kini menyediakan tombol Detail berikon info, sama seperti modul data lainnya. Anggaran menampilkan semua field biaya, sisa tagihan, vendor, status, jatuh tempo, sumber dana, dan catatan. KUA menampilkan nama, status, dan catatan; meja menampilkan kapasitas, isi, sisa kursi, status kapasitas, dan daftar tamu. Dialog bersifat baca saja, menyediakan aksi Edit atau Assign Tamu, mempertahankan baris catatan, dan meng-escape teks data. Launcher Uji Pop-up memakai dialog detail baru tersebut. Pengujian terisolasi memeriksa field, ID tidak ditemukan, escaping, data tidak berubah, dan aksi Edit; sintaks JavaScript lulus. Visual browser belum diverifikasi.


### Animasi interaksi konsisten

Durasi token fast/base/slow menjadi 120/200/260ms. Modal memakai gerakan kecil (4–8px), exit 200ms dan pembatalan timer saat dibuka kembali. Sidebar dan overlay masuk/keluar dengan transisi; tombol tepi memakai fade/geser ringan. Perpindahan halaman memakai satu pola pada main-content, tanpa animasi kedua di page. Kelompok timeline/vendor dapat dibuka, ditutup, atau dibalik saat animasi berjalan.

Perubahan data pada halaman yang sama menganimasikan item baru, perpindahan posisi, dan salinan dekoratif item terhapus yang inert serta dibuang setelah animasi. Animasi item dibatasi ke area viewport. Counter hanya berjalan untuk angka bulat yang berubah, bukan saat navigasi; nilai uang mempertahankan format aslinya. Progress bar menganimasikan perubahan lebar, kalender memakai fade saat pergantian bulan, status checkbox/kartu memakai transisi warna, dan pergantian tema memakai transisi warna terarah. Filter serta pesan kosong/banner memakai transisi display discrete pada browser yang mendukung, dengan fallback langsung pada browser lain. Kilau dekoratif berulang dinonaktifkan; spinner, toast, dan indikator simpan yang sudah ada dipertahankan.

Reduced motion melewati animasi JavaScript dan meminimalkan CSS; mode cetak menghilangkan overlay animasi. Animasi tidak menunda penyimpanan atau konfirmasi aksi. Verifikasi: 209 render halaman dan 209 callback frame lulus pada DOM stub, serta pengujian disclosure cepat, reduced motion, dan hasil akhir counter. Sintaks JS diperiksa; visual browser dan kualitas interpolasi belum diverifikasi.


### Ukuran panel berdasarkan peran

Perapihan countdown sidebar mempertahankan tinggi 192px, padding vertikal 2px, padding horizontal 16px, dan gap 8px. Varian kosong/tanggal lewat mewarisi aturan ukuran dasar tanpa duplikasi padding. Lebar mengikuti container, overflow hanya vertikal, SVG ring memakai display block, dan dekorasi tidak menerima pointer. Pemusatan memakai fallback center serta safe center untuk menjaga awal teks tetap dapat diakses saat overflow.

Pola stabil juga berlaku pada kartu KPI semua modul (tinggi minimum 160px, menyesuaikan isi tanpa scroll internal) dan ringkasan anggaran dashboard (area isi 306px, sama dengan panel dashboard lainnya). Countdown hero mempertahankan ukuran responsif sebelumnya dengan overflow yang tetap dapat diakses. Isi ringkasan tidak menyusut untuk memaksa teks muat; teks panjang membungkus dan overflow dapat discroll. Tinggi tetap tidak diterapkan pada form, banner sementara, atau ringkasan venue yang memakai padding khusus. Cetak melepaskan batas tinggi pada KPI, countdown hero, serta seluruh panel dashboard.

Countdown sidebar memakai tinggi 192px, padding atas/bawah 2px dan kiri/kanan 16px, serta gap 8px yang sama untuk tanggal kosong, countdown aktif, hari pernikahan, serta tanggal lewat. Padding vertikal 2px merupakan pengecualian sesuai permintaan; tinggi dirampingkan untuk mengurangi ruang kosong hasil pemusatan isi. Isi dipusatkan saat muat; teks panjang membungkus dan dapat discroll tanpa mengubah tinggi kotak atau mengurangi ruang navigasi secara mendadak. Ring tetap berukuran 88px dan tidak menyusut.

Verifikasi perubahan ini: 209 render halaman pada 11 skenario data lulus tanpa error dalam Node VM dengan DOM stub; sintaks JavaScript dan struktur CSS lulus. Tampilan aktual, scrollbar, dan preview cetak belum diverifikasi melalui browser.

Panel daftar dashboard dan ringkasan anggaran memakai area isi tetap 306px. Panel timeline, packing, checklist KUA, seating, dan pengeluaran honeymoon memakai tinggi dasar 306px; sizeListPreviews dapat menggantinya dengan tinggi sampai pertengahan item kelima jika struktur daftar dikenali dan sedikitnya lima item tampil. Pesan kosong dipusatkan; daftar panjang memakai scroll, sedangkan panel dengan kurang dari lima item membesar jika perlu agar catatan panjang tetap tampil penuh. Body kartu data pada grid vendor/kontak/tamu/venue/menu, anggaran, wedding party, foto, dan modul sejenis mengikuti isi tanpa tinggi tetap atau scroll internal. Footer tetap berada di bawah dan kartu pada baris grid yang sama tetap sejajar; teks panjang dapat membungkus tanpa melebarkan grid. Form, header, dan ringkasan venue tetap mengikuti isi; KPI dan ringkasan dashboard mengikuti ukuran khusus yang dijelaskan di atas. Ini menggantikan aturan sebelumnya bahwa panel dashboard pendek menyusut mengikuti jumlah baris. Cetak melepaskan batas tinggi agar seluruh isi tampil.


### Alignment konten dan skenario pengujian

Baris form/grid informasi, pasangan label–nilai kartu, dan baris ringkasan biaya memakai rata atas agar teks yang membungkus tetap sejajar pada awal baris. Posisi horizontal tetap mengikuti komponen masing-masing. Ringkasan venue memakai padding vertikal 8px pada atas dan bawah untuk menghilangkan ruang bawah yang berlebihan; padding horizontal mengikuti token panel.

Checklist KUA menempatkan checkbox di tengah blok judul dan catatan; catatan kosong atau hanya spasi tidak membuat baris tambahan. Teks ringkasan venue terpilih rata atas, dengan posisi horizontal semula dipertahankan. Nama pemberi hadiah memakai ketebalan teks biasa, dan divider putus-putus yang dipakai bersama oleh ringkasan biaya dihapus. Kalender memakai garis grid bersama 1px serta border luar yang konsisten agar tiap sel memiliki batas pada semua sisi.

Generator data contoh kini membangun fixture terisolasi untuk 11 skenario. Pemilih menyediakan penerapan dengan konfirmasi dan export JSON untuk import. Launcher pop-up memakai dialog asli pada 20 pilihan modul/seksi, sehingga perilaku simpan/hapus tetap sama. Verifikasi Node VM mencakup 209 render halaman (11 skenario × 19 halaman), 74 pembukaan dialog, dan pemeriksaan bahwa pembuatan fixture tidak mengubah data aktif. Sintaks JavaScript dan struktur CSS diperiksa. Pemeriksaan visual browser belum tersedia; data pengguna tidak diganti selama pengujian.

### Petunjuk scroll natural

Tombol show/hide sidebar memakai batang vertikal 16 × 80px dengan tiga titik vertikal: show di tepi kiri layar, hide di luar sisi kanan sidebar dan menempel pada tepinya, keduanya di tengah secara vertikal. Tombol hide merupakan anak langsung sidebar dengan offset kanan -16px, bukan di header. Overflow sidebar mengizinkan tombol terlihat di luar; saat disembunyikan, sidebar beserta tombol bergerak keluar layar. Header mobile mempertahankan tombol burger. Sel kalender memakai rasio 1:1 dan penanda hari ini berbentuk persegi; data lengkap pada tanggal beracara tetap tersedia melalui dialog klik tanggal.


Sidebar tampil saat aplikasi dibuka, termasuk mobile. Handle tiga titik di luar sisi kanan sidebar menutup menu; handle desktop di tepi kiri layar atau tombol burger pada header mobile membukanya kembali. Pilihan tampil/sembunyi tidak disimpan. Pada mobile, overlay dan penguncian scroll mengikuti status menu; resize menyinkronkan keduanya. Collapse otomatis saat hover pada desktop diganti kontrol eksplisit. Nilai KPI memakai ellipsis tanpa scrollbar dan menyediakan tooltip nilai penuh. Tanggal di luar bulan memakai surface pasif dan angka redup tanpa meredupkan border sel.


Judul kelompok sidebar (`.nav-section-title`) memakai padding atas 16px, bawah 8px, dan kiri/kanan 16px.

Scroll roda mouse pada sidebar dan daftar dashboard memakai langkah 50% dari delta bawaan, dengan interpolasi requestAnimationFrame agar perpindahan lebih halus. Input beruntun digabung ke target yang sama. Preferensi reduced motion memakai perpindahan langsung dengan langkah yang tetap diperkecil. Zoom Ctrl dan scroll horizontal/Shift tidak dicegat. Pointerdown, keyboard, dan window blur membatalkan animasi wheel yang masih berjalan agar tidak mengalahkan interaksi manual. Di batas daftar, input dapat diteruskan ke area luar.

Jarak antar item menu sidebar dikurangi dari 8px menjadi 4px (setengah token `--space-2`) sesuai permintaan. Ini merupakan pengecualian spacing khusus navigasi; padding tombol dan jarak antar kelompok tetap mengikuti token sebelumnya.

Dashboard memakai batas tetap 306px yang setara 4.5 baris seragam. Daftar dengan baris bervariasi memakai pengukuran item kelima saat render/resize/reset/font siap; sidebar mengikuti ruang slot tersedia. Pengukuran titik tengah menu sidebar dan perubahan tinggi viewport saat scroll sudah dihapus. Overlay gradasi sidebar beserta listener dan observer khusus indikator dihapus. Tidak ada snapping saat scroll; petunjuk item kelima yang terlihat setengah hanya berasal dari ukuran viewport awal. Daftar pendek dapat menampilkan item penuh jika isinya muat; akhir daftar tetap dapat menampilkan item terakhir penuh. Sintaks dan struktur CSS diperiksa; screenshot browser belum tersedia.

### Alignment kalender, acara, dan pesan

Angka tanggal memakai kotak maksimum 32px (menyusut sesuai ruang sel mobile) dengan isi terpusat dan inset dari padding sel 8px; offset negatif hari ini dihapus. Nama acara pada tabel Simpan Tanggal Acara mengikuti ketebalan teks sel biasa. Catatan KUA dan peringatan budget memakai kelas content-note untuk pemusatan horizontal/vertikal, konfirmasi mandiri dipusatkan, dan pesan kosong dalam grid membentang seluruh kolom. Sel tabel yang memang center serta kolom aksi/checkbox memakai vertical-align middle. Alignment data, form dan detail lain dipertahankan. Verifikasi dilakukan pada kode/renderer; browser visual belum tersedia.

### Countdown hero dengan ukuran stabil

Area `.dashboard-countdown` memakai lebar maksimum 28rem (448px), dibatasi lebar tersedia, serta tinggi tetap 12rem (192px) pada desktop/tablet >768px dan 10rem (160px) pada mobile. Pesan tanggal kosong, hari pernikahan, tanggal lampau, dan angka sisa hari berbagi kotak yang sama; isi dipusatkan dan teks pesan dapat membungkus. Padding mengikuti token panel dan jarak angka–label mengikuti token inline. Ukuran kotak tidak lagi ditentukan oleh jenis kontennya. Perhitungan tanggal dan pesan tetap sama; perubahan ini diverifikasi pada aturan CSS, belum melalui screenshot browser.

### Penerapan ritme spacing 8/16/24/32px

Kontrak spacing pada tabel di atas menggantikan pengaturan dashboard sementara yang sebelumnya memakai jarak 18px/20px dan breakpoint padding 480px. Welcome panel dan hero kini memakai padding serta jarak antarpanel 24px pada desktop/tablet dan 16px pada mobile maksimal 768px.

- Sebanyak 122 deklarasi spacing dipetakan ke skala aktif, lalu disesuaikan menurut peran panel, grid, section, tepi halaman, kontrol, badge, tabel, form, sidebar, dan mobile.
- Verifikasi mencakup 285 deklarasi spacing; tidak ditemukan nilai spacing di luar skala aktif pada pemeriksaan tersebut. Parser struktur CSS dan sintaks JavaScript lulus.
- Aturan non-spacing tetap sama kecuali tinggi minimum badge 24px dan token responsif yang dinyatakan. Logika, markup, binding, ukuran ikon, border, dan dimensi data dipertahankan; perubahan margin/padding/gap diminta secara eksplisit oleh pengguna.
- Browser aktif tidak tersedia, sehingga pemeriksaan visual responsif dan cetak belum dilakukan untuk penyesuaian ini. Nilai yang dilaporkan berasal dari pemeriksaan kode dan kontrak token.

Bagian ini merangkum pekerjaan 13 Oktober 2026. Angka berikut merupakan bukti historis saat pekerjaan tersebut dijalankan, bukan jaminan untuk setiap perubahan berikutnya.

### Standardisasi UI

| Aspek | Hasil |
| --- | --- |
| Styling | Dari 119 atribut style JavaScript: 99 atribut statis diekstrak; tersisa 17 custom properties runtime pada hasil akhir audit |
| Ikon | 21 ikon UI di luar registry dikonsolidasikan; 19 bentuk registry berulang diganti pemanggilnya |
| Desain | Token warna/action/paper, tipografi/angka, spacing/radius, elevasi/layering, ikon, focus/modal, komponen, dan motion disatukan |
| Perbaikan presentasi | Nilai dan progress anggaran dashboard kembali memakai interpolasi dari perhitungan yang sudah tersedia |
| Kontras | 160 pasangan token diperiksa; minimum 4,74:1 pada kedua tema |
| Renderer | 19 halaman, 16 dialog tambah tanpa parameter, dan enam renderer dengan fixture berisi lulus perbandingan binding |

### Optimasi tanpa perubahan desain

- Menghapus 9 helper tanpa pemanggil, 10 initializer kosong, empat ikon tanpa referensi, state tak terpakai, listener kosong/duplikat, satu declaration CSS identik, dan tiga rule CSS identik.
- Memakai ulang formatter, tabel dispatch, dan warna status; agregasi vendor memakai satu lintasan dan listener pengaturan tidak dipasang berulang.
- Menghapus 26 karakter quote key objek, 655 karakter escape/quote string, dan 20 quote CSS yang aman. Nilai string tetap dibandingkan dengan baseline.
- Mengurutkan 2.422 declaration CSS; 254 blok berubah urutan sambil menjaga hubungan cascade.

| Pemeriksaan | Hasil historis |
| --- | --- |
| 19 halaman dengan data awal dan data contoh | 38 output HTML identik; ID fixture acak dinormalisasi |
| Dialog | 17 tambah dan 30 edit/detail/penempatan tamu identik |
| Data dan cetak | Data contoh, payload localStorage, pemilihan venue, dan output buku tamu sama; versi asset dinormalisasi saat membandingkan cetak |
| Utilitas | Format uang/tanggal/waktu dan pipeline vendor identik pada kasus yang diperiksa; debounce memakai callback/argumen terakhir |
| Listener/cache | Satu listener dan satu update per input; empat panggilan pada dua currency memakai dua formatter |
| Stylesheet | Struktur semantik per scope, selector, nilai, dan urutan keluarga declaration setara |
| Ukuran sumber | JS 401.087 → 383.375 byte; CSS 94.353 → 96.475 byte, termasuk normalisasi newline dan format |

### Batas pengujian historis

Pemeriksaan dilakukan dengan Node VM, fixture terisolasi, DOM stub, dan perbandingan struktur CSS. Data pengguna tidak disentuh. Browser aktif tidak tersedia saat audit dan optimasi, sehingga screenshot QA 360/768/1440px, keyboard nyata, CRUD end-to-end dalam browser, validasi CSS oleh mesin browser, serta preview print/PDF belum dilakukan. Kontras token tidak menggantikan pemeriksaan seluruh pixel/compositing. Kesetaraan visual penuh dan zero regression belum dapat diklaim.

Ukuran sumber bukan benchmark performa aplikasi. Ulangi pemeriksaan yang relevan setiap kali kode berubah.

## Penggunaan proyek

### Dua spreadsheet Google Sheets (opsional)

Gunakan dua file Google Spreadsheet dan dua project Apps Script yang terpisah. Script ini merupakan alat penyiapan di luar tiga file runtime website; belum menyediakan API atau sinkronisasi aplikasi.

| Spreadsheet | Script yang dipaste | Fungsi yang dijalankan |
| --- | --- | --- |
| Data utama | `google-sheets-data.gs` | `setupWeddingPlannerData` |
| Data sample | `google-sheets-samples.gs` | `setupWeddingPlannerSamples` |

Buka Extensions → Apps Script pada masing-masing spreadsheet, paste seluruh script yang sesuai, simpan, lalu jalankan fungsi dan berikan izin Google. Jangan paste keduanya dalam satu project karena masing-masing mandiri dan memiliki konstanta/helper serta onOpen sendiri. Menu masing-masing muncul setelah spreadsheet dibuka ulang. File gabungan google-sheets-setup.gs telah digantikan oleh dua file di atas.

Script data utama membuat 24 tab, header, filter, format angka/tanggal/teks, checkbox, dan dropdown dasar. Tidak mengisi record pribadi atau sample. Settings dan HoneymoonDestination masing-masing untuk satu baris data. Relasi vendor/PIC masih memakai nama; SeatingAssignments memakai ID dan memerlukan adapter migrasi. CalendarEvents dan HoneymoonBookings menyediakan payloadJson. Metadata sinkronisasi belum diperbarui otomatis. Menjalankan ulang mempertahankan nilai, tetapi menerapkan kembali format/validasi; header yang tidak cocok menghentikan proses sebelum penulisan.

Script sample membuat 23 tab modul dan Catalog, tanpa awalan Sample_ karena spreadsheet-nya sudah terpisah. Catalog mencatat 13 skenario: kosong, belum diatur, normal, peringatan, H-30, H-7, H-1, hari pernikahan, setelah pernikahan, selesai, daftar panjang, tanpa catatan, dan teks panjang/karakter khusus. Setiap baris memiliki scenarioId dan batchId. Menjalankan ulang menambahkan batch baru; tidak mengganti batch lama. Tanggal relatif terhadap eksekusi di Asia/Jakarta. Gunakan batch baru saat perlu menguji countdown pada hari lain. extraJson mempertahankan field tambahan; tanggal, waktu, dan telepon sample memakai teks. Sampel kosong tetap memiliki pengaturan/opsi bawaan, tanpa record bisnis. Skenario mencakup kondisi utama, bukan setiap kombinasi interaksi.

Tujuh logical assignment pada generator diganti dengan if setelah parser Apps Script menolaknya. Sintaks kedua file, setup mandiri pada dua spreadsheet simulasi, pengulangan yang mempertahankan data utama, dan dua batch sample (26 baris Catalog) lulus. Eksekusi Google Sheets nyata dan integrasi cloud belum diuji.

Untuk deployment GitHub, browser baru memakai getDefaultData tanpa sample/personal; tugas timeline dan KUA bawaan tetap tersedia. Browser dengan localStorage lama mempertahankan datanya. Penggantian penyimpanan lokal ke Google Sheets masih menunggu implementasi API dan koneksi, dan belum diterapkan.

Proyek ini dibuat untuk keperluan personal dan dapat dimodifikasi sesuai kebutuhan.
