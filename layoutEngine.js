/* ============================================
   LAYOUT ENGINE — Auto text sizing
   ============================================ */
const LayoutEngine = (() => {
  // Calculate appropriate font size based on text length
  function calculateFontSize(text, containerType) {
    if (!text) return null;
    const len = text.length;

    if (containerType === 'title') {
      if (len < 20) return '1.6rem';
      if (len < 40) return '1.4rem';
      if (len < 60) return '1.2rem';
      return '1rem';
    }

    if (containerType === 'coverTitle') {
      if (len < 20) return '2.2rem';
      if (len < 40) return '1.8rem';
      if (len < 60) return '1.5rem';
      return '1.3rem';
    }

    if (containerType === 'presentationCoverTitle') {
      if (len < 20) return '3.2rem';
      if (len < 40) return '2.6rem';
      if (len < 60) return '2.2rem';
      return '1.8rem';
    }

    if (containerType === 'presentationTitle') {
      if (len < 20) return '2.4rem';
      if (len < 40) return '2rem';
      if (len < 60) return '1.7rem';
      return '1.4rem';
    }

    // body text
    if (len < 100) return '1rem';
    if (len < 200) return '0.92rem';
    if (len < 400) return '0.85rem';
    return '0.78rem';
  }

  // Check if content might overflow and suggest splitting
  function checkOverflow(text, bullets) {
    const textLen = (text || '').length;
    const bulletLines = (bullets || '').split('\n').filter(b => b.trim()).length;
    const totalContent = textLen + bulletLines * 40;

    if (totalContent > 500) {
      return { overflow: true, message: 'Conteúdo muito longo! Considere dividir em mais slides.' };
    }
    return { overflow: false };
  }

  // Calculate PPTX font sizes (in points)
  function pptxFontSize(text, type) {
    if (!text) return 18;
    const len = text.length;

    if (type === 'title') {
      if (len < 20) return 36;
      if (len < 40) return 30;
      if (len < 60) return 26;
      return 22;
    }

    if (type === 'coverTitle') {
      if (len < 20) return 44;
      if (len < 40) return 38;
      if (len < 60) return 32;
      return 28;
    }

    // body
    if (len < 100) return 18;
    if (len < 200) return 16;
    if (len < 400) return 14;
    return 12;
  }

  return { calculateFontSize, checkOverflow, pptxFontSize };
})();
