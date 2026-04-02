// ── TRANSITION OVERLAY ───────────────────────────────────────────────────────
const overlayHTML = `
<div id="pt-overlay" style="
  position:fixed;inset:0;z-index:9000;
  background:#ffffff;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:28px;
  opacity:0;visibility:hidden;
  transition:opacity 0.3s ease,visibility 0.3s ease;
">
  <img src="logo.png" alt="Aphros Swim" style="height:110px;object-fit:contain;filter:drop-shadow(0 4px 16px rgba(0,100,200,.25));"/>

  <div style="position:relative;width:280px;height:80px;overflow:hidden;border-bottom:2.5px solid #0064c8;border-radius:2px 2px 0 0;">
    <div id="pt-water" style="
      position:absolute;bottom:0;left:0;right:0;height:0;
      background:linear-gradient(180deg,rgba(0,100,200,.03) 0%,rgba(0,100,200,.16) 100%);
      transition:height 0.5s cubic-bezier(.4,0,.2,1);
    "></div>
    <svg id="pt-wave" style="position:absolute;bottom:0;left:0;width:100%;height:16px;opacity:0;transition:opacity .4s;" viewBox="0 0 280 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,8 C46,0 92,16 140,8 C188,0 234,16 280,8 L280,16 L0,16Z" fill="rgba(0,100,200,.15)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-35,0;0,0" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
    <svg id="pt-swimmer" style="position:absolute;bottom:22px;left:-90px;transition:left 0.65s cubic-bezier(.4,0,.2,1),opacity .15s;" width="86" height="36" viewBox="0 0 86 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- body -->
      <ellipse cx="42" cy="18" rx="26" ry="8" fill="#1a1a2e" opacity=".88"/>
      <!-- head -->
      <circle cx="67" cy="16" r="9" fill="#1a1a2e" opacity=".88"/>
      <!-- swim cap -->
      <ellipse cx="67" cy="10" rx="8.5" ry="6" fill="#0064c8"/>
      <!-- goggles -->
      <ellipse cx="72" cy="16" rx="3" ry="2.2" fill="white" opacity=".8"/>
      <ellipse cx="72" cy="16" rx="1.5" ry="1.2" fill="#0050a0" opacity=".9"/>
      <!-- arm forward -->
      <rect x="72" y="13.5" width="14" height="5" rx="2.5" fill="#4b5563" opacity=".8"/>
      <!-- fins -->
      <path d="M5 18 L0 9 L16 18 L0 27 Z" fill="#0064c8"/>
      <path d="M10 18 L6 12 L18 18 L6 24 Z" fill="#1a8fe3" opacity=".6"/>
      <!-- oscillation -->
      <animateTransform attributeName="transform" type="rotate" values="-4 42 18;4 42 18;-4 42 18" dur=".48s" repeatCount="indefinite"/>
      <!-- bubbles -->
      <circle cx="22" cy="11" r="2" fill="#3b82f6" opacity=".45">
        <animate attributeName="cy" values="11;3;11" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".45;0;.45" dur="1.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="30" cy="9" r="1.3" fill="#3b82f6" opacity=".3">
        <animate attributeName="cy" values="9;2;9" dur="0.85s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".3;0;.3" dur="0.85s" repeatCount="indefinite"/>
      </circle>
      <circle cx="17" cy="13" r="1" fill="#3b82f6" opacity=".25">
        <animate attributeName="cy" values="13;6;13" dur="1.3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".25;0;.25" dur="1.3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>

  <div style="font-size:11px;color:#9ca3af;letter-spacing:.28em;text-transform:uppercase;">Caricamento…</div>
</div>`;
document.body.insertAdjacentHTML('afterbegin', overlayHTML);

const overlay   = document.getElementById('pt-overlay');
const ptWater   = document.getElementById('pt-water');
const ptWave    = document.getElementById('pt-wave');
const ptSwimmer = document.getElementById('pt-swimmer');

function showOverlay(cb) {
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  // fill water & show wave
  requestAnimationFrame(() => {
    ptWater.style.height = '52px';
    setTimeout(() => { ptWave.style.opacity = '1'; }, 200);
  });
  // swimmer: reset then swim across
  ptSwimmer.style.transition = 'none';
  ptSwimmer.style.opacity = '0';
  ptSwimmer.style.left = '-90px';
  setTimeout(() => {
    ptSwimmer.style.transition = 'left 0.65s cubic-bezier(.4,0,.2,1), opacity .15s';
    ptSwimmer.style.opacity = '1';
    ptSwimmer.style.left = '290px';
  }, 80);
  setTimeout(cb, 580);
}

function hideOverlay() {
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  ptWater.style.height = '0';
  ptWave.style.opacity = '0';
  ptSwimmer.style.left = '-90px';
  ptSwimmer.style.opacity = '0';
}

// ── PAGE ENTER ANIMATION ─────────────────────────────────────────────────────
// Fade-in the page body on arrival
document.documentElement.style.opacity = '0';
document.documentElement.style.transition = 'opacity 0.35s ease';
window.addEventListener('pageshow', () => {
  requestAnimationFrame(() => { document.documentElement.style.opacity = '1'; });
});
// also trigger immediately if pageshow already fired
requestAnimationFrame(() => { document.documentElement.style.opacity = '1'; });

// ── NAV HTML ─────────────────────────────────────────────────────────────────
const NAV_HTML = `
<nav id="nav">
  <a href="index.html" class="nav-logo">
    <img src="logo.png" alt="Aphros Swim" style="height:64px;">
  </a>
  <ul class="nav-links">
    <li><a href="corsi.html">Corsi</a></li>
    <li><a href="orari.html">Orari</a></li>
    <li><a href="iscrizioni.html">Iscrizioni</a></li>
    <li><a href="agonismo.html">Agonismo</a></li>
    <li><a href="galleria.html">Galleria</a></li>
    <li><a href="contatti.html">Contatti</a></li>
  </ul>
  <a href="contatti.html" class="nav-cta">Iscriviti</a>
  <button class="burger" id="burger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
</nav>
<div id="mmenu">
  <a href="corsi.html">Corsi</a>
  <a href="orari.html">Orari</a>
  <a href="iscrizioni.html">Iscrizioni</a>
  <a href="agonismo.html">Agonismo</a>
  <a href="galleria.html">Galleria</a>
  <a href="contatti.html">Contatti</a>
</div>`;

// ── FOOTER HTML ──────────────────────────────────────────────────────────────
const FOOTER_HTML = `
<footer>
  <div class="fi">
    <div class="fb">
      <img src="logo.png" alt="Aphros Swim">
      <p>A.S.D. Aphros Swim — Scuola Nuoto Federale FIPSAS. Via Apricena Km 0.400, 71016 San Severo (FG), Puglia.</p>
      <div class="affil-logos">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 50" style="height:36px;width:auto;">
  <rect width="120" height="50" fill="none"/>
  <!-- Blue circle background -->
  <circle cx="25" cy="25" r="22" fill="#003f8a"/>
  <!-- Fish silhouette -->
  <path d="M14 25 Q18 18 25 18 Q32 18 36 25 Q32 32 25 32 Q18 32 14 25Z" fill="white" opacity=".9"/>
  <circle cx="30" cy="23" r="2" fill="#003f8a"/>
  <path d="M36 25 L42 20 L42 30 Z" fill="white" opacity=".7"/>
  <!-- FIPSAS text -->
  <text x="50" y="20" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="white">FIPSAS</text>
  <text x="50" y="32" font-family="Arial,sans-serif" font-size="6.5" fill="rgba(255,255,255,.75)" letter-spacing=".3">FED. ITALIANA PESCA</text>
  <text x="50" y="41" font-family="Arial,sans-serif" font-size="6.5" fill="rgba(255,255,255,.75)" letter-spacing=".3">SPORTIVA &amp; ATT. SUBACQUEE</text>
</svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50" style="height:36px;width:auto;">
  <rect width="110" height="50" fill="none"/>
  <!-- 5 Olympic rings, row 1: 3 rings, row 2: 2 rings offset -->
  <!-- Row 1 -->
  <circle cx="18" cy="18" r="8" fill="none" stroke="#0085c7" stroke-width="2.5"/>
  <circle cx="36" cy="18" r="8" fill="none" stroke="#f4c300" stroke-width="2.5"/>
  <circle cx="54" cy="18" r="8" fill="none" stroke="#000000" stroke-width="2.5"/>
  <!-- Row 2 -->
  <circle cx="27" cy="28" r="8" fill="none" stroke="#009f3d" stroke-width="2.5"/>
  <circle cx="45" cy="28" r="8" fill="none" stroke="#df0024" stroke-width="2.5"/>
  <!-- CONI text -->
  <text x="68" y="22" font-family="Arial,sans-serif" font-weight="800" font-size="14" fill="white">CONI</text>
  <text x="68" y="33" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,.7)" letter-spacing=".2">COMITATO OLIMPICO</text>
  <text x="68" y="41" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,.7)" letter-spacing=".2">NAZIONALE ITALIANO</text>
</svg>
      </div>
    </div>
    <div class="fcol">
      <div class="fct">Navigazione</div>
      <ul>
        <li><a href="corsi.html">Corsi</a></li>
        <li><a href="orari.html">Orari</a></li>
        <li><a href="iscrizioni.html">Iscrizioni</a></li>
        <li><a href="agonismo.html">Agonismo</a></li>
        <li><a href="galleria.html">Galleria</a></li>
        <li><a href="contatti.html">Contatti</a></li>
      </ul>
    </div>
    <div class="fcol">
      <div class="fct">Corsi</div>
      <ul>
        <li><a href="corsi.html">Scuola Nuoto Bambini</a></li>
        <li><a href="corsi.html">Scuola Nuoto Ragazzi</a></li>
        <li><a href="corsi.html">Corso Adulti</a></li>
        <li><a href="corsi.html">Acquagym</a></li>
        <li><a href="agonismo.html">Settore Agonistico</a></li>
      </ul>
    </div>
    <div class="fcol">
      <div class="fct">Contatti</div>
      <ul>
        <li><a href="tel:+390882248939">0882 248939</a></li>
        <li><a href="mailto:info@aphroswim.it">info@aphroswim.it</a></li>
        <li><a href="https://www.instagram.com/aphroswim/" target="_blank">Instagram</a></li>
        <li><a href="https://www.facebook.com/people/Aphros-Swim/100064002222136/" target="_blank">Facebook</a></li>
      </ul>
    </div>
  </div>
  <div class="fb-bot">
    <p>© 2025 A.S.D. Aphros Swim · San Severo (FG) · Tutti i diritti riservati · Affiliata FIPSAS · Riconosciuta CONI</p>
    <div class="fs">
      <a href="https://www.instagram.com/aphroswim/" target="_blank">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1" y="1" width="13" height="13" rx="3"/><circle cx="7.5" cy="7.5" r="3"/><circle cx="11" cy="4" r=".8" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="https://www.facebook.com/people/Aphros-Swim/100064002222136/" target="_blank">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M11 2H9C7.343 2 6 3.343 6 5v2H4v3h2v6h3V10h2l.5-3H9V5c0-.276.224-.5.5-.5H11V2z"/></svg>
      </a>
    </div>
  </div>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

// ── ACTIVE NAV LINK ──────────────────────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── NAV SCROLL ───────────────────────────────────────────────────────────────
const navEl = document.getElementById('nav');
function updateNav() { navEl.classList.toggle('scrolled', scrollY > 50); }
window.addEventListener('scroll', updateNav, { passive: true });
if (page !== 'index.html') navEl.classList.add('scrolled');
updateNav();

// ── MOBILE MENU ──────────────────────────────────────────────────────────────
function toggleMenu() {
  const m = document.getElementById('mmenu');
  const b = document.getElementById('burger');
  const isOpen = m.classList.contains('open');
  if (isOpen) {
    m.classList.remove('open');
    b.classList.remove('open');
  } else {
    m.classList.add('open');
    b.classList.add('open');
  }
}
function closeMenu() {
  const m = document.getElementById('mmenu');
  const b = document.getElementById('burger');
  m.classList.remove('open');
  b.classList.remove('open');
}

// close menu when clicking outside
document.addEventListener('click', e => {
  const m = document.getElementById('mmenu');
  const b = document.getElementById('burger');
  if (m && m.classList.contains('open')) {
    if (!m.contains(e.target) && !b.contains(e.target)) closeMenu();
  }
}, true);

// close menu on mobile link click + intercept for transition
document.querySelectorAll('#mmenu a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
      closeMenu(); return;
    }
    e.preventDefault();
    closeMenu();
    showOverlay(() => { window.location.href = href; });
  });
});

// ── PAGE TRANSITION ON ALL INTERNAL LINKS ────────────────────────────────────
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href) return;
  // skip: external, anchors, tel, mailto, target=_blank
  if (href.startsWith('http') || href.startsWith('#') ||
      href.startsWith('tel') || href.startsWith('mailto') ||
      a.target === '_blank') return;
  // skip if same page
  const dest = href.split('/').pop() || 'index.html';
  if (dest === page) return;
  e.preventDefault();
  showOverlay(() => { window.location.href = href; });
}, true);

// ── SCROLL REVEAL ────────────────────────────────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });

// Wait a tick so nav/footer are injected before querying
requestAnimationFrame(() => {
  document.querySelectorAll('.r').forEach(el => ro.observe(el));
});