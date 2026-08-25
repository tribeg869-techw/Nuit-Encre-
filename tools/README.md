# tools

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
