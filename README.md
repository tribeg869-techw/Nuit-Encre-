# Nuit Encre

> *Malam tinta* — landing page portofolio untuk **Mobile UI Designer**.

Situs satu halaman bertema gelap-gotik, dibangun tanpa framework: HTML, CSS, dan
JavaScript murni. Ringan, cepat, dan siap di-hosting di GitHub Pages.

---

## ✨ Fitur

| | |
|---|---|
| 🌑 **Tema Night Ink** | Palet tinta pekat, aksen emas & ungu, tekstur grain halus |
| 🇮🇩 🇬🇧 **Bilingual** | Toggle ID/EN instan, pilihan tersimpan di `localStorage` |
| 🖋️ **Preloader tinta** | Logo "NE" digambar dengan animasi SVG stroke |
| 🖱️ **Jejak kursor tinta** | Canvas trail emas–ungu (desktop, non-touch) |
| 📱 **Mockup HP hidup** | Frame 3D dengan screenshot karya yang berganti otomatis |
| 🎞️ **Reveal on scroll** | IntersectionObserver, tanpa library |
| 🧭 **Nav pintar** | Sticky + blur, penanda section aktif, progress bar scroll |
| 📊 **Skill bar animatif** | Terisi saat masuk viewport |
| ✉️ **Form tervalidasi** | Floating label + validasi client-side bilingual |
| ♿ **Aksesibel** | Fokus terlihat, `prefers-reduced-motion`, alt text |
| ⚡ **Optimal** | WebP + fallback JPG, lazy loading (total aset < 1 MB) |

---

## 📁 Struktur

```
.
├── index.html              # Seluruh markup
└── assets/
    ├── css/style.css       # Design token + semua style
    ├── js/
    │   ├── i18n.js         # Kamus Bahasa Indonesia & Inggris
    │   └── main.js         # Semua interaksi
    └── img/                # Karya (.webp + .jpg fallback)
```

---

## 🚀 Menjalankan

```bash
python3 -m http.server 3000
# buka http://localhost:3000
```

Tidak ada build step, tidak ada dependency.

---

## 🔧 Cara Menyesuaikan

**Ganti teks** — Semua teks ada di `assets/js/i18n.js`. Edit nilai pada objek `id`
dan `en`; markup di `index.html` otomatis mengikuti lewat atribut `data-i18n`.

**Ganti warna** — Semua warna didefinisikan sebagai CSS custom property di blok
`:root` pada `assets/css/style.css`:

```css
--gold:#c9a961;    /* aksen utama   */
--violet:#6d5bd0;  /* aksen kedua   */
--ink-050:#07070b; /* latar         */
```

**Ganti karya** — Timpa `assets/img/work-01…06`. Rasio ideal **9:16**, sediakan
`.webp` dan `.jpg`. Judul dan deskripsi karya diubah di `index.html` + `i18n.js`.

**Ganti kontak** — Ubah `mailto:` dan tautan sosial di section `#contact`, lalu
tempatkan file CV pada tautan tombol *Unduh CV*.

---

## 🌐 Deploy ke GitHub Pages

`Settings → Pages → Source: Deploy from a branch → main / (root)`

---

## 📄 Lisensi

Kode bebas dipakai ulang. Gambar karya adalah placeholder hasil generasi AI —
ganti dengan karyamu sendiri sebelum dipublikasikan.
