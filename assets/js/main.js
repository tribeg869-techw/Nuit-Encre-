/* ==========================================================================
   NUIT-ENCRE — interaksi (mobile first, tanpa hover)
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D  = window.NE;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Kontrak pic(): slug ('st-02') → pasangan webp+jpg;
     nama berekstensi ('foto.png') → berkas apa adanya, tanpa varian webp. */
  const pic = (n, alt, eager = false) => {
    const loading = eager ? 'eager' : 'lazy';
    const priority = eager ? ' fetchpriority="high"' : '';
    return /\.[a-z0-9]{2,4}$/i.test(n)
      ? `<img src="assets/img/${n}" alt="${alt}" loading="${loading}" decoding="async"${priority}>`
      : `<picture>
           <source srcset="assets/img/${n}.webp" type="image/webp">
           <img src="assets/img/${n}.jpg" alt="${alt}" loading="${loading}" decoding="async"${priority}>
         </picture>`;
  };

  /* ---------- 002 · KARYA ---------- */
  const w = D.work;
  $('#work').innerHTML = `
    <div class="wk__top rv">
      <span class="mono">${w.no}</span>
      <span class="mono dim">${w.kind} · ${w.year}</span>
    </div>
    <h2 class="wk__title rv">${w.title}</h2>
    <p class="wk__lede rv">${w.lede}</p>
    <a class="wk__fig rv" href="${w.url}" target="_blank" rel="noopener">
      ${pic(w.cover, w.coverAlt || w.title)}
      <span class="wk__go">Kunjungi <span>↗</span></span>
    </a>
    <div class="wk__body">
      <dl class="wk__facts rv">
        ${w.facts.map(f => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join('')}
      </dl>
      <div class="wk__story rv">
        ${w.story.map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>
    <article class="wk__more rv">
      <div class="wk__top"><span class="mono">${D.workMore.no}</span><span class="mono dim">${D.workMore.kind} · ${D.workMore.year}</span></div>
      <h2 class="wk__title">${D.workMore.title}</h2>
      <p class="wk__lede">${D.workMore.lede}</p>
      <a class="wk__fig" href="${D.workMore.url}" target="_blank" rel="noopener">
        ${pic(D.workMore.cover, D.workMore.coverAlt)}
        <span class="wk__go">Kunjungi <span>↗</span></span>
      </a>
    </article>`;

  /* ---------- 003 · STUDI — galeri geser ---------- */
  const view  = $('#galView');
  const track = $('#galTrack');
  const S = D.studies;

  track.innerHTML = S.map((s, i) => `
    <figure class="gs${i === 0 ? ' on' : ''}" data-n="${i}">
      <div class="gs__fig">
        <span class="gs__i">${s.no}</span>
        ${pic(s.img, s.alt || s.title)}
      </div>
    </figure>`).join('');

  const cards = $$('.gs', track);
  const total = cards.length;
  $('#stCount').textContent = String(total).padStart(2, '0');

  const elNo   = $('#galNo');
  const elTag  = $('#galTag');
  const elTtl  = $('#galTtl');
  const elNote = $('#galNote');
  const elCap  = $('#galCap');
  const elBar  = $('#galBar');
  const bPrev  = $('#galPrev');
  const bNext  = $('#galNext');

  let cur = -1;

  function paint(i) {
    if (i === cur) return;
    cur = i;
    const s = S[i];

    cards.forEach((c, n) => c.classList.toggle('on', n === i));

    elCap.classList.add('sw');
    setTimeout(() => {
      elNo.textContent   = s.no;
      elTag.textContent  = s.tag;
      elTtl.textContent  = s.title;
      elNote.textContent = s.note;
      elCap.classList.remove('sw');
    }, reduced ? 0 : 150);

    elBar.style.width = (100 / total) + '%';
    elBar.style.transform = `translateX(${i * 100}%)`;

    bPrev.disabled = i === 0;
    bNext.disabled = i === total - 1;
  }

  // kartu mana yang paling dekat ke tengah jendela
  // jarak kartu dari tepi kiri isi yang bisa digulir
  function startOf(c) {
    return c.getBoundingClientRect().left
         - view.getBoundingClientRect().left
         + view.scrollLeft;
  }

  function nearest() {
    const mid = view.scrollLeft + view.clientWidth / 2;
    let best = 0, gap = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(startOf(c) + c.offsetWidth / 2 - mid);
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  }

  function goTo(i) {
    const c = cards[Math.max(0, Math.min(total - 1, i))];
    const max = view.scrollWidth - view.clientWidth;
    const to  = startOf(c) - (view.clientWidth - c.offsetWidth) / 2;
    view.scrollTo({
      left: Math.max(0, Math.min(max, to)),
      behavior: reduced ? 'auto' : 'smooth'
    });
  }

  let raf = false;
  view.addEventListener('scroll', () => {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => { paint(nearest()); raf = false; });
  }, { passive: true });

  bPrev.addEventListener('click', () => goTo(cur - 1));
  bNext.addEventListener('click', () => goTo(cur + 1));

  // seret dengan mouse — di layar sentuh, biarkan native
  let down = false, sx = 0, sl = 0, far = 0;
  view.addEventListener('dragstart', e => e.preventDefault());
  view.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    down = true; far = 0;
    sx = e.clientX; sl = view.scrollLeft;
    view.classList.add('drag');
    view.setPointerCapture(e.pointerId);
  });
  view.addEventListener('pointermove', e => {
    if (!down) return;
    const d = e.clientX - sx;
    far += Math.abs(d);
    view.scrollLeft = sl - d;
  });
  function release() {
    if (!down) return;
    down = false;
    view.classList.remove('drag');
    goTo(nearest());
  }
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);

  // panah kiri / kanan
  addEventListener('keydown', e => {
    if (!$('#sheet').hidden) return;
    const r = $('#s3').getBoundingClientRect();
    if (r.top > innerHeight * .6 || r.bottom < innerHeight * .4) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(cur - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(cur + 1); }
  });

  paint(0);

  /* ---------- 004 · PRAKTIK ---------- */
  $('#practice').innerHTML = D.practice.map(p => `<p class="rv">${p}</p>`).join('');
  $('#practiceIndex').innerHTML = `
    <p class="practice-index__label mono">INDEKS PRAKTIK</p>
    <ol>${D.practiceIndex.map(item => `
      <li class="practice-index__item rv">
        <span class="practice-index__no mono">${item.no}</span>
        <div><h3>${item.title}</h3><p>${item.note}</p></div>
      </li>`).join('')}</ol>`;

  /* ---------- META ---------- */
  $('#heroStatus').textContent = D.meta.status;
  $('#slabMail').textContent = D.meta.email;
  $('#slab').href = 'mailto:' + D.meta.email;
  const sm = $('#sheetMail');
  sm.textContent = D.meta.email;
  sm.href = 'mailto:' + D.meta.email;
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- BOOT ----------
     Adegan pembuka, bukan bar tunggu: setetes tinta putih jatuh,
     menghantam dasar, lalu merembes NAIK memenuhi layar dengan tepian
     berserat. Setelah penuh, massa tinta itu dibelah tiga dan didorong
     keluar — hero sudah hidup di baliknya.                             */
  const t0 = performance.now();
  const boot = $('#boot'), bBar = $('#bootBar'), bPct = $('#bootPct');

  /* Jaring pengaman terakhir: isi hero menunggu kelas .ready, jadi
     bila adegan boot macet di tengah jalan (error, tab dilatarkan,
     rAF tak pernah jalan) hero akan tersembunyi selamanya. Setelah
     4 detik singkap paksa, apa pun yang terjadi. */
  const failsafe = setTimeout(function () {
    if (!document.body.classList.contains('ready')) bootDone();
  }, 4000);
  const bc   = $('#bootC');
  document.body.style.overflow = 'hidden';

  function bootDone() {
    boot.classList.add('off');
    document.body.style.overflow = '';
    /* Penanda tirai sudah tersingkap. Animasi hero digantung padanya
       supaya tidak habis di balik layar boot. Wajib dipasang di
       SETIAP jalur keluar, termasuk saat gerak diredam. */
    document.body.classList.add('ready');
    clearTimeout(failsafe);
  }

  const bx = bc && bc.getContext ? bc.getContext('2d') : null;

  if (reduced || !bx) {
    /* gerak diredam: tanpa adegan, cukup singkap cepat */
    bBar.style.width = '100%';
    bPct.textContent = '100';
    setTimeout(bootDone, 200);
  } else {
    let W = 0, H = 0;

    function bsize() {
      W = innerWidth; H = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      bc.width = W * dpr; bc.height = H * dpr;
      bx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    bsize();
    addEventListener('resize', bsize, { passive: true });

    /* — acak deterministik, sama seperti void — */
    let rs = (Date.now() ^ (Math.random() * 0xFFFFFF)) >>> 0;
    const rnd = () => {
      rs |= 0; rs = rs + 0x6D2B79F5 | 0;
      let x = Math.imul(rs ^ rs >>> 15, 1 | rs);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };

    /* tepian bergelombang — dihitung sekali, dipakai tiap frame */
    const wob = [];
    for (let i = 0; i < 5; i++)
      wob.push({ a: 4 + rnd() * 9, k: .004 + rnd() * .012, p: rnd() * Math.PI * 2 });
    const frontY = (x, t) => {
      let o = 0;
      for (const w of wob) o += Math.sin(x * w.k + w.p + t * .0012) * w.a;
      return o;
    };

    /* sulur berserat yang menjalar di atas permukaan tinta */
    const tend = [];
    for (let i = 0; i < 18; i++) {
      const nodes = [];
      let dx = 0, dy = 0, dir = -Math.PI / 2 + (rnd() - .5) * .8;
      const step = 7 + rnd() * 9, n = 5 + Math.floor(rnd() * 7);
      for (let j = 0; j < n; j++) {
        dir += (rnd() - .5) * .95;
        dx += Math.cos(dir) * step;
        dy += Math.sin(dir) * step;
        const taper = 1 - j / n;
        nodes.push({ dx, dy, r: (3 + rnd() * 7) * (.35 + taper * .65) });
      }
      tend.push({ x: rnd(), rise: .45 + rnd() * .55, nodes });
    }

    const eOut  = p => 1 - Math.pow(1 - p, 3);
    const eIn   = p => p * p;
    const smoot = p => p * p * (3 - 2 * p);
    const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

    const DROP = 420, FILL_A = 400, FILL_B = 1200, CUT = 1260, END = 2160;
    const OVER = 60;   // tinta dilebihkan agar puncak layar tak berlubang
    const BANDS = 3;

    /* menggambar massa tinta pada keadaan waktu t */
    function ink(t) {
      const f = eOut(seg(t, FILL_A, FILL_B));          // ketinggian rembesan
      if (f <= 0) return;
      const lvl = H - (H + OVER) * f;

      bx.fillStyle = '#fff';

      /* badan tinta */
      bx.beginPath();
      bx.moveTo(0, H);
      bx.lineTo(0, lvl + frontY(0, t));
      for (let x = 0; x <= W; x += 8) bx.lineTo(x, lvl + frontY(x, t));
      bx.lineTo(W, H);
      bx.closePath();
      bx.fill();

      /* sulur — hanya muncul setelah rembesan melewati ambangnya */
      for (const s of tend) {
        const g = seg(f, s.rise - .45, s.rise + .2);
        if (g <= 0) continue;
        const ox = s.x * W, oy = lvl + frontY(ox, t) + 4;
        const lim = g * s.nodes.length;
        for (let j = 0; j < s.nodes.length; j++) {
          if (j > lim) break;
          const nd = s.nodes[j];
          const fade = Math.min(1, lim - j);
          bx.globalAlpha = fade;
          bx.beginPath();
          bx.arc(ox + nd.dx, oy + nd.dy, nd.r, 0, Math.PI * 2);
          bx.fill();
        }
        bx.globalAlpha = 1;
      }
    }

    /* tetesan yang jatuh sebelum tinta menggenang */
    function drop(t) {
      const p = seg(t, 0, DROP);
      if (p <= 0 || p >= 1) return;
      const y  = -30 + (H + 30) * eIn(p);
      const st = 1 + eIn(p) * 2.2;                     // memanjang saat cepat
      bx.fillStyle = '#fff';
      bx.save();
      bx.translate(W * .5, y);
      bx.scale(1, st);
      bx.beginPath();
      bx.arc(0, 0, 6.5, 0, Math.PI * 2);
      bx.fill();
      bx.restore();
    }

    let cut = false;

    (function frame(now) {
      const t = now - t0;
      bx.clearRect(0, 0, W, H);

      if (t < CUT) {
        drop(t);
        ink(t);
      } else {
        /* dibelah tiga, tiap panel didorong keluar bergantian arah */
        if (!cut) {
          cut = true;
          boot.classList.add('cut');
          /* Latar boot menjadi transparan di sini, jadi hero langsung
             terlihat di sela panel. Efek singkap wordmark harus mulai
             SEKARANG — bila menunggu bootDone() di t=END, pengguna
             melihat teks utuh dulu selama 900ms lalu efeknya mengulang
             dari nol. Itulah lompatan yang terlihat salah. */
          document.body.classList.add('ready');
        }
        const bh = H / BANDS;
        for (let i = 0; i < BANDS; i++) {
          const st = CUT + i * 110;
          const p = smoot(seg(t, st, st + 620));
          if (p >= 1) continue;
          const dir = i % 2 ? 1 : -1;
          bx.save();
          bx.beginPath();
          bx.rect(0, i * bh, W, bh + 1);
          bx.clip();
          bx.translate(dir * p * W * 1.3, 0);
          ink(CUT);
          bx.restore();
        }
      }

      const q = Math.min(1, t / CUT);
      bBar.style.width = (q * 100).toFixed(1) + '%';
      bPct.textContent = String(Math.round(q * 100)).padStart(3, '0');

      if (t < END) return requestAnimationFrame(frame);
      bootDone();
    })(performance.now());
  }

  /* ---------- JAM ---------- */
  const clock = $('#heroClock');
  (function run() {
    clock.textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit'
    }).format(new Date()) + ' WIB';
    setTimeout(run, 15000);
  })();

  /* ---------- MENU ---------- */
  const sheet = $('#sheet'), dockB = $('#dockB');
  const setSheet = on => {
    sheet.hidden = !on;
    document.body.style.overflow = on ? 'hidden' : '';
    dockB.textContent = on ? 'TUTUP' : 'MENU';
  };
  dockB.addEventListener('click', () => setSheet(sheet.hidden));
  $('#sheetX').addEventListener('click', () => setSheet(false));
  $$('.sheet__nav a').forEach(a => a.addEventListener('click', () => setSheet(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) setSheet(false); });

  /* ---------- REVEAL ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });
    $$('.rv').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 55 + 'ms';
      io.observe(el);
    });
  } else {
    $$('.rv').forEach(el => el.classList.add('in'));
  }

  /* ---------- VOID · kamar gelap + spesimen generatif ----------
     Tiga lapis yang bercerita satu hal:
       03 · spesimen  — bentuk tinta acak, tak pernah sama dua kali
       02 · kamar gelap — hanya tersingkap oleh cahaya yang mengikuti jari
       01 · gravitasi  — miringkan HP, tinta ikut bergeser (opsional)
  --------------------------------------------------------------- */
  (function voidRoom() {
    const wrap = $('#void');
    const cv   = $('#voidC');
    if (!wrap || !cv || !cv.getContext) return;

    const ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1;

    /* — benih: satu kunjungan, satu spesimen — */
    const seed = (Date.now() ^ (Math.random() * 0xFFFFFF)) >>> 0;
    let rs = seed || 1;
    const rnd = () => {                       // mulberry32
      rs |= 0; rs = rs + 0x6D2B79F5 | 0;
      let t = Math.imul(rs ^ rs >>> 15, 1 | rs);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const code = seed.toString(16).toUpperCase().padStart(8, '0').slice(0, 4)
               + '—' + seed.toString(36).toUpperCase().slice(-4);
    $('#voidId').textContent = 'SPESIMEN ' + code;

    /* — bentuk tinta: filamen bercabang —
       Untai induk mengalir, lalu menumbuhkan cabang halus yang
       menjalar keluar seperti tinta merembes di air. Cabang inilah
       yang memberi kesan berserat; percikan saja hanya jadi debu.  */
    const blobs = [];
    const strands = 10 + Math.floor(rnd() * 3);
    const flowA = rnd() * Math.PI * 2;

    function grow(px, py, dir, nodes, step, thick, gen) {
      for (let i = 0; i < nodes; i++) {
        const u = i / nodes;

        // cabang meliuk lebih liar daripada induknya
        dir += (rnd() - .5) * (gen ? 1.25 : .85);
        px += Math.cos(dir) * step;
        py += Math.sin(dir) * step * .72;

        // menipis di ujung, tapi tidak pernah hilang sama sekali
        const taper = Math.sin(Math.PI * Math.min(1, u * 1.15 + .12));
        blobs.push({
          bx: px,
          by: py,
          r : thick * (.4 + taper * .6) * (.7 + rnd() * .5),
          p : rnd() * Math.PI * 2,
          s : .18 + rnd() * .34,
          d : .35 + rnd() * .65
        });

        // tumbuhkan cabang — hanya satu tingkat, agar tidak jadi debu
        if (gen < 1 && rnd() < .22) {
          grow(px, py,
               dir + (rnd() < .5 ? 1 : -1) * (.5 + rnd() * .7),
               Math.max(3, Math.floor(nodes * .45)),
               step * .7,
               thick * .42,
               gen + 1);
        }

        // percikan halus — tekstur, bukan struktur
        if (rnd() < .18) {
          blobs.push({
            bx: px + (rnd() - .5) * .1,
            by: py + (rnd() - .5) * .07,
            r : thick * .34 * (.5 + rnd() * .5),
            p : rnd() * Math.PI * 2,
            s : .2 + rnd() * .4,
            d : .4 + rnd() * .6
          });
        }
      }
    }

    for (let k = 0; k < strands; k++) {
      grow(
        .5 + (rnd() - .5) * .55,               // tersebar mendatar
        (k + rnd() * .85) / strands,           // tersebar penuh setinggi hero
        flowA + (rnd() - .5) * 1.5 + (k % 2 ? Math.PI : 0),
        13 + Math.floor(rnd() * 9),
        .038 + rnd() * .022,
        .1 + rnd() * .08,
        0
      );
    }

    function size() {
      const r = wrap.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    addEventListener('resize', size, { passive: true });

    /* — cahaya: mengikuti jari, memudar bila diam — */
    const light = { x: .5, y: .5, on: 0, want: 0 };
    let lit = false, t0 = performance.now();
    let gx = 0, gy = 0, tgx = 0, tgy = 0;      // gravitasi

    function touch(cx, cy) {
      const r = wrap.getBoundingClientRect();
      light.x = (cx - r.left) / r.width;
      light.y = (cy - r.top) / r.height;
      light.want = 1;
      if (!lit) { lit = true; wrap.classList.add('lit'); }
    }

    wrap.addEventListener('pointermove', e => touch(e.clientX, e.clientY), { passive: true });
    wrap.addEventListener('pointerdown', e => touch(e.clientX, e.clientY), { passive: true });
    wrap.addEventListener('touchmove', e => {
      const t = e.touches[0];
      if (t) touch(t.clientX, t.clientY);
    }, { passive: true });
    wrap.addEventListener('pointerleave', () => { light.want = 0; });
    wrap.addEventListener('touchend',    () => { light.want = 0; });

    /* — giroskop: lapisan bonus, tidak wajib — */
    function gyro(e) {
      const g = e.gamma, b = e.beta;
      if (g == null || b == null) return;
      tgx = Math.max(-1, Math.min(1, g / 38));
      tgy = Math.max(-1, Math.min(1, (b - 42) / 38));
      if (!lit) { lit = true; wrap.classList.add('lit'); }
    }
    if (window.DeviceOrientationEvent) {
      const need = typeof DeviceOrientationEvent.requestPermission === 'function';
      if (!need) {
        addEventListener('deviceorientation', gyro, { passive: true });
      } else {
        // iOS 13+ : hanya boleh diminta dari gestur pengguna
        wrap.addEventListener('pointerdown', function ask() {
          wrap.removeEventListener('pointerdown', ask);
          DeviceOrientationEvent.requestPermission()
            .then(r => { if (r === 'granted') addEventListener('deviceorientation', gyro, { passive: true }); })
            .catch(() => {});
        }, { once: true });
      }
    }

    /* — tanpa sentuhan & tanpa sensor: singkap pelan sendiri — */
    setTimeout(() => {
      if (lit) return;
      lit = true; wrap.classList.add('lit');
      light.want = .34;
    }, 2600);

    if (reduced) {
      lit = true; wrap.classList.add('lit');
      light.want = .5; light.on = .5;
    }

    /* — gambar — */
    function frame(now) {
      requestAnimationFrame(frame);
      if (!W || !H) { size(); return; }

      const t = (now - t0) / 1000;
      light.on += (light.want - light.on) * .06;
      if (light.want > 0 && light.want < 1) light.want *= .999;
      gx += (tgx - gx) * .05;
      gy += (tgy - gy) * .05;

      ctx.clearRect(0, 0, W, H);
      if (light.on < .01) return;

      // acuan persegi: ukuran gumpalan & jangkauan tetap konsisten
      // walau hero jauh lebih tinggi daripada lebar
      const S  = Math.min(W, H);
      const sx = Math.min(W / S, 1.45);
      const sy = Math.min(H / S, 1.45);
      const cx = W / 2, cy = H / 2;

      const lx = (light.x + gx * .16) * W;
      const ly = (light.y + gy * .1) * H;
      const reach = S * (reduced ? 1.5 : .95);
      const drift = reduced ? 0 : 1;

      ctx.globalCompositeOperation = 'lighter';

      for (const b of blobs) {
        const ox = b.bx - .5 + Math.sin(t * b.s + b.p) * .012 * drift + gx * .07 * b.d;
        const oy = b.by - .5 + Math.cos(t * b.s * .8 + b.p) * .012 * drift + gy * .05 * b.d;
        const x = cx + ox * S * sx;
        const y = cy + oy * S * sy;
        const r = b.r * S;

        const d = Math.hypot(x - lx, y - ly);
        let f = 1 - d / reach;
        if (f <= 0) continue;
        f = f * f * light.on;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        // Cabang menambah simpul (103 -> 230), sehingga tumpukan cahaya
        // pada mode 'lighter' naik lagi. Nilai diturunkan agar kecerahan
        // rata-rata tetap ~0.88 — setara tampilan yang sudah disetujui.
        g.addColorStop(0,   `rgba(250,250,250,${(.58 * f).toFixed(4)})`);
        g.addColorStop(.45, `rgba(190,190,190,${(.22 * f).toFixed(4)})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.283);
        ctx.fill();
      }

      // sapuan cahaya itu sendiri
      const halo = ctx.createRadialGradient(lx, ly, 0, lx, ly, reach * .5);
      halo.addColorStop(0, `rgba(250,250,250,${(.05 * light.on).toFixed(4)})`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'source-over';
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- SCROLL ---------- */
  const prog = $('#dockP'), dockI = $('#dockI');
  const secs = $$('[data-i]');
  let t = false;

  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    let cur = '001';
    secs.forEach(s => { if (y >= s.offsetTop - innerHeight * .45) cur = s.dataset.i; });
    dockI.textContent = cur + '/005';
    t = false;
  }
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(onScroll); t = true; } }, { passive: true });
  onScroll();

  /* ---------- GULIR HALUS ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const el = $(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }));
})();
