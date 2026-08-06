(function () {
  const imageSelector = [
    "img[data-zoomable]",
    ".article-header img",
    ".featured-image-wrapper img",
    ".prose[data-pagefind-body] img",
    "#projects article img",
    "#publications article img",
  ].join(",");

  const ignoredSelector = [
    ".navbar-brand img",
    ".avatar img",
    "img[aria-hidden='true']",
    "img[src*='/media/icon']",
    "img[src*='/authors/']",
  ].join(",");

  const state = {
    activeImage: null,
    scale: 1,
    translateX: 0,
    translateY: 0,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    startTranslateX: 0,
    startTranslateY: 0,
    requestId: 0,
  };

  let modal;
  let stage;
  let image;
  let closeButton;
  let lastFocusedElement;

  function isEligibleImage(candidate) {
    return candidate && candidate.matches(imageSelector) && !candidate.closest(ignoredSelector);
  }

  function getImageFromCardClick(event) {
    const card = event.target.closest("#projects article, #publications article");
    if (!card) {
      return null;
    }

    const cardImage = card.querySelector("img");
    if (!isEligibleImage(cardImage)) {
      return null;
    }

    const imageArea = cardImage.closest(".relative") || cardImage;
    const rect = imageArea.getBoundingClientRect();
    const clickedImageArea =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    return clickedImageArea ? cardImage : null;
  }

  function getImageFromEvent(event) {
    const directImage = event.target.closest && event.target.closest(imageSelector);
    return isEligibleImage(directImage) ? directImage : getImageFromCardClick(event);
  }

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "image-viewer";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");

    stage = document.createElement("div");
    stage.className = "image-viewer__stage";

    image = document.createElement("img");
    image.className = "image-viewer__image";
    image.alt = "";
    image.draggable = false;

    closeButton = document.createElement("button");
    closeButton.className = "image-viewer__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close image viewer");
    closeButton.textContent = "x";

    stage.appendChild(image);
    modal.append(stage, closeButton);
    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target === closeButton) {
        closeViewer();
      }
    });

    modal.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();
        zoomAtPoint(event.clientX, event.clientY, event.deltaY < 0 ? 0.16 : -0.16);
      },
      { passive: false }
    );

    stage.addEventListener("pointerdown", startDrag);
    window.addEventListener("pointermove", drag);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("keydown", handleKeydown);
  }

  function getBestImageSource(sourceImage) {
    if (sourceImage.dataset.fullSrc) {
      return sourceImage.dataset.fullSrc;
    }

    return sourceImage.currentSrc || sourceImage.src;
  }

  function getOriginalImageCandidates(sourceImage) {
    const currentSource = sourceImage.currentSrc || sourceImage.src;
    const url = new URL(currentSource, window.location.href);
    const match = url.pathname.match(/^(.*)_hu_[^/]+\.webp$/);

    if (!match) {
      return [];
    }

    return [".png", ".jpg", ".jpeg", ".webp", ".gif"].map(function (extension) {
      return match[1] + extension;
    });
  }

  function upgradeToOriginalSource(sourceImage) {
    const candidates = getOriginalImageCandidates(sourceImage);
    const requestId = state.requestId;
    let index = 0;

    function tryNext() {
      const candidate = candidates[index];
      index += 1;

      if (!candidate) {
        return;
      }

      const probe = new Image();
      probe.onload = function () {
        if (requestId !== state.requestId || state.activeImage !== sourceImage) {
          return;
        }

        image.src = candidate;
      };
      probe.onerror = tryNext;
      probe.src = candidate;
    }

    tryNext();
  }

  function openViewer(sourceImage) {
    if (!modal) {
      buildModal();
    }

    lastFocusedElement = document.activeElement;
    state.activeImage = sourceImage;
    state.requestId += 1;
    state.scale = 1;
    state.translateX = 0;
    state.translateY = 0;
    state.dragging = false;

    image.src = getBestImageSource(sourceImage);
    image.alt = sourceImage.alt || "";
    image.style.transform = "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("image-viewer-open");
    closeButton.focus({ preventScroll: true });
    upgradeToOriginalSource(sourceImage);
  }

  function closeViewer() {
    if (!modal || !modal.classList.contains("is-open")) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    state.activeImage = null;
    state.requestId += 1;
    image.removeAttribute("src");
    document.documentElement.classList.remove("image-viewer-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  function clampScale(value) {
    return Math.min(5, Math.max(0.75, value));
  }

  function zoomAtPoint(clientX, clientY, delta) {
    const previousScale = state.scale;
    const nextScale = clampScale(previousScale + delta);

    if (nextScale === previousScale) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    const offsetX = clientX - rect.left - rect.width / 2;
    const offsetY = clientY - rect.top - rect.height / 2;
    const ratio = nextScale / previousScale;

    state.translateX = offsetX - (offsetX - state.translateX) * ratio;
    state.translateY = offsetY - (offsetY - state.translateY) * ratio;
    state.scale = nextScale;

    if (state.scale <= 1) {
      state.translateX = 0;
      state.translateY = 0;
    }

    updateTransform();
  }

  function updateTransform() {
    image.style.transform = `translate3d(${state.translateX}px, ${state.translateY}px, 0) scale(${state.scale})`;
    stage.classList.toggle("is-draggable", state.scale > 1);
  }

  function startDrag(event) {
    if (state.scale <= 1 || event.button !== 0) {
      return;
    }

    state.dragging = true;
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
    state.startTranslateX = state.translateX;
    state.startTranslateY = state.translateY;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  }

  function drag(event) {
    if (!state.dragging) {
      return;
    }

    state.translateX = state.startTranslateX + event.clientX - state.dragStartX;
    state.translateY = state.startTranslateY + event.clientY - state.dragStartY;
    updateTransform();
  }

  function stopDrag() {
    if (!state.dragging) {
      return;
    }

    state.dragging = false;
    stage.classList.remove("is-dragging");
  }

  function handleKeydown(event) {
    if (!modal || !modal.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeViewer();
    }
  }

  document.addEventListener(
    "click",
    function (event) {
      const sourceImage = getImageFromEvent(event);
      if (!sourceImage) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      openViewer(sourceImage);
    },
    true
  );

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(imageSelector).forEach(function (candidate) {
      if (!isEligibleImage(candidate)) {
        return;
      }

      candidate.classList.add("image-viewer-trigger");
      if (!candidate.hasAttribute("tabindex")) {
        candidate.setAttribute("tabindex", "0");
      }
      if (!candidate.hasAttribute("role")) {
        candidate.setAttribute("role", "button");
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const sourceImage = isEligibleImage(event.target) ? event.target : null;
    if (!sourceImage) {
      return;
    }

    event.preventDefault();
    openViewer(sourceImage);
  });
})();
