// NexaFlow website: small behaviours only. The page works fully without this file.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Reveal sections once, when they scroll into view.
  var targets = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // On a phone, keep only the first question open so the page stays short.
  if (window.matchMedia('(max-width: 760px)').matches) {
    document.querySelectorAll('.faq-list details').forEach(function (item, index) {
      if (index > 0) { item.removeAttribute('open'); }
    });
  }
})();
