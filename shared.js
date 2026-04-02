// ── TRANSITION OVERLAY ───────────────────────────────────────────────────────
// Inject overlay HTML first so it's ready immediately
const overlayHTML = `
<div id="pt-overlay" style="
  position:fixed;inset:0;z-index:9000;
  background:#fff;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:20px;
  opacity:0;visibility:hidden;
  transition:opacity 0.25s ease,visibility 0.25s ease;
">
  <div style="position:relative;width:200px;height:80px;overflow:hidden;border-bottom:2px solid #0064c8;">
    <div id="pt-water" style="position:absolute;bottom:0;left:0;right:0;height:0;background:rgba(0,100,200,.09);transition:height 0.4s ease;"></div>
    <svg id="pt-swimmer" style="position:absolute;bottom:14px;left:-50px;" width="52" height="20" viewBox="0 0 52 20" fill="none">
      <ellipse cx="24" cy="10" rx="16" ry="5" fill="#111827" opacity=".8"/>
      <circle cx="40" cy="10" r="5" fill="#111827" opacity=".8"/>
      <rect x="40" y="8.5" width="12" height="3" rx="1.5" fill="#6b7280" opacity=".7"/>
      <path d="M2 10 L0 5 L8 10 L0 15 Z" fill="#0064c8"/>
      <animateTransform attributeName="transform" type="rotate" values="-4 26 10;4 26 10;-4 26 10" dur=".45s" repeatCount="indefinite"/>
    </svg>
  </div>
  <div style="font-family:'DM Serif Display',serif;font-size:20px;color:#0064c8;letter-spacing:.04em;">Aphros Swim</div>
  <div style="font-size:11px;color:#6b7280;letter-spacing:.2em;text-transform:uppercase;">San Severo · FIN</div>
</div>`;
document.body.insertAdjacentHTML('afterbegin', overlayHTML);

const overlay  = document.getElementById('pt-overlay');
const ptWater  = document.getElementById('pt-water');
const ptSwimmer = document.getElementById('pt-swimmer');

function showOverlay(cb) {
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  // water fill
  requestAnimationFrame(() => { ptWater.style.height = '60px'; });
  // swimmer swim across
  ptSwimmer.style.transition = 'left 0.55s cubic-bezier(.4,0,.2,1), opacity 0.1s';
  ptSwimmer.style.opacity = '0';
  ptSwimmer.style.left = '-50px';
  setTimeout(() => {
    ptSwimmer.style.opacity = '1';
    ptSwimmer.style.left = '210px';
  }, 60);
  setTimeout(cb, 480);
}

function hideOverlay() {
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  ptWater.style.height = '0';
  ptSwimmer.style.left = '-50px';
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
  <a href="index.html" class="nav-logo"><img src="logo.png" alt="Aphros Swim"></a>
  <ul class="nav-links">
    <li><a href="corsi.html">Corsi</a></li>
    <li><a href="orari.html">Orari</a></li>
    <li><a href="iscrizioni.html">Iscrizioni</a></li>
    <li><a href="agonismo.html">Agonismo</a></li>
    <li><a href="galleria.html">Galleria</a></li>
    <li><a href="contatti.html">Contatti</a></li>
  </ul>
  <a href="contatti.html" class="nav-cta">Iscriviti</a>
  <button class="burger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
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
      <p>A.S.D. Aphros Swim — Scuola Nuoto Federale FIN. Via Apricena Km 0.400, 71016 San Severo (FG), Puglia.</p>
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
    <p>© 2025 A.S.D. Aphros Swim · San Severo (FG) · Tutti i diritti riservati</p>
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
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}
function closeMenu() { document.getElementById('mmenu').style.display = 'none'; }

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