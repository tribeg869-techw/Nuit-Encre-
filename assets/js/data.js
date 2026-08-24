/* ==========================================================================
   NUIT-ENCRE — sumber data tunggal
   --------------------------------------------------------------------------
   Untuk menambah artefak baru: salin satu objek di ARTIFACTS, ubah isinya,
   letakkan di urutan paling atas. Nomor NE dan tanggal ditulis manual.
   ========================================================================== */

window.NE_DATA = {

  /* ---- identitas ---------------------------------------------------- */
  meta: {
    name:      'Nuit-Encre',
    cjk:       '夜墨',
    role:      'Visual / Concept Designer',
    roleCjk:   '视觉设计',
    location:  'Indonesia',
    email:     'halo@nuit-encre.studio',
    status:    'Terbuka untuk percakapan',
    statusEn:  'OPEN FOR CONVERSATIONS'
  },

  /* ---- 02 · MEJA ------------------------------------------------------
     kind : 'palette' | 'ink' | 'type' | 'layout' | 'sketch' | 'light' | 'note'
     note : boleh dikosongkan — tidak semua artefak perlu dijelaskan
  --------------------------------------------------------------------- */
  artifacts: [
    {
      id: 'NE—014', date: '12.08.2026', period: '2026',
      title: 'Uji palet', kind: 'PALETTE',
      tags: 'paper / ink / cinnabar',
      img: 'artifact-01',
      note: 'Mencari merah yang tidak berteriak. Yang keenam akhirnya dipakai.'
    },
    {
      id: 'NE—013', date: '09.08.2026', period: '2026',
      title: 'Studi tinta', kind: 'INK',
      tags: 'satu tarikan, kuas kering',
      img: 'artifact-02',
      note: 'Sebelas percobaan. Hanya satu yang tidak ragu.'
    },
    {
      id: 'NE—012', date: '03.08.2026', period: '2026',
      title: 'Spesimen huruf', kind: 'TYPE',
      tags: 'kontras tinggi, studi 1',
      img: 'artifact-03',
      note: ''
    },
    {
      id: 'NE—011', date: '28.07.2026', period: '2026',
      title: 'Layout dibuang', kind: 'LAYOUT',
      tags: 'terlalu ramai',
      img: 'artifact-04',
      note: 'Disimpan justru karena gagal. Ia menjelaskan kenapa yang sekarang berhasil.'
    },
    {
      id: 'NE—009', date: '14.07.2026', period: '2026',
      title: 'Studi bentuk', kind: 'SKETCH',
      tags: 'pensil, thumbnail',
      img: 'artifact-05',
      note: ''
    },
    {
      id: 'NE—006', date: '30.06.2026', period: '2026',
      title: 'Cahaya & lipatan', kind: 'LIGHT',
      tags: 'kertas, bayangan diagonal',
      img: 'artifact-06',
      note: 'Bentuk paling sederhana pun punya ruang, asal diberi arah cahaya.'
    },
    {
      id: 'NE—002', date: '11.06.2026', period: '2026',
      title: 'Catatan', kind: 'NOTE',
      tags: 'sebelum ada bentuk',
      img: 'artifact-07',
      note: ''
    }
  ],

  /* ---- 03 · YANG SELESAI --------------------------------------------- */
  work: {
    index:  '01',
    title:  'Concept Archive',
    cjk:    '概念档案',
    kind:   'Self-initiated / Concept Study',
    year:   '2026',
    url:    'https://concept-archive.pages.dev/',
    cover:  'archive-cover',
    lede:   'Arsip studi visual mandiri tentang bentuk, ruang, tipografi, dan atmosfer.',
    story: [
      'Berawal dari satu keresahan: terlalu banyak karya dibuat untuk menarik perhatian, bukan untuk ditinggali. Aku ingin tahu apa jadinya kalau sebuah situs sengaja dibuat pelan.',
      'Palet dikunci sejak awal — kertas, tinta, dan satu merah. Merah itu tidak boleh muncul lebih dari beberapa kali di seluruh halaman. Begitu ia sering, ia berhenti berarti.',
      'Bahasa Indonesia dan 中文 dipakai berdampingan bukan untuk menerjemahkan, melainkan sebagai tekstur. Karakter Tionghoa di sana berperan sebagai bentuk, bukan sebagai informasi.',
      'Bagian yang paling lama dikerjakan justru yang paling tidak terlihat: jarak. Berapa napas antara satu bagian dan bagian berikutnya, kapan pembaca boleh berhenti.',
      'Yang dibuang: menu navigasi, animasi masuk pada setiap elemen, dan halaman "layanan". Ketiganya membuat arsip terasa seperti brosur.',
      'Yang dipelajari: menahan diri jauh lebih sulit daripada menambah.'
    ]
  },

  /* ---- 04 · KOLOFON ---------------------------------------------------- */
  colophon: [
    { k: 'Tipografi',  v: 'Instrument Serif · Inter · JetBrains Mono' },
    { k: 'Aksara',     v: 'Noto Serif SC' },
    { k: 'Dibangun',   v: 'HTML, CSS, JavaScript — tanpa framework' },
    { k: 'Ukuran',     v: 'Di bawah 1 MB pada muat pertama' },
    { k: 'Ditulis di', v: 'Visual Studio Code, larut malam' },
    { k: 'Warna',      v: 'Nuit #0C0A09 · Paper #F2EDE4 · Cinnabar #C8402F' }
  ]
};
