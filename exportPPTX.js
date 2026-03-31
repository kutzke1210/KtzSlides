/* ============================================
   EXPORT PPTX — PowerPoint generation (expanded)
   ============================================ */
const ExportPPTX = (() => {

  async function generate() {
    if (typeof PptxGenJS === 'undefined') {
      throw new Error('PptxGenJS não carregado. Verifique sua conexão.');
    }

    const cover = Slides.getCover();
    const slides = Slides.getSlides();
    const colors = Themes.getSlideColors();
    const slideFont = Themes.getSlideFont();
    const globalFontPct = Themes.getGlobalFontSize();
    const transition = Transitions.getCurrentPreset();

    const pres = new PptxGenJS();
    pres.defineLayout({ name: 'CUSTOM', width: 10, height: 5.625 });
    pres.layout = 'CUSTOM';

    // Font size scaler
    const scale = (base) => Math.round(base * globalFontPct / 100);

    // --- Cover Slide ---
    const coverSlide = pres.addSlide();
    if (transition && transition.pptx) coverSlide.transition = transition.pptx;
    coverSlide.background = { fill: colors.coverBg || colors.accent };

    // Add a subtle secondary color bar
    try {
      coverSlide.addShape(pres.ShapeType ? pres.ShapeType.rect : 'rect', {
        x: 0, y: 4.8, w: 10, h: 0.825,
        fill: { color: colors.coverBg2 || colors.subtitle },
        opacity: 0.4
      });
    } catch (e) { }

    const coverTitleSize = LayoutEngine.pptxFontSize(cover.title, 'coverTitle');
    coverSlide.addText(cover.title || 'Apresentação', {
      x: 0.5, y: 0.8, w: 9, h: 2.2,
      fontSize: scale(coverTitleSize),
      fontFace: slideFont,
      color: 'FFFFFF',
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    const metaLines = [];
    if (cover.student) metaLines.push(cover.student);
    if (cover.className) metaLines.push(cover.className);
    if (cover.date) metaLines.push(cover.date);

    if (metaLines.length > 0) {
      coverSlide.addText(metaLines.join('\n'), {
        x: 0.5, y: 3.4, w: 9, h: 1.4,
        fontSize: scale(16),
        fontFace: slideFont,
        color: 'FFFFFF',
        align: 'center',
        valign: 'top',
        lineSpacing: 28
      });
    }

    // --- Content Slides ---
    slides.forEach((slide, i) => {
      const s = pres.addSlide();
      s.background = { color: colors.bg };

      const slideFontPct = slide.fontSize || 100;
      const sScale = (base) => Math.round(base * globalFontPct / 100 * slideFontPct / 100);

      const hasImage = slide.imageDataUrl;
      const textW = hasImage ? 5 : 9;
      const titleSize = LayoutEngine.pptxFontSize(slide.title, 'title');

      // Accent bar
      try {
        s.addShape(pres.ShapeType ? pres.ShapeType.rect : 'rect', {
          x: 0, y: 0, w: 10, h: 0.06,
          fill: { color: colors.accent || colors.title }
        });
      } catch (e) { }

      // Title
      if (slide.title) {
        s.addText(slide.title, {
          x: 0.5, y: 0.2, w: 9, h: 0.7,
          fontSize: sScale(titleSize),
          fontFace: slideFont,
          color: colors.title,
          bold: true,
          valign: 'middle'
        });

        s.addShape(pres.ShapeType ? pres.ShapeType.rect : 'rect', {
          x: 0.5, y: 0.9, w: 1.5, h: 0.03,
          fill: { color: colors.accent || colors.title }
        });
      }

      // Body text
      const bodyY = slide.title ? 1.1 : 0.4;
      const bodyH = 5.625 - bodyY - 0.4;

      if (slide.text) {
        const bodySize = LayoutEngine.pptxFontSize(slide.text, 'body');
        s.addText(slide.text, {
          x: 0.5, y: bodyY, w: textW, h: bodyH * 0.5,
          fontSize: sScale(bodySize),
          fontFace: slideFont,
          color: colors.text,
          valign: 'top',
          lineSpacing: 24,
          wrap: true
        });
      }

      // Bullets
      if (slide.bullets) {
        const bulletLines = slide.bullets.split('\n').filter(b => b.trim());
        if (bulletLines.length > 0) {
          const bulletY = slide.text ? bodyY + bodyH * 0.45 : bodyY;
          const bulletItems = bulletLines.map(b => ({
            text: b.trim(),
            options: {
              fontSize: sScale(14),
              fontFace: slideFont,
              color: colors.subtitle || colors.text,
              bullet: { type: 'bullet', color: colors.accent || colors.title },
              lineSpacing: 22
            }
          }));

          s.addText(bulletItems, {
            x: 0.5, y: bulletY, w: textW, h: bodyH * 0.5,
            valign: 'top'
          });
        }
      }

      // Image
      if (hasImage) {
        try {
          s.addImage({
            data: slide.imageDataUrl,
            x: 5.8, y: 1.1, w: 3.8, h: 3.8,
            sizing: { type: 'contain', w: 3.8, h: 3.8 }
          });
        } catch (e) {
          console.warn('Erro imagem slide', i, e);
        }
      }
    });

    // Filename
    const titleSlug = (cover.title || 'apresentacao')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '')
      .substring(0, 40);

    const fileName = `${titleSlug}.pptx`;
    await pres.writeFile({ fileName });
    return fileName;
  }

  return { generate };
})();
