/* ==========================================================================
   NUIT-ENCRE — interaksi
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D  = window.NE_DATA;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pic = (name, alt, extra = '') =>
    `<picture>
       <source srcset="assets/img/${name}.webp" type="image/webp">
       <img src="assets/img/${name}.jpg" alt="${alt}" loading="lazy" decoding="async" ${extra}>
     </picture>`;

  /* ---------- 1. RENDER: MEJA ---------- */
  $('#deskTrack').innerHTML = D.artifacts.map(a => `
    <article class="art">
      <div class="art__fig">
        <span class="art__kind">${a.kind}</span>
        ${pic(a.img, a.title)}
        ${a.note ? `<p class="art__note">${a.note}</p>` : ''}
      </div>
      <div class="art__meta">
        <span class="art__id">${a.id}</span>
        <span class="art__date">${a.date}</span>
      </div>
      <h3 class="art__title">${a.title}</h3>
      <p class="art__tags">${a.tags}</p>
    </article>`).join('');

  $('#deskCount').textContent = String(D.artifacts.length).padStart(2, '0') + ' ARTEFAK';

  /* ---------- 2. RENDER: YANG SELESAI ---------- */
  const w = D.work;
  $('#work').innerHTML = `
    <div class="work__top rv">
      <span class="work__no">${w.index}</span>
      <span class="work__yr">${w.year}</span>
      <span class="work__kind">${w.kind}</span>
    </div>
    <h3 class="work__title rv">${w.title}<span class="work__cjk">${w.cjk}</span></h3>
    <a class="work__fig rv" href="${w.url}" target="_blank" rel="noopener">
      ${pic(w.cover, w.title + ' — tangkapan layar')}
    </a>
    <div class="work__body">
      <p class="work__lede rv">${w.lede}</p>
      <div class="work__story rv">
        ${w.story.map(p => `<p>${p}</p>`).join('')}
        <a class="work__go" href="${w.url}" target="_blank" rel="noopener">
          Kunjungi situs <span>↗</span>
        </a>
      </div>
    </div>`;

  /* ---------- 3. RENDER: KOLOFON + META ---------- */
  $('#colo').innerHTML = D.colophon
    .map(c => `<div class="rv"><dt>${c.k}</dt><dd>${c.v}</dd></div>`).join('');

  $('#hudStatus').textContent = D.meta.status;
  const mail = $('#mail');
  mail.href = 'mailto:' + D.meta.email;
  mail.textContent = D.meta.email;
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- 4. INTRO ---------- */
  const intro = $('#intro'), bar = $('#introBar'), count = $('#introCount');
  let p = 0;
  const dur = reduced ? 240 : 1500;
  const t0 = performance.now();

  (function tick(now) {
    p = Math.min(1, (now - t0) / dur);
    bar.style.width = (p * 100).toFixed(1) + '%';
    count.textContent = String(Math.round(p * 100)).padStart(2, '0');
    if (p < 1) return requestAnimationFrame(tick);
    setTimeout(() => {
      intro.classList.add('gone');
      document.body.style.overflow = '';
    }, reduced ? 0 : 320);
  })(t0);
  document.body.style.overflow = 'hidden';

  /* ---------- 5. JAM ---------- */
  const clock = $('#hudClock');
  (function run() {
    clock.textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta', hour12: false,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(new Date());
    setTimeout(run, 1000);
  })();

  /* ---------- 6. REVEAL ---------- */
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

  $$('.rv, .art, .s05').forEach((el, i) => {
    el.style.transitionDelay = (i % 5) * 60 + 'ms';
    io.observe(el);
  });

  /* ---------- 7. SCROLL: rail + penanda bagian ---------- */
  const rail = $('#railFill');
  const secEl = $('#hudSec');
  const secs = $$('[data-sec]');
  let tick2 = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    rail.style.height = (max > 0 ? (y / max) * 100 : 0) + '%';

    let cur = '00';
    secs.forEach(s => { if (y >= s.offsetTop - innerHeight * .4) cur = s.dataset.sec; });
    secEl.textContent = cur + ' / 05';
    tick2 = false;
  }
  addEventListener('scroll', () => {
    if (!tick2) { requestAnimationFrame(onScroll); tick2 = true; }
  }, { passive: true });
  onScroll();

  /* ---------- 8. MEJA: seret & gulir mendatar ---------- */
  const desk = $('#desk');
  let down = false, sx = 0, sl = 0, moved = 0;

  desk.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;      // sentuh: biarkan native
    down = true; moved = 0;
    sx = e.clientX; sl = desk.scrollLeft;
    desk.classList.add('grabbing');
  });
  addEventListener('pointerup', () => { down = false; desk.classList.remove('grabbing'); });
  addEventListener('pointermove', e => {
    if (!down) return;
    const d = e.clientX - sx;
    moved += Math.abs(d);
    desk.scrollLeft = sl - d;
  });
  // cegah klik tak sengaja setelah menyeret
  desk.addEventListener('click', e => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);

  // roda vertikal → gulir mendatar, hanya jika masih ada sisa
  desk.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = desk.scrollWidth - desk.clientWidth;
    const next = desk.scrollLeft + e.deltaY;
    if (next > 0 && next < max) { e.preventDefault(); desk.scrollLeft = next; }
  }, { passive: false });

  /* ---------- 9. GULIR HALUS ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }));
})();
