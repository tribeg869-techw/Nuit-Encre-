# tools

## make-og-card.py

Membuat ulang `assets/img/og-cover.jpg` (kartu berbagi 1200×630).

Kartu ini memakai bahasa visual yang sama dengan hero situs: wordmark
Apfel Grotezk Fett yang disingkap oleh tinta bercabang dari algoritma
`grow()` di `assets/js/main.js`.

Jalankan:

    python3 -m pip install --break-system-packages fonttools brotli pillow numpy
    python3 tools/make-og-card.py

Skrip mengonversi `assets/fonts/ApfelGrotezk-Fett.woff2` ke
`/tmp/ApfelFett.ttf` lebih dulu, jadi huruf di kartu identik dengan
huruf di situs.

Dua angka yang menentukan hasilnya:

- **rasio jari-jari terhadap langkah** harus >= 1.8, kalau tidak simpul
  tidak bersentuhan dan tinta terbaca sebagai manik-manik, bukan serat
- **`vert`** dasar 0.42 menjaga puncak huruf tetap terbaca; kalau
  diturunkan, baris NUIT mulai lenyap

Seed dikunci di `20260825` supaya hasilnya dapat diulang.
