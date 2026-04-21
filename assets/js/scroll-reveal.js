document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.layout');

  if (!items.length) return;

  items.forEach(function (el) {
    el.classList.add('reveal-on-scroll');
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(function (el) { observer.observe(el); });
});
