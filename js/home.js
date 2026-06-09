(function () {
  'use strict';

  document.body.classList.add('page-enter');
  requestAnimationFrame(function () {
    document.body.classList.add('is-ready');
  });

  var sections = document.querySelectorAll('.section-animate');
  if (!sections.length) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    sections.forEach(function (section) {
      section.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
