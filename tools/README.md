# tools

## add-study.py

Menyiapkan gambar studi mentah (ekspor Canva, foto, apa pun) menjadi
pasangan berkas siap tayang:

    python3 tools/add-study.py <gambar> <slot>

- potong tengah ke rasio 3:4, ubah ukuran ke **1200×1600**, paksa
  hitam-putih;
- tulis `assets/img/st-0N.jpg` + `st-0N.webp` (slot `7`/`07`/`st-07`
  sama saja);
- peringatan kalau >10% gambar terbuang saat potong (ekspor Canva
  idealnya langsung 3:4), kalau gambar terlalu gelap (kartu tidak
  aktif dipakai `brightness .6`), atau kalau kiri atas menabrak zona
  lencana `.gs__i` (115×75 px) — *lencana sudah dihapus 2026-08-27
  (CONCEPT.md), jadi peringatan ini tinggal saran komposisi*.

Ambang peringatan dikalibrasi dari delapan studi yang ada
(2026-08-25): rata-rata terang < 12 atau massa terang < 2% dianggap
terlalu gelap; zona lencana > 1% piksel terang dianggap menabrak.

**Butuh Pillow:** `python3 -m pip install --break-system-packages pillow`.

### kanvas-panduan.png

Kanvas 1200×1600 hitam dengan **garis putus di kiri atas** menandai
zona lencana dan silang samar di tengah. Opsional: jadikan lapisan
dasar di Canva untuk menata komposisi, **hapus sebelum mengekspor**.

## make-og-card.py

Membuat ulang `assets/img/og-cover.jpg` — kartu berbagi 1200×630 yang
muncul saat link situs dikirim ke WhatsApp, X, atau LinkedIn.

**Bahan:**

- `assets/img/src-ink.jpg` — foto tinta putih membaur di air hitam.
  Sisi kirinya sengaja hampir hitam total supaya ada ruang untuk
  wordmark; kalau menggantinya, pastikan sifat itu tetap ada.
- `assets/fonts/ApfelGrotezk-Fett.woff2` — dikonversi ke TTF otomatis,
  jadi huruf di kartu identik dengan huruf di situs.

**Jalankan:**

    python3 -m pip install --break-system-packages fonttools brotli pillow numpy
    python3 tools/make-og-card.py

Bisa dipanggil dari direktori mana pun; skrip pindah sendiri ke akar repo.

**Catatan penyetelan** — `vert = t*1.02 + .46`. Angka `.46` itu lantai
keterbacaan: menurunkannya membuat baris NUIT mulai lenyap ditelan
tinta. Pengali `0.62` pada `ink` mengatur seberapa dalam tinta menggerus
huruf.

**Riwayat:** versi sebelumnya mencoba menggambar tinta secara prosedural
memakai algoritma `grow()` dari `main.js`. Parameter itu disetel untuk
kanvas potret di HP dan menghasilkan bentuk seperti petir di kanvas
lanskap — ditinggalkan, diganti foto.

## cek-hover.py

Menjaga kontrak hover (CONCEPT.md §0 butir 3, sejak 2026-09-13): setiap
selektor `:hover` di `assets/css/style.css` harus berada di dalam blok
`@media (hover:hover)` — supaya ponsel tidak pernah terjebak state hover
lengket, dan tidak ada isi yang hanya bisa dicapai dengan kursor.

    python3 tools/cek-hover.py     # exit 0 = LOLOS, 1 = ada pelanggaran (nomor baris dicetak)

Komentar CSS diabaikan. Jalankan setiap kali menyentuh CSS.
