# NUIT-ENCRE

> **Visual / Concept Designer** — studi tentang bentuk, ruang, dan atmosfer.

Situs satu halaman, **mobile-first**, monokrom penuh, tanpa framework.

Alasan setiap keputusan ada di **[`CONCEPT.md`](CONCEPT.md)**.

---

## Dibangun untuk ponsel, bukan diperkecil dari desktop

Dirancang pada lebar **360px** lebih dulu. Layar besar hanyalah pelebaran —
tapi pelebaran yang selesai: tablet (≥720px) dan desktop (≥1100px) punya tata
letak sendiri, dan interaksi kursor ada di mana ia menambah, tanpa pernah
menyembunyikan sesuatu dari jari.

- **Navigasi di bawah** — zona jangkauan ibu jari, bukan pojok atas
- **Layar pembuka beranimasi** — setetes tinta putih jatuh, merembes naik
  memenuhi layar, lalu dibelah tiga dan didorong keluar mengungkap hero (2,16s)
- **Void yang disingkap sentuhan** — mengisi **seluruh latar hero**, bukan
  kotak tersendiri. Tinta berserat yang dibangkitkan acak tiap kunjungan
  (`SPESIMEN 4A7F—2147`), hanya muncul mengikuti jari, dan bergeser saat
  ponsel dimiringkan. Di desktop: kursor **masuk** hero → tersingkap lembut
  dari tengah; kursor **bergerak** → cahaya penuh mengikutinya
- **Hover hanya sebagai bonus** — setiap `:hover` hidup di dalam
  `@media (hover:hover)` dan punya padanan sentuh; tidak ada isi yang
  hanya bisa dicapai dengan kursor
- **Indeks melar** pada bagian `002` — daftar tipis delapan karya; baris yang
  disentuh (atau dilewati kursor) membuka gambarnya, baris lain mengempis
  jadi garis. Tampilan **LIST / GRID**
- **Galeri geser** pada bagian `003` — snap ke tengah, keterangan berganti
  mengikuti kartu aktif, **loop tak berujung** (geser terus dari kartu
  terakhir ke pertama tanpa lompat balik), lengkap dengan tombol panah
  sebagai cadangan
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
| Galeri | — | Seret mendatar | **Geser + snap tengah** |
| Karya | — | — | **Daftar melar (indeks)** |
| Indeks | `01—06` | `01/19` | **`001 / 005`** |

Aksennya bukan warna, melainkan **inversi**: blok putih penuh dengan teks hitam.
Lebih tegas, dan tidak mungkin tertukar dengan Concept Archive.

Hurufnya tiga keluarga, semuanya tegak — **tanpa italic** di mana pun:
Apfel Grotezk Fett (display), Inter (badan), JetBrains Mono (meta).

Gerakannya pun dibedakan: **pembuka = tinta bergerak, hero = tinta mengendap**.
Keduanya memakai mesin filamen yang sama, jadi seratnya satu bahasa.

---

## Susunan

| | Bagian |
|---|---|
| `001` | Pembuka — nama besar di atas **void** generatif setinggi layar, status, jam |
| `002` | Karya — **INDEKS**: daftar melar ala indeks, 8 karya; hover/ketuk baris membuka gambarnya, LIST/GRID |
| `003` | Studi — galeri geser, 4 kartu |
| `004` | Praktik |
| `005` | Kontak |

---

## Struktur

```
.
├── CONCEPT.md
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── data.js      ← SEMUA ISI ADA DI SINI
│   │   └── main.js
│   └── img/             # .webp + .jpg
└── tools/               # pemroses gambar studi, kartu berbagi, cek-hover
```

---

## Menjalankan

```bash
python3 -m http.server 3000
```

Tanpa build step, tanpa dependency.

---

## Menambah karya

Satu entri di `works[]` dalam **`assets/js/data.js`**:

```js
{ no:'009', title:'Judul', kind:'Jenis', role:'Peran', year:'2026',
  url:'https://…', images:['slug-cover'], alt:'Satu kalimat deskripsi.',
  lede:'…', story:['…'] }
```

`images` maksimal 4 (slot 2–4 mengisi tata letak referensi begitu ada).
Slug tanpa ekstensi = pasangan `.webp` + `.jpg` di `assets/img/`. Counter,
animasi, dan grid menyesuaikan sendiri; hanya kalimat "baru delapan" di
`practice[]` yang masih ditulis tangan.

## Menambah studi

Semua isi terpusat di **`assets/js/data.js`**:

```js
{ no:'009', title:'Judul', tag:'FORM', img:'st-09',
  note:'Satu kalimat catatan.' }
```

Galeri, penghitung, dan bilah kemajuan galeri menyesuaikan sendiri.

Taruh `st-09.webp` dan `st-09.jpg` di `assets/img/`.

> **Gambar sekarang placeholder AI.** Ganti dengan studi asli kamu.
> Email dan cerita Concept Archive juga masih perlu dikoreksi.

---

## Deploy

Cloudflare Pages atau GitHub Pages, langsung dari root.
