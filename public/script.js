/* Three small things, no library:
   1. the mobile menu,
   2. highlighting the section you are currently reading in the nav,
   3. the footer year.
   The page is fully readable with JavaScript switched off - none of this is content. */

(function () {
  'use strict';

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Tapping a link navigates within the same page, so the menu has to close itself.
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ---- highlight the section being read ---- */
  var navAnchors = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, {
      // Only count a section as "current" once it reaches the upper third of the
      // viewport, otherwise every section flickers active as it scrolls past.
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---- footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
