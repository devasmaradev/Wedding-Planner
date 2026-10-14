# Wedding Planner App

Aplikasi Wedding Planner berbasis HTML, CSS, dan JavaScript pada GitHub Pages, dengan Apps Script sebagai API dan satu Google Sheet untuk data utama. Penyimpanan browser telah diganti dengan cloud; koneksi internet dan deployment API terbaru diperlukan.

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
2. Buka website melalui GitHub Pages atau server lokal pada port 5500 menggunakan browser modern.
3. Data dimuat otomatis dari Google Sheets tanpa form akses. Isi nama pengantin/tanggal di **Pengaturan** dan tekan **Simpan Pengaturan**.
4. Form dan aksi langsung mengantrekan perubahan ke Google Sheets. Tunggu status **Tersimpan di Google Sheets**. Jika gagal, perubahan masih di memori tab; coba ulang atau export backup sebelum menutup tab.

## Daftar isi

- [Penggunaan dan data](#penggunaan-dan-data)
- [Arsitektur aplikasi](#arsitektur-aplikasi)
- [Design system](#design-system)
- [Kondisi dan batas implementasi](#kondisi-dan-batas-implementasi-saat-ini)
- [Panduan optimasi](#panduan-optimasi)
- [Verifikasi perubahan](#verifikasi-perubahan)
- [Catatan perubahan](#catatan-perubahan)

## Penggunaan dan data

Aplikasi dijalankan melalui HTTP/HTTPS (GitHub Pages atau localhost:5500), bukan file://, karena origin API dibatasi. Tidak ada localStorage, sessionStorage, IndexedDB, atau cache data offline. Status koneksi dan antrean perubahan hanya berada di memori; refresh memuat ulang data dari Sheet. Tema serta penanda backup disimpan bersama data cloud. Data browser lama tidak dibaca, dihapus, atau dimigrasikan otomatis; simpan backup melalui versi lama sebelum berpindah jika diperlukan.

Pengaturan memakai draft; perubahan diterapkan setelah Simpan Pengaturan. Navigasi membatalkan draft yang belum disimpan. Akses baru dimulai dari dashboard. Refresh/hard refresh memulihkan menu dan scroll sidebar melalui hash URL page/nav, sedangkan konten utama kembali ke atas. Interaksi pengguna membatalkan pemulihan sidebar tertunda. Hash menyimpan posisi navigasi, bukan data pribadi atau token. Tema awal light; setelah data dimuat, pilihan tema cloud diterapkan.

Backup/import JSON dan cetak tetap tersedia. Import mengantrekan penyimpanan ke cloud. Reset mengosongkan data aktif, bukan menghapus riwayat snapshot server. Font Google opsional dengan fallback sistem, tetapi akses data utama memerlukan internet.

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

Temuan browser yang diperbaiki: banner KUA membaca `checked` (sebelumnya properti `completed` yang tidak tersedia); ringkasan anggaran kosong menampilkan Rp 0 dengan penjagaan pembagi nol untuk persentase; layout navigasi kalender pada cetak tidak menyisakan kolom tombol tersembunyi sehingga judul bulan kembali terpusat. Versi aset saat pengujian tersebut adalah `20261014browser`; versi cloud kini `20261015loading`. Pengujian Edge itu dilakukan sebelum migrasi cloud.

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

Panel daftar dashboard dan ringkasan anggaran memakai area isi tetap 306px. Panel timeline, packing, checklist KUA, seating, dan pengeluaran honeymoon memakai tinggi dasar 306px; sizeListPreviews dapat menggantinya dengan tinggi sampai pertengahan item kelima jika struktur daftar dikenali dan sedikitnya lima item tampil. Pesan kosong dipusatkan; daftar panjang memakai scroll, sedangkan panel dengan kurang dari lima item membesar jika perlu agar catatan panjang tetap tampil penuh. Body kartu data pada grid vendor/kontak/tamu/venue/menu, anggaran, wedding party, foto, dan modul sejenis mengikuti isi tanpa tinggi tetap atau scroll internal. Footer tetap berada di bawah dan kartu pada baris grid yang sama tetap sejajar; teks panjang dapat membungkus tanpa melebarkan grid. Form, header, dan ringkasan venue tetap mengikuti isi; KPI dan ringkasan dashboard mengikuti ukuran khusus yang dijelaskan di atas. Ini menggantikan aturan sebelumnya bahwa panel dashboard pendek menyusut mengikuti jumlah baris. Cetak melepaskan batas tinggi agar seluruh isi tampil.

Baris form/grid informasi, pasangan label–nilai kartu, dan baris ringkasan biaya memakai rata atas agar teks yang membungkus tetap sejajar pada awal baris. Posisi horizontal tetap mengikuti komponen masing-masing. Ringkasan venue memakai padding vertikal 8px pada atas dan bawah untuk menghilangkan ruang bawah yang berlebihan; padding horizontal mengikuti token panel.

Checklist KUA menempatkan checkbox di tengah blok judul dan catatan; catatan kosong atau hanya spasi tidak membuat baris tambahan. Teks ringkasan venue terpilih rata atas, dengan posisi horizontal semula dipertahankan. Nama pemberi hadiah memakai ketebalan teks biasa, dan divider putus-putus yang dipakai bersama oleh ringkasan biaya dihapus. Kalender memakai garis grid bersama 1px serta border luar yang konsisten agar tiap sel memiliki batas pada semua sisi.

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

### Optimasi tanpa perubahan desain

- Menghapus 9 helper tanpa pemanggil, 10 initializer kosong, empat ikon tanpa referensi, state tak terpakai, listener kosong/duplikat, satu declaration CSS identik, dan tiga rule CSS identik.
- Memakai ulang formatter, tabel dispatch, dan warna status; agregasi vendor memakai satu lintasan dan listener pengaturan tidak dipasang berulang.
- Menghapus 26 karakter quote key objek, 655 karakter escape/quote string, dan 20 quote CSS yang aman. Nilai string tetap dibandingkan dengan baseline.
- Mengurutkan 2.422 declaration CSS; 254 blok berubah urutan sambil menjaga hubungan cascade.

### Batas pengujian historis

Ukuran sumber bukan benchmark performa aplikasi. Ulangi pemeriksaan yang relevan setiap kali kode berubah.

## Penggunaan proyek

### Deployment cloud: GitHub Pages + Apps Script + Google Sheets

Aplikasi hanya memakai satu spreadsheet data utama dan satu script google-sheets-data.gs. Tidak memerlukan OAuth Client ID atau autentikasi aplikasi. Website terdiri dari index.html, style.css, dan script.js; backend Apps Script merupakan komponen terpisah.

1. Buka spreadsheet utama melalui Extensions → Apps Script dan paste google-sheets-data.gs. Jalankan setupWeddingPlannerData jika tabel belum ada, lalu configureWeddingPlannerApi dari editor sebagai pemilik.
2. configureWeddingPlannerApi menyimpan ID spreadsheet di Script Properties dan membersihkan konfigurasi akses lama. Tidak ada form atau pemeriksaan kata sandi/token.
3. Deploy → Manage deployments → Edit → New version → Execute as Me → Who has access Anyone → Deploy. Pertahankan deployment dan URL /exec yang sudah terpasang pada CLOUD_URLS.
4. Buka website GitHub Pages atau localhost:5500; data dimuat otomatis. Origin yang diizinkan: https://devasmaradev.github.io, http://localhost:5500, dan http://127.0.0.1:5500.

Transport menggunakan iframe HTML Apps Script, google.script.run, serta postMessage dengan pemeriksaan origin/channel/source. API load/save tidak memakai autentikasi; pada deployment Anyone, siapa pun yang mengetahui URL dapat membaca/mengubah dataset bersama. Pemeriksaan origin transport bukan pengganti kontrol akses server. Fungsi administrasi setup/konfigurasi tetap dibatasi kepada pemilik.

Tab _State adalah sumber data dan riwayat snapshot. Tabel modul menjadi proyeksi data aktif untuk dibaca; perubahan harus dilakukan melalui aplikasi, karena load membaca _State dan save menulis ulang proyeksi. Satu baris commit menyimpan revision, timestamp, dan potongan JSON untuk mempertahankan seluruh field. Jika proyeksi gagal setelah commit, API mengembalikan revision dengan peringatan. Riwayat bertambah setiap save dan perlu dikelola pemilik untuk penggunaan jangka panjang.

Frontend mengantrekan penyimpanan secara berurutan dan menampilkan status server. Revision mencegah sesi lain menimpa data lebih baru. Konflik memerlukan export perubahan tab lalu reload; tidak ada merge otomatis. Timeout mencoba memeriksa writeId untuk mengenali commit yang sudah terjadi. Pending hanya ada dalam memori; beforeunload memperingatkan jika belum tersimpan. Tidak ada migrasi/penghapusan otomatis data lama dari browser atau spreadsheet.

Audit produksi menghapus fitur demonstrasi dan launcher pengujian dari website, seed tugas timeline, serta aset dan generator terkait. Preset administrasi KUA dan opsi form dipertahankan sebagai bagian aplikasi. Data bisnis awal kosong. Versi aset diselaraskan menjadi 20261015direct. Parser JavaScript dan seluruh 19 renderer dengan data awal lulus; timeline, anggaran, tamu, dan vendor awal berjumlah nol, sedangkan 24 checklist KUA bawaan tetap tersedia. Deployment/API browser nyata masih perlu diuji setelah script backend diperbarui. Pembersihan source tidak menghapus data yang sudah tersimpan pada layanan eksternal.

Proyek ini dibuat untuk keperluan personal dan dapat dimodifikasi sesuai kebutuhan.


### Pengalaman akses awal

Shell aplikasi disembunyikan dan inert sejak HTML pertama, lalu ditampilkan setelah load berhasil. Untuk penyimpanan cloud yang belum memiliki snapshot, akses awal masuk dashboard dengan light mode, onboarding, profil/tanggal kosong, seluruh daftar bisnis kosong, target/nominal nol, dan checklist administrasi belum dicentang. Banner backup dan KUA belum muncul pada kondisi awal. Kondisi ini diuji pada renderer terisolasi, termasuk akses baru dengan hash menu lama. Jika Sheet utama sudah memiliki snapshot, aplikasi memuat data tersebut; browser baru bukan akun/data baru. API saat ini memakai satu dataset bersama, bukan tenant per pengguna. Tidak ada penghapusan otomatis data cloud lama. Validasi browser nyata terhadap deployment masih diperlukan.


Penyesuaian akses langsung: form akses, token sesi, pembatasan percobaan akses, dan hashing kredensial dihapus. Loading otomatis menyediakan Coba lagi jika API gagal dan tidak membuka aplikasi sebelum data berhasil dimuat. Teks Reset Data menyebut pengosongan data aktif; riwayat server tetap disimpan.


Perbaikan loading (15 Oktober 2026): penghubung dibatasi 20 detik, pembacaan API 30 detik, dan coba ulang menghapus iframe serta listener lama. Origin yang tidak diizinkan menampilkan pesan. Uji simulasi koneksi berhasil, timeout, dan pembersihan retry lulus. URL deployment utama saat diperiksa mengembalikan halaman Google berjudul “Salah”; koneksi produksi belum terverifikasi. Perbarui deployment Apps Script dengan versi terbaru dan akses Anyone; jika URL berubah, sesuaikan CLOUD_URLS.data di script.js. Versi aset: 20261015loading.
