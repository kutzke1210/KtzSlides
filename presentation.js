/* ============================================
   PRESENTATION — Fullscreen mode (theme-aware)
   ============================================ */
const Presentation = (() => {
  let currentSlide = 0;
  let totalSlides = 0;
  let overlay = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let isActive = false;

  function start() {
    totalSlides = Slides.getTotal();
    if (totalSlides === 0) return;
    currentSlide = 0;
    isActive = true;
    overlay = document.getElementById('presentationOverlay');
    overlay.classList.add('active');
    renderSlide();
    bindEvents();
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => { });
    }
  }

  function stop() {
    isActive = false;
    if (overlay) overlay.classList.remove('active');
    unbindEvents();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
  }

  function next() {
    if (currentSlide < totalSlides - 1) { currentSlide++; renderSlide(); }
  }

  function prev() {
    if (currentSlide > 0) { currentSlide--; renderSlide(); }
  }

  function renderSlide() {
    const container = document.getElementById('presentationSlideContent');
    const progress = document.getElementById('presentationProgress');
    progress.textContent = `${currentSlide + 1} / ${totalSlides}`;

    const preset = Themes.getCurrentPreset();
    const colors = Themes.getSlideColors();
    const globalFontPct = Themes.getGlobalFontSize();
    const fontScale = (rem) => (parseFloat(rem) * globalFontPct / 100) + 'rem';

    if (currentSlide === 0) {
      const cover = Slides.getCover();
      const fs = LayoutEngine.calculateFontSize(cover.title, 'presentationCoverTitle');
      container.innerHTML = `
        <div class="presentation-slide-inner cover-layout" style="background:linear-gradient(135deg,#${colors.coverBg},#${colors.coverBg2});">
          <div class="cover-title" style="font-size:${fontScale(fs)}">${escapeHtml(cover.title || 'Apresentação')}</div>
          <div class="cover-meta">
            ${cover.student ? escapeHtml(cover.student) + '<br>' : ''}
            ${cover.className ? escapeHtml(cover.className) + '<br>' : ''}
            ${cover.date ? escapeHtml(cover.date) : ''}
          </div>
        </div>
      `;
    } else {
      const slide = Slides.getSlide(currentSlide - 1);
      if (!slide) return;

      const slideFontPct = slide.fontSize || 100;
      const sScale = (rem) => (parseFloat(rem) * globalFontPct / 100 * slideFontPct / 100) + 'rem';

      const titleFs = LayoutEngine.calculateFontSize(slide.title, 'presentationTitle');
      const bodyFs = LayoutEngine.calculateFontSize(slide.text, 'body');
      const hasImage = slide.imageDataUrl;

      let bulletsHtml = '';
      if (slide.bullets) {
        const items = slide.bullets.split('\n').filter(b => b.trim());
        if (items.length) {
          bulletsHtml = `<ul class="slide-bullets" style="font-size:${sScale('0.95')}">${items.map(b => `<li style="color:#${colors.subtitle}">${escapeHtml(b.trim())}</li>`).join('')}</ul>`;
        }
      }

      container.innerHTML = `
        <div class="presentation-slide-inner content-layout" style="background:#${colors.bg};">
          ${slide.title ? `<div class="slide-title" style="font-size:${sScale(titleFs)};color:#${colors.title}">${escapeHtml(slide.title)}</div>` : ''}
          <div class="slide-body">
            <div class="slide-text-area">
              ${slide.text ? `<div class="slide-text-content" style="font-size:${sScale(bodyFs)};color:#${colors.text}">${escapeHtml(slide.text).replace(/\n/g, '<br>')}</div>` : ''}
              ${bulletsHtml}
            </div>
            ${hasImage ? `<div class="slide-image-area"><img src="${slide.imageDataUrl}" alt="Imagem"></div>` : ''}
          </div>
        </div>
      `;
    }

    container.style.animation = 'none';
    container.offsetHeight;
    container.style.animation = 'fadeIn 0.4s ease';
  }

  function handleKeyDown(e) {
    if (!isActive) return;
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') { e.preventDefault(); stop(); }
  }

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }

  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  }

  function bindEvents() {
    document.addEventListener('keydown', handleKeyDown);
    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  function unbindEvents() {
    document.removeEventListener('keydown', handleKeyDown);
    if (overlay) {
      overlay.removeEventListener('touchstart', handleTouchStart);
      overlay.removeEventListener('touchend', handleTouchEnd);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { start, stop, next, prev, isActive: () => isActive };
})();
