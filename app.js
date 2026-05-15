// Theme — light by default, dark on toggle
if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
const toggle = document.getElementById('themeToggle');
if (toggle) toggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Typewriter
const words = ['startups.', 'products.', 'things that matter.', 'from zero.', 'for people.', 'what I love.'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typeword');
if (el) {
  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1600); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 45 : 80);
  }
  setTimeout(type, 800);
}

// Venture tabs
document.querySelectorAll('.vtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.vtab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.vgrid').forEach(g => g.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.remove('hidden');
  });
});

// Hide broken polaroid images
document.querySelectorAll('.polaroid-img img').forEach(img => {
  const hide = () => img.style.display = 'none';
  img.addEventListener('error', hide);
  if (img.complete && img.naturalWidth === 0) hide();
});
