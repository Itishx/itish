// Shared behavior for every Creatish Inc. mini-site page.

// Dark mode toggle (initial theme is set inline in <head> to avoid a flash)
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Footer newsletter: arrow toggles the hidden panel open/closed
const newsToggle = document.getElementById('newsToggle');
const newsPanel = document.getElementById('newsPanel');
if (newsToggle && newsPanel) {
  newsToggle.addEventListener('click', () => {
    const open = newsPanel.classList.toggle('open');
    newsToggle.classList.toggle('open', open);
    newsToggle.setAttribute('aria-expanded', String(open));
  });
}

const newsForm = document.getElementById('newsForm');
if (newsForm) {
  newsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newsForm.hidden = true;
    document.getElementById('newsDone').hidden = false;
  });
}

// Profound Shit hero: same subscribe-then-confirm pattern as the footer
const psSubscribeForm = document.getElementById('psSubscribeForm');
if (psSubscribeForm) {
  psSubscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    psSubscribeForm.hidden = true;
    document.getElementById('psSubscribeDone').hidden = false;
  });
}

// Hamburger: toggles the mobile nav drawer
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const navBackdrop = document.getElementById('navBackdrop');
if (hamburger && sidebar) {
  const closeNav = () => {
    sidebar.classList.remove('open');
    navBackdrop?.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };
  const openNav = () => {
    sidebar.classList.add('open');
    navBackdrop?.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) closeNav(); else openNav();
  });
  navBackdrop?.addEventListener('click', closeNav);
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

// Hero photo frames: show the placeholder until the page's hero image exists
document.querySelectorAll('.hero-frame, .polaroid-frame').forEach((frame) => {
  const img = frame.querySelector('img');
  if (!img) return;
  const markEmpty = () => frame.classList.add('empty');
  img.addEventListener('error', markEmpty);
  if (img.complete && img.naturalWidth === 0) markEmpty();
});

// Mega menu: the Explore trigger toggles a full-width dropdown
const megaTrigger = document.getElementById('megaTrigger');
const megaMenu = document.getElementById('megaMenu');
const megaBackdrop = document.getElementById('megaBackdrop');
if (megaTrigger && megaMenu) {
  const closeMega = () => {
    megaMenu.classList.remove('open');
    megaBackdrop?.classList.remove('open');
    megaTrigger.classList.remove('open');
    megaTrigger.setAttribute('aria-expanded', 'false');
  };
  const openMega = () => {
    megaMenu.classList.add('open');
    megaBackdrop?.classList.add('open');
    megaTrigger.classList.add('open');
    megaTrigger.setAttribute('aria-expanded', 'true');
  };
  megaTrigger.setAttribute('aria-expanded', 'false');
  megaTrigger.addEventListener('click', () => {
    if (megaMenu.classList.contains('open')) closeMega(); else openMega();
  });
  megaBackdrop?.addEventListener('click', closeMega);
  megaMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMega));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMega();
  });
}

// Claps increment like Medium
const clapBtn = document.getElementById('clapBtn');
const clapCount = document.getElementById('clapCount');
if (clapBtn && clapCount) {
  let claps = parseInt(clapCount.textContent, 10) || 0;
  clapBtn.addEventListener('click', () => {
    claps += 1;
    clapCount.textContent = claps;
  });
}
