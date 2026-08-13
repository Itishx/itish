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

// Hero photo frames: show the placeholder until the page's hero image exists
document.querySelectorAll('.hero-frame').forEach((frame) => {
  const img = frame.querySelector('img');
  if (!img) return;
  const markEmpty = () => frame.classList.add('empty');
  img.addEventListener('error', markEmpty);
  if (img.complete && img.naturalWidth === 0) markEmpty();
});

// Search: highlights every match in this page's article
const searchInput = document.getElementById('searchInput');
const proseBlocks = document.querySelectorAll('.prose');

function clearHits() {
  document.querySelectorAll('mark.search-hit').forEach((m) => {
    const parent = m.parentNode;
    m.replaceWith(document.createTextNode(m.textContent));
    parent.normalize();
  });
}

function highlight(root, query) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const matches = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.toLowerCase().includes(query)) matches.push(node);
  }
  matches.forEach((node) => {
    const frag = document.createDocumentFragment();
    let text = node.textContent;
    let idx;
    while ((idx = text.toLowerCase().indexOf(query)) !== -1) {
      frag.appendChild(document.createTextNode(text.slice(0, idx)));
      const mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = text.slice(idx, idx + query.length);
      frag.appendChild(mark);
      text = text.slice(idx + query.length);
    }
    frag.appendChild(document.createTextNode(text));
    node.replaceWith(frag);
  });
}

if (searchInput) {
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { searchInput.value = ''; clearHits(); return; }
    if (event.key !== 'Enter') return;
    clearHits();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    proseBlocks.forEach((block) => highlight(block, query));
    const first = document.querySelector('mark.search-hit');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// Follow buttons toggle
document.querySelectorAll('.follow-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const followed = btn.classList.toggle('followed');
    btn.textContent = followed ? 'Following' : 'Follow';
  });
});
