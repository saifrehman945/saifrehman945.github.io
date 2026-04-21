document.addEventListener('DOMContentLoaded', function () {
  // Populate subsection links from h4 elements inside each section container
  document.querySelectorAll('.sidebar-nav__subs').forEach(function (subList) {
    var parentId = subList.dataset.parent;
    var sectionHeading = document.getElementById(parentId);
    if (!sectionHeading) return;
    var container = sectionHeading.parentElement;
    if (!container) return;
    container.querySelectorAll('h4[id]').forEach(function (h4) {
      var li = document.createElement('li');
      li.className = 'sidebar-nav__sub-item';
      var a = document.createElement('a');
      a.href = '#' + h4.id;
      a.className = 'sidebar-nav__link sidebar-nav__sub-link';
      a.dataset.target = h4.id;
      a.textContent = h4.textContent.trim();
      li.appendChild(a);
      subList.appendChild(li);
    });
  });

  // Scroll spy: highlight the nav link for whichever heading is nearest the top
  var allLinks = Array.from(document.querySelectorAll('.sidebar-nav__link[data-target]'));
  if (!allLinks.length) return;

  var headings = Array.from(document.querySelectorAll('h3[id], h4[id]'));
  if (!headings.length) return;

  function getActive() {
    var threshold = window.scrollY + window.innerHeight * 0.18 + 10;
    var active = headings[0];
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top + window.scrollY <= threshold) {
        active = headings[i];
      } else {
        break;
      }
    }
    return active ? active.id : null;
  }

  function applyActive(id) {
    allLinks.forEach(function (a) {
      a.classList.toggle('active', a.dataset.target === id);
    });
  }

  window.addEventListener('scroll', function () {
    applyActive(getActive());
  }, { passive: true });

  applyActive(getActive());
});
