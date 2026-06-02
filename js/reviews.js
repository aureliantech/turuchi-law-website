/* ════════════════════════════════════════════════════════════
   REVIEWS FILTER
   Click a category button → show only matching cards.
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var buttons = document.querySelectorAll('.rv-filter-btn');
  var cards = document.querySelectorAll('.rv-card');
  var empty = document.getElementById('rv-empty');
  var grid = document.getElementById('rv-grid');

  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category') || '';
      var matches = filter === 'all' || category === filter;
      if (matches) {
        card.classList.remove('rv-card--hidden');
        visibleCount++;
      } else {
        card.classList.add('rv-card--hidden');
      }
    });

    if (empty) {
      if (visibleCount === 0) {
        empty.hidden = false;
        if (grid) grid.style.display = 'none';
      } else {
        empty.hidden = true;
        if (grid) grid.style.display = '';
      }
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.classList.remove('rv-filter-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('rv-filter-btn--active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.getAttribute('data-filter') || 'all';
      applyFilter(filter);
    });
  });

  // Reset link inside empty state
  var resetLink = document.querySelector('[data-reset-filter]');
  if (resetLink) {
    resetLink.addEventListener('click', function (e) {
      e.preventDefault();
      var allBtn = document.querySelector('.rv-filter-btn[data-filter="all"]');
      if (allBtn) allBtn.click();
    });
  }
})();
