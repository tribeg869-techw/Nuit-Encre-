# Nuit-Encre 夜墨

> Meja kerja seorang **Visual / Concept Designer** — bukan galeri.

Situs satu halaman bertema gelap hangat, dibangun tanpa framework.
Induk dari [Concept Archive](https://concept-archive.pages.dev/).

Perencanaan lengkap beserta alasan setiap keputusan ada di **[`CONCEPT.md`](CONCEPT.md)**.

---

## Gagasan

Karya yang sudah jadi baru satu. Maka situs ini **tidak disusun per-project** —
ia disusun **per-artefak**: uji palet, studi tinta, spesimen huruf, layout yang
dibuang, catatan.

Concept Archive lalu berdiri sebagai **satu-satunya yang lulus** menjadi karya
utuh. Posisinya justru menguat, bukan melemah. Kekurangan diubah jadi narasi.

---

## Susunan halaman

| | Bagian | Isi |
|---|---|---|
| `00` | Pembuka | `Nuit Encre` raksasa, indeks bernomor |
| `01` | Praktik | Dua paragraf posisi — bukan CV |
| `02` | **Meja** | Dinding artefak yang diseret mendatar — **jantung situs** |
| `03` | Yang Selesai | Concept Archive + cerita di baliknya |
| `04` | Kolofon | Alat, huruf, dan cara situs ini dibangun |
| `05` | Penutup | Satu kalimat, satu alamat |

---

## Detail

- **Gelap hangat** — `#0C0A09`, bukan hitam kebiruan, agar sekeluarga dengan kertas hangat Concept Archive
- **Cinnabar `#C8402F`** — satu-satunya aksen, sengaja dipakai sangat sedikit
- **`夜墨`** — Concept Archive memakai `墨`; induknya menambahkan `夜`
- **Kronologi, bukan taksonomi** — anak memakai indeks `01—06`, induk memakai catatan bertanggal
- **HUD sudut** — jam Jakarta berjalan, status, penanda bagian
- **Meja bisa diseret** — pointer drag, roda mouse, dan sentuh
- **Dwibahasa sebagai tekstur** — Indonesia + 中文 tanpa tombol ganti bahasa, mengikuti Concept Archive
- Aset di bawah 1 MB pada muat pertama · `prefers-reduced-motion` dihormati

---

## Struktur

```
.
├── CONCEPT.md              # dokumen konsep & alasan keputusan
├── index.html              # kerangka — hampir seluruh isi dari data.js
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── data.js         # ← SEMUA ISI ADA DI SINI
    │   └── main.js         # interaksi
    └── img/                # .webp + .jpg
```

---

## Menjalankan

```bash
python3 -m http.server 3000
```

Tanpa build step, tanpa dependency.

---

## Menambah artefak

Semua isi terpusat di **`assets/js/data.js`**. Tambahkan satu objek di urutan
paling atas `artifacts`:

```js
{
  id: 'NE—015', date: '20.08.2026', period: '2026',
  title: 'Judul artefak', kind: 'SKETCH',
  tags: 'keterangan singkat',
  img: 'artifact-08',          // taruh artifact-08.webp + .jpg di assets/img/
  note: ''                     // boleh kosong — tidak semua perlu dijelaskan
}
```

Ganti pula email dan status di objek `meta`.

> **Gambar saat ini adalah placeholder hasil generasi AI.** Ganti dengan foto
> artefak asli — sketsa, uji warna, screenshot proses. Tanpa itu, bagian `02`
> kehilangan seluruh maknanya.

---

## Deploy

Cloudflare Pages atau GitHub Pages, langsung dari root. Tidak ada yang perlu
dikompilasi.
