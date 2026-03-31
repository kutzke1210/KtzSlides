/* ============================================
   MAIN — App Controller (expanded)
   ============================================ */
const App = (() => {
  const STORAGE_KEY = 'geradorSlides_v2';
  let saveTimeout = null;
  let currentMobileTab = 'editor';

  // ---- Init ----
  function init() {
    loadFromStorage();
    bindToolbar();
    bindCoverForm();
    bindSlideActions();
    bindMobileTabs();
    renderSlideList();
    renderSelectedSlide();
    renderPreview();
  }

  // ---- LocalStorage ----
  function save() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const state = {
        slides: Slides.getState(),
        theme: Themes.getState(),
        transition: Transitions.getState(),
        selectedIndex: Slides.getSelectedIndex()
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) { console.warn('Erro ao salvar:', e); }
    }, 500);
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        if (state.slides) Slides.loadState(state.slides);
        if (state.theme) Themes.loadState(state.theme);
        if (state.transition) Transitions.loadState(state.transition);
        if (typeof state.selectedIndex === 'number') Slides.setSelectedIndex(state.selectedIndex);
        populateCoverForm();
      }
    } catch (e) { console.warn('Erro ao carregar dados:', e); }
  }

  function populateCoverForm() {
    const cover = Slides.getCover();
    document.getElementById('coverTitle').value = cover.title || '';
    document.getElementById('coverStudent').value = cover.student || '';
    document.getElementById('coverClass').value = cover.className || '';
    document.getElementById('coverDate').value = cover.date || '';
  }

  // ---- Toolbar ----
  function bindToolbar() {
    document.getElementById('btnTheme').addEventListener('click', openThemeModal);
    document.getElementById('btnTransition').addEventListener('click', openTransitionModal);
    document.getElementById('btnExport').addEventListener('click', handleExportPPTX);
    
    // Botão PDF com 2 opções: Clique normal = Apresentação, Ctrl+Clique = PDF puro
    document.getElementById('btnExportPDF').addEventListener('click', async (e) => {
      try {
        if (e.ctrlKey || e.metaKey) {
          // Ctrl+Click: Gerar PDF apenas
          await ExportPDF.generate();
        } else {
          // Clique normal: Gerar PDF + Apresentação automática
          await ExportPDF.generateAndPresent();
        }
      } catch (err) {
        console.error('Erro ao exportar:', err);
      }
    });
    
    document.getElementById('btnPresent').addEventListener('click', () => Presentation.start());
    document.getElementById('btnExportJSON').addEventListener('click', handleExportJSON);
    document.getElementById('btnImportJSON').addEventListener('click', () => document.getElementById('jsonFileInput').click());
    document.getElementById('jsonFileInput').addEventListener('change', handleImportJSON);
    document.getElementById('btnNew').addEventListener('click', handleNew);
  }

  // ---- Cover Form ----
  function bindCoverForm() {
    ['coverTitle', 'coverStudent', 'coverClass', 'coverDate'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        Slides.setCover({
          title: document.getElementById('coverTitle').value,
          student: document.getElementById('coverStudent').value,
          className: document.getElementById('coverClass').value,
          date: document.getElementById('coverDate').value
        });
        if (Slides.getSelectedIndex() === -1) renderPreview();
        renderSlideList();
        save();
      });
    });
  }

  // ---- Slide List ----
  function bindSlideActions() {
    document.getElementById('addSlideBtn').addEventListener('click', () => {
      const slide = Slides.addSlide();
      if (!slide) { toast('Limite de 100 slides atingido!', 'warning'); return; }
      Slides.setSelectedIndex(Slides.getSlides().length - 1);
      renderSlideList();
      renderSelectedSlide();
      renderPreview();
      save();
    });

    document.getElementById('coverCard').addEventListener('click', () => {
      Slides.setSelectedIndex(-1);
      renderSlideList();
      renderSelectedSlide();
      renderPreview();
    });
  }

  function renderSlideList() {
    const list = document.getElementById('slideList');
    const slides = Slides.getSlides();
    const selected = Slides.getSelectedIndex();

    document.getElementById('coverCard').classList.toggle('active', selected === -1);

    list.innerHTML = '';
    slides.forEach((slide, i) => {
      const card = document.createElement('div');
      card.className = `slide-card${i === selected ? ' active' : ''}`;
      card.innerHTML = `
        <div class="slide-card-number">${i + 2}</div>
        <div class="slide-card-info">
          <div class="slide-card-title">${escapeHtml(slide.title || `Slide ${i + 2}`)}</div>
          <div class="slide-card-preview">${escapeHtml((slide.text || '').substring(0, 50))}</div>
        </div>
        <div class="slide-card-actions">
          <button title="Mover para cima" data-action="up" data-index="${i}">↑</button>
          <button title="Mover para baixo" data-action="down" data-index="${i}">↓</button>
          <button title="Excluir" data-action="delete" data-index="${i}">✕</button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]')) return;
        Slides.setSelectedIndex(i);
        renderSlideList();
        renderSelectedSlide();
        renderPreview();
      });

      card.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const idx = parseInt(btn.dataset.index);
          if (action === 'delete') {
            Slides.removeSlide(idx);
            if (Slides.getSelectedIndex() >= Slides.getSlides().length) Slides.setSelectedIndex(Slides.getSlides().length - 1);
          } else if (action === 'up' && idx > 0) {
            Slides.moveSlide(idx, idx - 1);
            if (Slides.getSelectedIndex() === idx) Slides.setSelectedIndex(idx - 1);
          } else if (action === 'down' && idx < Slides.getSlides().length - 1) {
            Slides.moveSlide(idx, idx + 1);
            if (Slides.getSelectedIndex() === idx) Slides.setSelectedIndex(idx + 1);
          }
          renderSlideList();
          renderSelectedSlide();
          renderPreview();
          save();
        });
      });

      list.appendChild(card);
    });

    document.getElementById('slideCount').textContent = `${slides.length + 1} slides`;
  }

  // ---- Slide Editor ----
  function renderSelectedSlide() {
    const editor = document.getElementById('slideEditor');
    const idx = Slides.getSelectedIndex();

    if (idx === -1) {
      editor.innerHTML = `
        <h3>📋 SLIDE DE CAPA</h3>
        <p style="color:var(--text-muted);font-size:0.82rem;">Edite os campos da capa na seção ao lado.</p>
      `;
      return;
    }

    const slide = Slides.getSlide(idx);
    if (!slide) return;

    editor.innerHTML = `
      <h3>✏️ SLIDE ${idx + 2}</h3>
      <div class="slide-editor-fields">
        <div class="form-group">
          <label for="slideTitle">Título</label>
          <input type="text" id="slideTitle" placeholder="Título do slide" value="${escapeHtml(slide.title || '')}">
        </div>
        <div class="form-group">
          <label for="slideText">Texto principal</label>
          <textarea id="slideText" placeholder="Conteúdo do slide..." rows="3">${escapeHtml(slide.text || '')}</textarea>
        </div>
        <div class="form-group">
          <label for="slideBullets">Bullet points (um por linha)</label>
          <textarea id="slideBullets" placeholder="Item 1&#10;Item 2&#10;Item 3" rows="3">${escapeHtml(slide.bullets || '')}</textarea>
        </div>
        <div class="form-group">
          <label>Tamanho da Fonte</label>
          <div class="font-size-control">
            <span style="font-size:0.65rem;color:var(--text-muted)">A</span>
            <input type="range" id="slideFontSize" min="50" max="150" step="5" value="${slide.fontSize || 100}">
            <span style="font-size:1rem;color:var(--text-muted)">A</span>
            <span class="font-size-value" id="fontSizeValue">${slide.fontSize || 100}%</span>
          </div>
        </div>
        <div class="form-group">
          <label>Imagem (opcional)</label>
          <div class="image-upload-area ${slide.imageDataUrl ? 'has-image' : ''}" id="imageUploadArea">
            ${slide.imageDataUrl
        ? `<img src="${slide.imageDataUrl}" alt="Imagem"><button class="remove-image-btn" id="removeImageBtn" title="Remover imagem">✕</button>`
        : `<label class="image-upload-label" for="slideImageInput">
                  <span class="upload-icon">📷</span>
                  <span>Clique ou arraste uma imagem</span>
                </label>`
      }
            <input type="file" id="slideImageInput" accept="image/*" style="display:none">
          </div>
        </div>
      </div>
    `;

    // Bind events
    const titleInput = document.getElementById('slideTitle');
    const textInput = document.getElementById('slideText');
    const bulletsInput = document.getElementById('slideBullets');
    const fontSizeInput = document.getElementById('slideFontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const imageInput = document.getElementById('slideImageInput');
    const uploadArea = document.getElementById('imageUploadArea');

    const onInput = () => {
      Slides.updateSlide(idx, {
        title: titleInput.value,
        text: textInput.value,
        bullets: bulletsInput.value
      });
      const check = LayoutEngine.checkOverflow(textInput.value, bulletsInput.value);
      if (check.overflow) toast(check.message, 'warning');
      renderPreview();
      renderSlideList();
      save();
    };

    titleInput.addEventListener('input', onInput);
    textInput.addEventListener('input', onInput);
    bulletsInput.addEventListener('input', onInput);

    fontSizeInput.addEventListener('input', () => {
      const val = parseInt(fontSizeInput.value);
      fontSizeValue.textContent = val + '%';
      Slides.updateSlide(idx, { fontSize: val });
      renderPreview();
      save();
    });

    // Image upload
    uploadArea.addEventListener('click', (e) => {
      if (e.target.id === 'removeImageBtn' || e.target.closest('#removeImageBtn')) {
        e.preventDefault();
        Slides.updateSlide(idx, { imageDataUrl: null });
        renderSelectedSlide();
        renderPreview();
        save();
        return;
      }
      if (!slide.imageDataUrl) imageInput.click();
    });

    imageInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        toast('Processando imagem...', 'info');
        const dataUrl = await Images.handleUpload(file);
        Slides.updateSlide(idx, { imageDataUrl: dataUrl });
        renderSelectedSlide();
        renderPreview();
        save();
        toast('Imagem adicionada!', 'success');
      } catch (err) { toast(err.message, 'error'); }
    });

    uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.style.borderColor = 'var(--accent)'; });
    uploadArea.addEventListener('dragleave', () => { uploadArea.style.borderColor = ''; });
    uploadArea.addEventListener('drop', async (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (!file) return;
      try {
        const dataUrl = await Images.handleUpload(file);
        Slides.updateSlide(idx, { imageDataUrl: dataUrl });
        renderSelectedSlide();
        renderPreview();
        save();
        toast('Imagem adicionada!', 'success');
      } catch (err) { toast(err.message, 'error'); }
    });
  }

  // ---- Preview ----
  function renderPreview() {
    const container = document.getElementById('slidePreviewInner');
    const idx = Slides.getSelectedIndex();
    const colors = Themes.getSlideColors();
    const globalFontPct = Themes.getGlobalFontSize();
    const fontScale = (rem) => (parseFloat(rem) * globalFontPct / 100) + 'rem';

    if (idx === -1) {
      const cover = Slides.getCover();
      const fs = LayoutEngine.calculateFontSize(cover.title, 'coverTitle');
      container.className = 'slide-preview-inner cover-layout';
      container.style.background = `linear-gradient(135deg, #${colors.coverBg}, #${colors.coverBg2})`;
      container.innerHTML = `
        <div class="cover-title" style="font-size:${fontScale(fs)}">${escapeHtml(cover.title || 'Título da Apresentação')}</div>
        <div class="cover-meta">
          ${cover.student ? escapeHtml(cover.student) + '<br>' : ''}
          ${cover.className ? escapeHtml(cover.className) + '<br>' : ''}
          ${cover.date ? escapeHtml(cover.date) : ''}
        </div>
      `;
    } else {
      const slide = Slides.getSlide(idx);
      if (!slide) return;

      const slideFontPct = slide.fontSize || 100;
      const sScale = (rem) => (parseFloat(rem) * globalFontPct / 100 * slideFontPct / 100) + 'rem';

      const titleFs = LayoutEngine.calculateFontSize(slide.title, 'title');
      const bodyFs = LayoutEngine.calculateFontSize(slide.text, 'body');
      const hasImage = slide.imageDataUrl;

      let bulletsHtml = '';
      if (slide.bullets) {
        const items = slide.bullets.split('\n').filter(b => b.trim());
        if (items.length) {
          bulletsHtml = `<ul class="slide-bullets">${items.map(b => `<li style="color:#${colors.subtitle}">${escapeHtml(b.trim())}</li>`).join('')}</ul>`;
        }
      }

      container.className = 'slide-preview-inner content-layout';
      container.style.background = `#${colors.bg}`;
      container.innerHTML = `
        ${slide.title ? `<div class="slide-title" style="font-size:${sScale(titleFs)};color:#${colors.title}">${escapeHtml(slide.title)}</div>` : ''}
        <div class="slide-body">
          <div class="slide-text-area">
            ${slide.text ? `<div class="slide-text-content" style="font-size:${sScale(bodyFs)};color:#${colors.text}">${escapeHtml(slide.text).replace(/\n/g, '<br>')}</div>` : ''}
            ${bulletsHtml}
          </div>
          ${hasImage ? `<div class="slide-image-area"><img src="${slide.imageDataUrl}" alt="Imagem"></div>` : ''}
        </div>
      `;
    }
  }

  // ---- Theme Modal ----
  function openThemeModal() {
    const modal = document.getElementById('themeModal');
    modal.classList.add('active');

    const currentId = Themes.getCurrent();
    const customColors = Themes.getCustomColors();
    let activeCategory = 'all';

    // Render category tabs
    const tabsContainer = document.getElementById('themeCategoryTabs');
    const cats = Themes.getCategories();
    tabsContainer.innerHTML = cats.map(c =>
      `<button class="theme-cat-tab${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">${c.name}</button>`
    ).join('');

    // Render theme grid
    function renderGrid(cat) {
      activeCategory = cat;
      const grid = document.getElementById('themeGrid');
      const themes = Themes.getByCategory(cat);
      grid.innerHTML = themes.map(t => `
        <div class="theme-card${t.id === currentId ? ' active' : ''}" data-id="${t.id}">
          <div class="theme-card-preview" style="background:linear-gradient(135deg,#${t.colors.coverBg},#${t.colors.coverBg2});"></div>
          <div class="theme-card-name">${t.name}</div>
        </div>
      `).join('');

      // Bind
      grid.querySelectorAll('.theme-card').forEach(card => {
        card.onclick = () => {
          Themes.apply(card.dataset.id);
          grid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');

          // Update color pickers
          const preset = Themes.getPreset(card.dataset.id);
          accentInput.value = '#' + preset.colors.coverBg;
          secondaryInput.value = '#' + preset.colors.coverBg2;

          renderPreview();
          save();
        };
      });
    }

    // Tab clicks
    tabsContainer.querySelectorAll('.theme-cat-tab').forEach(tab => {
      tab.onclick = () => {
        tabsContainer.querySelectorAll('.theme-cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGrid(tab.dataset.cat);
      };
    });

    renderGrid(activeCategory);

    // Color pickers
    const accentInput = document.getElementById('customAccent');
    const secondaryInput = document.getElementById('customSecondary');

    const preset = Themes.getCurrentPreset();
    accentInput.value = customColors.accent || '#' + preset.colors.coverBg;
    secondaryInput.value = customColors.accentSecondary || '#' + preset.colors.coverBg2;

    accentInput.oninput = () => { Themes.setCustomColor('accent', accentInput.value); renderPreview(); save(); };
    secondaryInput.oninput = () => { Themes.setCustomColor('accentSecondary', secondaryInput.value); renderPreview(); save(); };

    // Global font size
    const globalFontInput = document.getElementById('globalFontSize');
    const globalFontValue = document.getElementById('globalFontValue');
    globalFontInput.value = Themes.getGlobalFontSize();
    globalFontValue.textContent = Themes.getGlobalFontSize() + '%';

    globalFontInput.oninput = () => {
      const val = parseInt(globalFontInput.value);
      globalFontValue.textContent = val + '%';
      Themes.setGlobalFontSize(val);
      renderPreview();
      save();
    };

    // Close
    document.getElementById('closeThemeModal').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
  }

  function openTransitionModal() {
    const modal = document.getElementById('transitionModal');
    modal.classList.add('active');

    const curId = Transitions.getCurrent();
    const tabsContainer = document.getElementById('transitionCategoryTabs');
    const grid = document.getElementById('transitionGrid');

    let activeCategory = 'classic';

    // Tabs
    tabsContainer.innerHTML = Transitions.getCategories().map(cat => `
      <button class="theme-cat-tab${cat.id === activeCategory ? ' active' : ''}" data-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    function renderGrid(cat) {
      activeCategory = cat;
      const list = Transitions.getByCategory(cat);

      grid.innerHTML = list.map(t => `
        <div class="theme-card${t.id === curId ? ' active' : ''}" data-id="${t.id}">
          <div class="theme-card-preview" style="background:#222;display:flex;align-items:center;justify-content:center;color:white;font-size:1.5rem;">✨</div>
          <div class="theme-card-name">${t.name}</div>
        </div>
      `).join('');

      // Bind
      grid.querySelectorAll('.theme-card').forEach(card => {
        card.onclick = () => {
          Transitions.apply(card.dataset.id);
          grid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          toast(`Efeito "${Transitions.getCurrentPreset().name}" aplicado!`, 'success');
          save();
        };
      });
    }

    // Tab clicks
    tabsContainer.querySelectorAll('.theme-cat-tab').forEach(tab => {
      tab.onclick = () => {
        tabsContainer.querySelectorAll('.theme-cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGrid(tab.dataset.cat);
      };
    });

    renderGrid(activeCategory);

    // Close
    document.getElementById('closeTransitionModal').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
  }

  // ---- Export / Import ----
  async function handleExportPPTX() {
    try {
      toast('Gerando arquivo PPTX...', 'info');
      const fileName = await ExportPPTX.generate();
      toast(`"${fileName}" gerado com sucesso!`, 'success');
    } catch (err) {
      toast('Erro ao gerar PPTX: ' + err.message, 'error');
      console.error(err);
    }
  }

  async function handleExportPDF() {
    try {
      toast('Processando PDF (isso pode levar alguns segundos)...', 'info');
      const fileName = await ExportPDF.generate();
      toast(`"${fileName}" gerado com sucesso!`, 'success');
    } catch (err) {
      toast('Erro ao gerar PDF: ' + err.message, 'error');
      console.error(err);
    }
  }

  function handleExportJSON() {
    const state = { slides: Slides.getState(), theme: Themes.getState() };
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const cover = Slides.getCover();
    const name = (cover.title || 'projeto').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Projeto exportado em JSON!', 'success');
  }

  function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const state = JSON.parse(ev.target.result);
        if (state.slides) Slides.loadState(state.slides);
        if (state.theme) Themes.loadState(state.theme);
        Slides.setSelectedIndex(-1);
        populateCoverForm();
        renderSlideList();
        renderSelectedSlide();
        renderPreview();
        save();
        toast('Projeto importado com sucesso!', 'success');
      } catch (err) { toast('Erro ao importar JSON: arquivo inválido.', 'error'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleNew() {
    if (!confirm('Criar nova apresentação? Os dados atuais serão perdidos.')) return;
    Slides.reset();
    Themes.apply('hist_antiga');
    Themes.setGlobalFontSize(100);
    Slides.setSelectedIndex(-1);
    populateCoverForm();
    renderSlideList();
    renderSelectedSlide();
    renderPreview();
    save();
    toast('Nova apresentação criada!', 'success');
  }

  // ---- Mobile Tabs ----
  function bindMobileTabs() {
    document.querySelectorAll('.mobile-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentMobileTab = tab.dataset.tab;
        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === currentMobileTab));
        document.querySelector('.sidebar').classList.toggle('panel-hidden', currentMobileTab !== 'editor');
        document.querySelector('.main-content').classList.toggle('panel-hidden', currentMobileTab !== 'preview');
      });
    });
  }

  // ---- Toast ----
  function toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  return { init, renderPreview };
})();

document.addEventListener('DOMContentLoaded', App.init);
