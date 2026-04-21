(function () {
  'use strict';

  var overlay, lightboxImg, caption, closeBtn;
  var scale = 1, isDragging = false;
  var dragStartX, dragStartY, translateX = 0, translateY = 0;

  function createLightbox() {
    var style = document.createElement('style');
    style.textContent = [
      '#lb-overlay{',
        'display:none;position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;',
        'background:rgba(0,0,0,0.93);align-items:center;justify-content:center;',
        'flex-direction:column;cursor:zoom-out;',
      '}',
      '#lb-overlay.lb-open{display:flex;}',
      '#lb-box{',
        'position:relative;display:flex;flex-direction:column;align-items:center;',
        'max-width:94vw;max-height:94vh;',
      '}',
      '#lb-img{',
        'max-width:90vw;max-height:82vh;object-fit:contain;border-radius:6px;',
        'cursor:grab;user-select:none;-webkit-user-drag:none;',
        'transform-origin:center center;',
        'transition:transform 0.08s ease;',
      '}',
      '#lb-img.lb-grabbing{cursor:grabbing;}',
      '#lb-close{',
        'position:absolute;top:-38px;right:0;background:none;border:none;',
        'color:#fff;font-size:30px;line-height:1;cursor:pointer;padding:4px 8px;',
        'opacity:0.8;',
      '}',
      '#lb-close:hover{opacity:1;}',
      '#lb-caption{',
        'color:#999;font-size:12px;margin-top:10px;text-align:center;',
        'max-width:680px;padding:0 16px;line-height:1.5;',
      '}',
      '#lb-hint{',
        'color:#555;font-size:11px;margin-top:6px;',
      '}',
    ].join('');
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.innerHTML =
      '<div id="lb-box">' +
        '<button id="lb-close" aria-label="Close">&times;</button>' +
        '<img id="lb-img" src="" alt="" />' +
        '<div id="lb-caption"></div>' +
        '<div id="lb-hint">Scroll to zoom &nbsp;&middot;&nbsp; Drag to pan &nbsp;&middot;&nbsp; Double-click to reset</div>' +
      '</div>';
    document.body.appendChild(overlay);

    lightboxImg = document.getElementById('lb-img');
    caption = document.getElementById('lb-caption');
    closeBtn = document.getElementById('lb-close');
  }

  function applyTransform() {
    lightboxImg.style.transform =
      'translate(' + translateX + 'px,' + translateY + 'px) scale(' + scale + ')';
  }

  function resetTransform() {
    scale = 1; translateX = 0; translateY = 0;
    lightboxImg.style.transition = 'transform 0.18s ease';
    applyTransform();
    setTimeout(function () { lightboxImg.style.transition = 'transform 0.08s ease'; }, 200);
  }

  function open(src, alt) {
    lightboxImg.src = src;
    caption.textContent = alt || '';
    resetTransform();
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    resetTransform();
  }

  function bindEvents() {
    // Close on overlay background click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.id === 'lb-box') close();
    });
    closeBtn.addEventListener('click', close);

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Scroll to zoom
    overlay.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = e.deltaY > 0 ? -0.12 : 0.12;
      scale = Math.min(Math.max(scale + delta, 0.5), 8);
      lightboxImg.style.transition = 'none';
      applyTransform();
    }, { passive: false });

    // Double-click to reset zoom
    lightboxImg.addEventListener('dblclick', resetTransform);

    // Drag to pan
    lightboxImg.addEventListener('mousedown', function (e) {
      if (scale <= 1) return;
      isDragging = true;
      dragStartX = e.clientX - translateX;
      dragStartY = e.clientY - translateY;
      lightboxImg.classList.add('lb-grabbing');
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      lightboxImg.style.transition = 'none';
      translateX = e.clientX - dragStartX;
      translateY = e.clientY - dragStartY;
      applyTransform();
    });
    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        lightboxImg.classList.remove('lb-grabbing');
      }
    });

    // Touch drag + pinch zoom
    var lastTouchDist = null;
    overlay.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      } else if (e.touches.length === 1 && scale > 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX - translateX;
        dragStartY = e.touches[0].clientY - translateY;
      }
    }, { passive: true });
    overlay.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && lastTouchDist !== null) {
        e.preventDefault();
        var dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        scale = Math.min(Math.max(scale * (dist / lastTouchDist), 0.5), 8);
        lastTouchDist = dist;
        lightboxImg.style.transition = 'none';
        applyTransform();
      } else if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        translateX = e.touches[0].clientX - dragStartX;
        translateY = e.touches[0].clientY - dragStartY;
        lightboxImg.style.transition = 'none';
        applyTransform();
      }
    }, { passive: false });
    overlay.addEventListener('touchend', function (e) {
      if (e.touches.length < 2) lastTouchDist = null;
      if (e.touches.length === 0) isDragging = false;
    });
  }

  function initImages() {
    // Target images inside the main content wrapper only
    var imgs = document.querySelectorAll('.page-content .wrapper img');
    imgs.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        open(this.src, this.alt);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    createLightbox();
    bindEvents();
    initImages();
  });
}());
