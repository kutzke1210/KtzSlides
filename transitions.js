/* ============================================
   TRANSITIONS ENGINE — 25 Custom Animations
   ============================================ */

const Transitions = (() => {

  const PRESETS = [
    // --- CLASSIC (1-8) ---
    { id: 'fade', name: 'Fade Suave', cat: 'classic', cssClass: 'anim-fade', pptx: { type: 'fade', speed: 'fast' } },
    { id: 'push', name: 'Push (Empurrão)', cat: 'classic', cssClass: 'anim-push', pptx: { type: 'push', speed: 'fast' } },
    { id: 'wipe', name: 'Wipe (Varredura)', cat: 'classic', cssClass: 'anim-wipe', pptx: { type: 'wipe', speed: 'fast' } },
    { id: 'slide', name: 'Slide Lateral', cat: 'classic', cssClass: 'anim-slide', pptx: { type: 'push', speed: 'fast' } }, // slide is standard push
    { id: 'reveal', name: 'Reveal (Revelar)', cat: 'classic', cssClass: 'anim-reveal', pptx: { type: 'fade', speed: 'slow' } },
    { id: 'cover', name: 'Cover (Cobrir)', cat: 'classic', cssClass: 'anim-cover', pptx: { type: 'fade', speed: 'fast' } },
    { id: 'split', name: 'Split (Dividir)', cat: 'classic', cssClass: 'anim-split', pptx: { type: 'split', speed: 'fast' } },
    { id: 'zoom', name: 'Zoom In/Out', cat: 'classic', cssClass: 'anim-zoom', pptx: { type: 'zoom', speed: 'fast' } },

    // --- MODERN (9-16) ---
    { id: 'morph', name: 'Morph (Transformar)', cat: 'modern', cssClass: 'anim-morph', pptx: { type: 'fade', speed: 'slow' } }, // Fallback to slow fade for PPTX
    { id: 'glitch', name: 'Glitch Digital', cat: 'modern', cssClass: 'anim-glitch', pptx: { type: 'randomBar', speed: 'fast' } },
    { id: 'neon', name: 'Neon Glow', cat: 'modern', cssClass: 'anim-neon', pptx: { type: 'fade', speed: 'fast' } },
    { id: 'box', name: 'Box Expand', cat: 'modern', cssClass: 'anim-box', pptx: { type: 'zoom', speed: 'fast' } },
    { id: 'linesweep', name: 'Line Sweep', cat: 'modern', cssClass: 'anim-linesweep', pptx: { type: 'wipe', speed: 'fast' } },
    { id: 'particle', name: 'Particle Burst', cat: 'modern', cssClass: 'anim-particle', pptx: { type: 'dissolve', speed: 'fast' } },
    { id: 'flip', name: 'Flip 3D', cat: 'modern', cssClass: 'anim-flip', pptx: { type: 'fade', speed: 'fast' } },
    { id: 'scale', name: 'Scale + Rotate', cat: 'modern', cssClass: 'anim-scale', pptx: { type: 'zoom', speed: 'fast' } },

    // --- CREATIVE (17-25) ---
    { id: 'ink', name: 'Ink / Paint Brush', cat: 'creative', cssClass: 'anim-ink', pptx: { type: 'wipe', speed: 'fast' } },
    { id: 'paper', name: 'Paper Tear', cat: 'creative', cssClass: 'anim-paper', pptx: { type: 'strips', speed: 'fast' } },
    { id: 'clock', name: 'Clock / Circular', cat: 'creative', cssClass: 'anim-clock', pptx: { type: 'circle', speed: 'fast' } },
    { id: 'timeline', name: 'Timeline Slide', cat: 'creative', cssClass: 'anim-timeline', pptx: { type: 'push', speed: 'fast' } },
    { id: 'film', name: 'Photo Film', cat: 'creative', cssClass: 'anim-film', pptx: { type: 'slide', speed: 'fast' } },
    { id: 'urban', name: 'Urban Graffiti', cat: 'creative', cssClass: 'anim-urban', pptx: { type: 'randomBar', speed: 'fast' } },
    { id: 'golden', name: 'Golden Reveal', cat: 'creative', cssClass: 'anim-golden', pptx: { type: 'fade', speed: 'slow' } },
    { id: 'fadeblur', name: 'Fade + Blur', cat: 'creative', cssClass: 'anim-fadeblur', pptx: { type: 'fade', speed: 'slow' } },
    { id: 'morphicon', name: 'Morph Icon', cat: 'creative', cssClass: 'anim-morphicon', pptx: { type: 'zoom', speed: 'fast' } }
  ];

  const CATEGORIES = [
    { id: 'classic', name: 'Clássicas' },
    { id: 'modern', name: 'Modernas' },
    { id: 'creative', name: 'Criativas' }
  ];

  let currentId = 'fade';

  function apply(id) {
    if (PRESETS.find(t => t.id === id)) currentId = id;
  }

  function getCurrent() { return currentId; }
  function getCurrentPreset() { return PRESETS.find(t => t.id === currentId) || PRESETS[0]; }
  function getAll() { return PRESETS; }
  function getCategories() { return CATEGORIES; }
  function getByCategory(cat) { return PRESETS.filter(t => t.cat === cat); }

  function getState() { return currentId; }
  function loadState(state) { if (state) currentId = state; }

  return {
    apply, getCurrent, getCurrentPreset, getAll, getCategories, getByCategory, getState, loadState
  };
})();
