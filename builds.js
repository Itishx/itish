const filters = document.querySelectorAll('.filter');
const cards   = document.querySelectorAll('.build-card-new');

filters.forEach(f => {
  f.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-selected', 'false'));
    f.setAttribute('aria-selected', 'true');

    const tag = f.getAttribute('data-f');
    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      if (tag === 'all' || tag === status) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
