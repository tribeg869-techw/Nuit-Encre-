# NUIT-ENCRE

> **Visual / Concept Designer** — studi tentang bentuk, ruang, dan atmosfer.

Situs satu halaman, **mobile-first**, monokrom penuh, tanpa framework.

Alasan setiap keputusan ada di **[`CONCEPT.md`](CONCEPT.md)**.

---

## Dibangun untuk ponsel, bukan diperkecil dari desktop

Dirancang pada lebar **360px** lebih dulu. Layar besar hanyalah pelebaran.

- **Navigasi di bawah** — zona jangkauan ibu jari, bukan pojok atas
- **Layar pembuka beranimasi** — setetes tinta putih jatuh, merembes naik
  memenuhi layar, lalu dibelah tiga dan didorong keluar mengungkap hero (2,16s)
- **Void yang disingkap sentuhan** — mengisi **seluruh latar hero**, bukan
  kotak tersendiri. Tinta berserat yang dibangkitkan acak tiap kunjungan
  (`SPESIMEN 4A7F—2147`), hanya muncul mengikuti jari, dan bergeser saat
  ponsel dimiringkan
- **Nol aturan `hover`** di seluruh CSS — tidak ada isi yang tersembunyi
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
| Indeks | `01—06` | `01/19` | **`001 / 005`** |

Aksennya bukan warna, melainkan **inversi**: blok putih penuh dengan teks hitam.
Lebih tegas, dan tidak mungkin tertukar dengan Concept Archive.

Gerakannya pun dibedakan: **pembuka = tinta bergerak, hero = tinta mengendap**.
Keduanya memakai mesin filamen yang sama, jadi seratnya satu bahasa.

---

## Susunan

| | Bagian |
|---|---|
| `001` | Pembuka — nama besar di atas **void** generatif setinggi layar, status, jam |
| `002` | Karya — Concept Archive + Ink Chaos + Lexier + Zestpop + Vellichor + Élan + BARA |
| `003` | Studi — galeri geser, 4 kartu |
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

Galeri, penghitung, dan bilah kemajuan menyesuaikan sendiri.

Taruh `st-09.webp` dan `st-09.jpg` di `assets/img/`.

> **Gambar sekarang placeholder AI.** Ganti dengan studi asli kamu.
> Email dan cerita Concept Archive juga masih perlu dikoreksi.

---

## Deploy

Cloudflare Pages atau GitHub Pages, langsung dari root.
