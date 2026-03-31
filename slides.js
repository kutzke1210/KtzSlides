/* ============================================
   SLIDES — Slide data model with font size
   ============================================ */
const Slides = (() => {
  let data = {
    cover: {
      title: '',
      student: '',
      className: '',
      date: new Date().toISOString().split('T')[0]
    },
    slides: []
  };

  let selectedIndex = -1;

  function createSlide() {
    return {
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      title: '',
      text: '',
      bullets: '',
      imageDataUrl: null,
      fontSize: 100 // percentage: 50–150
    };
  }

  function getCover() { return data.cover; }
  function setCover(coverData) { Object.assign(data.cover, coverData); }
  function getSlides() { return data.slides; }
  function getSlide(index) { return data.slides[index]; }

  function addSlide() {
    if (data.slides.length >= 100) return null;
    const slide = createSlide();
    data.slides.push(slide);
    return slide;
  }

  function removeSlide(index) {
    if (index < 0 || index >= data.slides.length) return;
    data.slides.splice(index, 1);
    if (selectedIndex >= data.slides.length) {
      selectedIndex = data.slides.length - 1;
    }
  }

  function updateSlide(index, updates) {
    if (index < 0 || index >= data.slides.length) return;
    Object.assign(data.slides[index], updates);
  }

  function moveSlide(fromIndex, toIndex) {
    if (fromIndex < 0 || fromIndex >= data.slides.length) return;
    if (toIndex < 0 || toIndex >= data.slides.length) return;
    const [slide] = data.slides.splice(fromIndex, 1);
    data.slides.splice(toIndex, 0, slide);
  }

  function getSelectedIndex() { return selectedIndex; }
  function setSelectedIndex(i) { selectedIndex = i; }
  function getTotal() { return data.slides.length + 1; }

  function getState() { return JSON.parse(JSON.stringify(data)); }

  function loadState(state) {
    data = state;
    if (!data.cover) {
      data.cover = { title: '', student: '', className: '', date: new Date().toISOString().split('T')[0] };
    }
    if (!data.slides) data.slides = [];
    // Ensure fontSize field exists
    data.slides.forEach(s => { if (!s.fontSize) s.fontSize = 100; });
  }

  function reset() {
    data = {
      cover: { title: '', student: '', className: '', date: new Date().toISOString().split('T')[0] },
      slides: []
    };
    selectedIndex = -1;
  }

  return {
    getCover, setCover, getSlides, getSlide,
    addSlide, removeSlide, updateSlide, moveSlide,
    getSelectedIndex, setSelectedIndex, getTotal,
    getState, loadState, reset
  };
})();
