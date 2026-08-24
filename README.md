# NUIT-ENCRE

> **Visual / Concept Designer** — studi tentang bentuk, ruang, dan atmosfer.

Situs satu halaman, **mobile-first**, monokrom penuh, tanpa framework.

Alasan setiap keputusan ada di **[`CONCEPT.md`](CONCEPT.md)**.

---

## Dibangun untuk ponsel, bukan diperkecil dari desktop

Dirancang pada lebar **360px** lebih dulu. Layar besar hanyalah pelebaran.

- **Navigasi di bawah** — zona jangkauan ibu jari, bukan pojok atas
- **Ketuk, bukan hover** — nol aturan `hover` di seluruh CSS; setiap catatan
  studi dibuka dengan ketukan
- **Gulir vertikal saja** — tanpa seret mendatar atau gestur yang perlu dipelajari
- **Sasaran sentuh ≥ 44px**
- **`100dvh`** agar tidak terpotong bilah alamat peramban
- **`safe-area-inset`** dihormati untuk ponsel berponi

---

## Identitasnya sendiri

Berbeda dari **Concept Archive** — dan bukan tiruan **huyml.co**.

| | Concept Archive | huyml.co | **NUIT-ENCRE** |
|---|---|---|---|
| Latar | Kertas terang | Abu terang | **Hitam murni** |
| Aksen | Cinnabar merah | — | **Tanpa warna** — inversi blok putih |
| Aksara | 中文 | — | **Tanpa CJK** |
| Navigasi | — | Baris tengah | **Bilah bawah tetap** |
| Galeri | — | Seret mendatar | **Tumpukan vertikal** |
| Indeks | `01—06` | `01/19` | **`001 / 005`** |

Aksennya bukan warna, melainkan **inversi**: blok putih penuh dengan teks hitam.
Lebih tegas, dan tidak mungkin tertukar dengan Concept Archive.

---

## Susunan

| | Bagian |
|---|---|
| `001` | Pembuka — nama besar, status, jam |
| `002` | Karya — Concept Archive |
| `003` | Studi — 8 kartu, ketuk untuk catatan |
| `004` | Praktik |
| `005` | Kontak |

---

## Struktur

```
.
├── CONCEPT.md
├── index.html
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── data.js      ← SEMUA ISI ADA DI SINI
    │   └── main.js
    └── img/             # .webp + .jpg
```

---

## Menjalankan

```bash
python3 -m http.server 3000
```

Tanpa build step, tanpa dependency.

---

## Menambah studi

Semua isi terpusat di **`assets/js/data.js`**:

```js
{ no:'009', title:'Judul', tag:'FORM', img:'st-09',
  note:'Satu kalimat catatan.' }
```

Taruh `st-09.webp` dan `st-09.jpg` di `assets/img/`.

> **Gambar sekarang placeholder AI.** Ganti dengan studi asli kamu.
> Email dan cerita Concept Archive juga masih perlu dikoreksi.

---

## Deploy

Cloudflare Pages atau GitHub Pages, langsung dari root.
