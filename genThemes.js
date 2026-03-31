const fs = require('fs');

const histNames = [
  "História Antiga", "Idade Média", "Renascimento", "Egito Antigo", "Roma Antiga", "Grécia Clássica", "Civilizações Asiáticas", "Guerras Mundiais", "História da Arte", "Literatura Clássica", "Filosofia", "Ciência", "Arquitetura", "Moda Histórica", "Mitologia", "Olimpíadas", "Descobrimentos", "Música Antiga", "Teatro", "Fotografia Histórica", "Patrimônio Mundial", "Navegações", "Escrita", "Jornalismo Histórico", "Quadrinhos Históricos", "Filosofia Oriental", "Direito Histórico", "Astronomia Antiga", "Histórias Locais", "Cultura Popular", "História Militar", "Educação Histórica", "Medicina", "Líderes e Biografias", "Revoluções", "Civilizações Modernas", "Inovações", "Cartografia Histórica", "Tecnologia Antiga", "Cartões Educativos", "Linha do Tempo Interativa", "Museus Virtuais", "Galeria de Fotos Históricas", "Timeline de Eventos", "Religiões", "Mapas de Conflitos", "Patrimônio Cultural", "Artefatos", "Biografias de Inventores", "História Digital"
];

const bizNames = [
  "Consultoria", "Finanças", "Marketing Digital", "Tecnologia", "Agência Criativa", "Portfolio Profissional", "SaaS", "Empresa de TI", "Engenharia", "Arquitetura", "Logística", "Energia", "Recursos Humanos", "Educação Corporativa", "Inovação", "Software", "Hardware", "Telecom", "Sustentabilidade", "Transporte", "Turismo", "Fitness Corporativo", "Branding", "Investimentos", "Carreiras", "Eventos Corporativos", "Real Estate", "E-commerce Empresarial", "Business Analytics", "Dashboard", "Startups de Tecnologia", "Empreendedorismo", "Inteligência Artificial", "Cloud Computing", "Educação Profissional", "Design Corporativo", "Agência de Publicidade", "Produtos Digitais", "Produtos de Luxo", "Serviços Profissionais", "Consultoria Jurídica", "Consultoria Financeira", "Landing Pages", "One Page Corporativo", "Gestão de Projetos", "Portfólio de Cases", "Time de Equipe", "Produtos Digitais Corporativos", "Serviços Personalizados"
];

const minNames = [
  "Minimalista Branco", "Preto", "Monocromático", "Grid Simples", "One Page", "Tipografia Forte", "Espaço Branco", "Layout com Ícones", "Layout Fotográfico", "Blog Limpo", "Portfolio Limpo", "Produto Minimalista", "Serviços Clean", "Agência Clean", "Dashboard Limpo", "E-commerce Minimalista", "Landing Page Minimalista", "App Clean", "Restaurante Minimalista", "Hotel Clean", "Portfólio Pessoal", "Blog de História Limpo", "Educação Clean", "Consultoria Minimalista", "Startups Modernas", "Empresa Clean", "Cards Animados", "Grid Simples", "Fullscreen Gallery", "Mockups Minimalistas", "Seções Claras", "CTA Direto", "Fotos Grandes", "Tipografia Elegante", "Layout Criativo Limpo", "Grid Uniforme", "Cards Hover", "Background Textura Leve", "Layout Fluido", "Cards com Sombra", "Tipografia Impactante", "Layout Escuro Clean", "Layout Corporativo Minimalista", "Grid de Produtos Clean", "Timeline Interativa", "Layout One Page Fluido", "Layout Responsivo Clean", "Layout Fotográfico Moderno", "Layout Typographic Focus"
];

const urbNames = [
  "Skyline Noturno", "Grafite", "Rua Realista", "Neon Glow", "Preto & Vermelho", "Dourado Urbano", "Tipografia Estilo Stencil", "Graffiti Banner", "Background Concreto", "Cards Street", "Hover Colorido", "Grid Assimétrico", "Silhuetas", "Shadows Profundos", "Layout Street Style", "Icons Hip-Hop", "Mural Interativo", "Layout de Portfólio Urbano", "Hero Section Noturna", "CTA Destacado", "Hover Glow", "Layout de Loja Streetwear", "Galeria de Arte Urbana", "Landing Page Gangster", "Cards de Projeto Urbano", "Timeline de Eventos de Rua", "Mockup de Sneakers", "Grid de Fotos Urbanas", "E-commerce Streetwear", "Portfólio Fotográfico Urbano", "Mapas Interativos de Bairro", "Seções com Textura", "Background de Tijolos", "Hover Neon", "Layout Escuro", "Layout Noturno", "Layout de Eventos Urbanos", "Timeline de Música Urbana", "Layout de Blog de Rap", "Background de Parede Grafitada", "Cards com Bordas Douradas", "Grid Criativo Urbano", "Tipografia Marcante", "Layout One Page Urbano", "Portfolio de Arte de Rua", "Layout Fotográfico Noturno", "CTA Neon Glow", "Layout Responsivo Street", "Layout de Revista Urbana"
];

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function genColors(cat, i, total) {
  let h, s, bgL, txtL, ttlL, acL, cvL, cv2L;
  
  if (cat === 'historia') {
    // Warm, earthy tones, sepias
    h = 30 + (i * 3) % 40; // 30-70 (oranges, browns, golds)
    s = 40 + (i % 20);
    bgL = 92 - (i % 5);
    ttlL = 20;
    txtL = 25;
    acL = 35;
    cvL = 20;
    cv2L = 40;
  } else if (cat === 'empresarial') {
    // Blues, teals, professional
    h = 200 + (i * 5) % 80;
    s = 60 + (i % 30);
    bgL = 96 - (i % 3);
    ttlL = 25;
    txtL = 30;
    acL = 45;
    cvL = 30;
    cv2L = 50;
  } else if (cat === 'minimalista') {
    // Monochromes, off-whites, very subtle
    h = (i * 15) % 360;
    s = i % 2 === 0 ? 0 : 10;
    bgL = i % 3 === 0 ? 10 : 98; // mix of dark and light
    let isDark = bgL < 50;
    ttlL = isDark ? 95 : 15;
    txtL = isDark ? 80 : 30;
    acL = isDark ? 70 : 40;
    cvL = isDark ? 15 : 95;
    cv2L = isDark ? 25 : 85;
  } else {
    // Urbano - Dark backgrounds, neon accents
    h = (i * 20) % 360; 
    s = 80 + (i % 20); // vibrant
    bgL = 8 + (i % 5); // very dark
    ttlL = 90;
    txtL = 75;
    acL = 60; // neon
    cvL = 12;
    cv2L = 25;
  }

  return {
    bg: hslToHex(h, s, bgL),
    title: hslToHex(h, s, ttlL),
    text: hslToHex(h, s, txtL),
    subtitle: hslToHex(h, s, txtL + (bgL > 50 ? 15 : -15)),
    accent: hslToHex(h, s, acL),
    coverBg: hslToHex(h, s, cvL),
    coverBg2: hslToHex((h + 20)%360, s, cv2L)
  };
}

let presets = [];
function addList(names, cat, font) {
  names.forEach((name, i) => {
    let id = cat + '_' + i;
    let colors = genColors(cat, i, names.length);
    presets.push(`{ id:'${id}', name:'${name.replace(/'/g, "\\'")}', cat:'${cat}', colors:{bg:'${colors.bg}',title:'${colors.title}',text:'${colors.text}',subtitle:'${colors.subtitle}',accent:'${colors.accent}',coverBg:'${colors.coverBg}',coverBg2:'${colors.coverBg2}'}, font:'${font}' }`);
  });
}

addList(histNames, 'historia', 'Georgia');
addList(bizNames, 'empresarial', 'Arial');
addList(minNames, 'minimalista', 'Arial');
addList(urbNames, 'urbano', 'Impact');

let jsTemplate = `
/* ============================================
   THEMES — 200 Categorized Style Presets
   ============================================ */
const Themes = (() => {

  const PRESETS = [
    ${presets.join(',\\n    ')}
  ];

  const CATEGORIES = [
    { id: 'all', name: 'Todos' },
    { id: 'historia', name: 'História / Cultura' },
    { id: 'empresarial', name: 'Empresarial / Startups' },
    { id: 'minimalista', name: 'Minimalista / Limpo' },
    { id: 'urbano', name: 'Urbano / Street' }
  ];

  let currentPresetId = PRESETS[0].id;
  let customColors = { accent: null, accentSecondary: null };
  let globalFontSize = 100;

  function getPreset(id) {
    return PRESETS.find(p => p.id === id) || PRESETS[0];
  }

  function apply(presetId) {
    const preset = getPreset(presetId);
    if (!preset) return;
    currentPresetId = presetId;
  }

  function getCurrent() { return currentPresetId; }
  function getCurrentPreset() { return getPreset(currentPresetId); }
  function getAll() { return PRESETS; }
  function getCategories() { return CATEGORIES; }

  function getByCategory(cat) {
    if (cat === 'all') return PRESETS;
    return PRESETS.filter(p => p.cat === cat);
  }

  function setCustomColor(type, color) { customColors[type] = color; }

  function getSlideColors() {
    const preset = getCurrentPreset();
    const colors = { ...preset.colors };
    if (customColors.accent) {
      colors.title = customColors.accent.replace('#', '');
      colors.accent = customColors.accent.replace('#', '');
      colors.coverBg = customColors.accent.replace('#', '');
    }
    if (customColors.accentSecondary) {
      colors.coverBg2 = customColors.accentSecondary.replace('#', '');
    }
    return colors;
  }

  function getSlideFont() { return getCurrentPreset().font || 'Arial'; }
  function getCustomColors() { return { ...customColors }; }
  function setGlobalFontSize(pct) { globalFontSize = Math.max(50, Math.min(150, pct)); }
  function getGlobalFontSize() { return globalFontSize; }

  function getState() {
    return { presetId: currentPresetId, customColors: { ...customColors }, globalFontSize };
  }

  function loadState(state) {
    if (state.presetId) currentPresetId = state.presetId;
    if (state.customColors) customColors = { ...state.customColors };
    if (state.globalFontSize) globalFontSize = state.globalFontSize;
  }

  return {
    apply, getCurrent, getCurrentPreset, getAll, getCategories,
    getByCategory, setCustomColor, getSlideColors, getSlideFont,
    getCustomColors, setGlobalFontSize, getGlobalFontSize,
    getState, loadState, getPreset
  };
})();
`;

fs.writeFileSync('themes.js', jsTemplate, 'utf8');
console.log('themes.js generated successfully!');
