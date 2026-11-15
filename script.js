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

// Contact window: opens from any "Email us" button; mailto link still works if scripts are off.
(function () {
  var dialog = document.getElementById('contact-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') { return; }
  var form = document.getElementById('contact-form');
  var status = document.getElementById('cf-status');
  var send = document.getElementById('cf-send');
  var original = status.innerHTML;

  document.querySelectorAll('[data-contact]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      status.className = 'dialog-note';
      status.innerHTML = original;
      dialog.showModal();
    });
  });
  document.getElementById('contact-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) { dialog.close(); } });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send.disabled = true;
    status.className = 'dialog-note';
    status.textContent = 'Sending...';
    fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          status.className = 'dialog-note ok';
          status.textContent = 'Thank you. Your message has been sent. We will reply by email soon.';
        } else { throw new Error('failed'); }
      })
      .catch(function () {
        status.className = 'dialog-note err';
        status.textContent = 'Sorry, the message could not be sent. Please write to info@nexaflow.pk.';
      })
      .then(function () { send.disabled = false; });
  });
})();
