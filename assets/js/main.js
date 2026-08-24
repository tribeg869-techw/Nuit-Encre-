/* ==========================================================================
   NUIT-ENCRE — interaksi (mobile first, tanpa hover)
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D  = window.NE;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pic = (n, alt) =>
    `<picture>
       <source srcset="assets/img/${n}.webp" type="image/webp">
       <img src="assets/img/${n}.jpg" alt="${alt}" loading="lazy" decoding="async">
     </picture>`;

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
      ${pic(w.cover, w.title)}
      <span class="wk__go">Kunjungi <span>↗</span></span>
    </a>
    <div class="wk__body">
      <dl class="wk__facts rv">
        ${w.facts.map(f => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join('')}
      </dl>
      <div class="wk__story rv">
        ${w.story.map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>`;

  /* ---------- 003 · STUDI — galeri geser ---------- */
  const view  = $('#galView');
  const track = $('#galTrack');
  const S = D.studies;

  track.innerHTML = S.map((s, i) => `
    <figure class="gs${i === 0 ? ' on' : ''}" data-n="${i}">
      <div class="gs__fig">
        <span class="gs__i">${s.no}</span>
        ${pic(s.img, s.title)}
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

  /* ---------- META ---------- */
  $('#heroStatus').textContent = D.meta.status;
  $('#slabMail').textContent = D.meta.email;
  $('#slab').href = 'mailto:' + D.meta.email;
  const sm = $('#sheetMail');
  sm.textContent = D.meta.email;
  sm.href = 'mailto:' + D.meta.email;
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- BOOT ---------- */
  const boot = $('#boot'), bBar = $('#bootBar'), bPct = $('#bootPct');
  const dur = reduced ? 200 : 1100;
  const t0 = performance.now();
  document.body.style.overflow = 'hidden';

  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    bBar.style.width = (p * 100).toFixed(1) + '%';
    bPct.textContent = String(Math.round(p * 100)).padStart(3, '0');
    if (p < 1) return requestAnimationFrame(step);
    setTimeout(() => {
      boot.classList.add('off');
      document.body.style.overflow = '';
    }, reduced ? 0 : 220);
  })(t0);

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

    /* — bentuk tinta: gumpalan yang saling bertaut — */
    const N = 72 + Math.floor(rnd() * 38);
    const blobs = [];
    const armA = rnd() * Math.PI * 2;
    const armK = 2 + Math.floor(rnd() * 3);
    const sway = .55 + rnd() * .9;

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const ang = armA + t * Math.PI * armK * 2;
      const rad = Math.pow(t, .62) * (.34 + rnd() * .12);
      blobs.push({
        bx: .5 + Math.cos(ang) * rad * sway,
        by: .5 + Math.sin(ang) * rad,
        r : .012 + Math.pow(rnd(), 2.1) * .1,
        p : rnd() * Math.PI * 2,
        s : .25 + rnd() * .5,
        d : .35 + rnd() * .65
      });
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
      const reach = S * (reduced ? 1.5 : .65);
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
        // .34 menjaga kecerahan tetap seperti sebelumnya walau kanvas kini
        // setinggi hero; mode 'lighter' menumpuk, tanpa ini pusatnya putih pol
        g.addColorStop(0,   `rgba(250,250,250,${(.34 * f).toFixed(4)})`);
        g.addColorStop(.45, `rgba(190,190,190,${(.11 * f).toFixed(4)})`);
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
