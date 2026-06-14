(function () {
  'use strict';

  var largeScreenCss = document.createElement('link');
  largeScreenCss.rel = 'stylesheet';
  largeScreenCss.href = 'css/large-screen.css';
  document.head.appendChild(largeScreenCss);

  var SHOP_PAGES = [
    'purchasable.html',
    'purchasable-keychains.html',
    'purchasable-phones.html',
    'purchasable-valentines.html',
    'purchasable-other.html'
  ];

  var PROJECT_PAGES = [
    'university.html',
    'robobooth.html',
    'university-donkey-kong.html',
    'work.html',
    'personal.html',
    'projects.html'
  ];

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  var SKIP_PAGES = ['yes.html', 'v.html'];
  if (SKIP_PAGES.indexOf(currentPage()) !== -1) {
    return;
  }

  function activeSection() {
    var page = currentPage();
    var hash = window.location.hash;

    if (page === 'index.html' || page === 'home.html') {
      if (hash === '#contact') return 'contact';
      if (hash === '#projects') return 'projects';
      return 'home';
    }
    if (page === 'overview.html' || page === 'about.html') {
      return 'home';
    }
    if (PROJECT_PAGES.indexOf(page) !== -1) {
      return 'projects';
    }
    if (page === 'bengineerings.html') {
      return 'bengineerings';
    }
    if (page === 'social-media.html') {
      return 'bengineerings';
    }
    if (SHOP_PAGES.indexOf(page) !== -1) {
      return 'shop';
    }
    if (page === 'contact.html') {
      return 'contact';
    }
    return '';
  }

  var navMarkup =
    '<nav class="site-nav" aria-label="Main navigation">' +
      '<div class="site-nav-inner">' +
        '<a href="index.html" class="site-nav-brand">Ben Harrison</a>' +
        '<button type="button" class="site-nav-toggle" aria-expanded="false" aria-controls="site-nav-links" aria-label="Open menu">' +
          '<span class="site-nav-toggle-icon" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="site-nav-links" id="site-nav-links">' +
          '<a href="index.html" data-nav="home">Home</a>' +
          '<a href="index.html#projects" data-nav="projects">Projects</a>' +
          '<a href="bengineerings.html" data-nav="bengineerings">Bengineerings</a>' +
          '<a href="purchasable.html" data-nav="shop">Shop</a>' +
          '<a href="index.html#contact" data-nav="contact">Contact</a>' +
        '</div>' +
      '</div>' +
    '</nav>' +
    '<nav class="site-bottom-nav" aria-label="Quick navigation">' +
      '<a href="index.html" data-nav="home">' +
        '<svg class="site-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/></svg>' +
        '<span>Home</span>' +
      '</a>' +
      '<a href="index.html#projects" data-nav="projects">' +
        '<svg class="site-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>' +
        '<span>Projects</span>' +
      '</a>' +
      '<a href="bengineerings.html" data-nav="bengineerings">' +
        '<svg class="site-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M12 12 3 7"/><path d="m12 12 9-5"/><path d="M12 12v10"/></svg>' +
        '<span>Bengineerings</span>' +
      '</a>' +
      '<a href="purchasable.html" data-nav="shop">' +
        '<svg class="site-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h15l-1.5 9H8L6 6Z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>' +
        '<span>Shop</span>' +
      '</a>' +
    '</nav>';

  document.body.insertAdjacentHTML('afterbegin', navMarkup);
  document.body.classList.add('has-site-nav');

  function setActiveNav() {
    var active = activeSection();
    document.querySelectorAll('[data-nav]').forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-nav') === active);
    });
  }

  setActiveNav();
  window.addEventListener('hashchange', setActiveNav);

  var toggle = document.querySelector('.site-nav-toggle');
  var panel = document.querySelector('.site-nav-links');

  function closeMenu() {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    panel.classList.remove('is-open');
  }

  function openMenu() {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    panel.classList.add('is-open');
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!panel.classList.contains('is-open')) return;
      if (event.target.closest('.site-nav')) return;
      closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }
})();
