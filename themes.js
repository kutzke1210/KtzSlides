/* ============================================
   THEMES — 150 Categorized Style Presets
   ============================================ */
const Themes = (() => {

  // ========== THEME DEFINITIONS ==========
  // Each theme: { name, category, colors{bg, title, text, subtitle, accent, coverBg, coverBg2}, font }
  const PRESETS = [
    // ==========================================
    //  CATEGORIA: HISTÓRIA (50 temas)
    // ==========================================
    { id: 'hist_antiga', name: 'História Antiga', cat: 'historia', colors: { bg: 'F5F0E1', title: '5C3A1E', text: '3D2B1A', subtitle: '7A6040', accent: '8B6914', coverBg: '5C3A1E', coverBg2: '8B6914' }, font: 'Georgia' },
    { id: 'hist_medieval', name: 'História Medieval', cat: 'historia', colors: { bg: '2A1F14', title: 'C9A84C', text: 'D4C4A8', subtitle: '9E8A6A', accent: 'C9A84C', coverBg: '1A1408', coverBg2: '4A3520' }, font: 'Georgia' },
    { id: 'hist_moderna', name: 'História Moderna', cat: 'historia', colors: { bg: 'F8F6F0', title: '1B3A4B', text: '2D3436', subtitle: '576574', accent: '1B3A4B', coverBg: '1B3A4B', coverBg2: '2C6E8A' }, font: 'Georgia' },
    { id: 'hist_revolucoes', name: 'Revoluções Mundiais', cat: 'historia', colors: { bg: '1A0A0A', title: 'D32F2F', text: 'E0D6CC', subtitle: 'A09080', accent: 'D32F2F', coverBg: '8B0000', coverBg2: '4A0000' }, font: 'Arial' },
    { id: 'hist_classicas', name: 'Civilizações Clássicas', cat: 'historia', colors: { bg: 'F0EDE5', title: '6B5B3E', text: '3E352B', subtitle: '8A7B60', accent: 'B8A070', coverBg: '6B5B3E', coverBg2: '8A7B60' }, font: 'Georgia' },
    { id: 'hist_asia', name: 'Impérios Asiáticos', cat: 'historia', colors: { bg: '1C0F0A', title: 'E8C547', text: 'F0E6D0', subtitle: 'C4A870', accent: 'C41E3A', coverBg: '8B0000', coverBg2: 'E8C547' }, font: 'Georgia' },
    { id: 'hist_egito', name: 'Egito Antigo', cat: 'historia', colors: { bg: '2B1F0E', title: 'E8C547', text: 'DDD0B0', subtitle: 'B8A070', accent: 'E8C547', coverBg: '1A1000', coverBg2: '8B6914' }, font: 'Georgia' },
    { id: 'hist_roma', name: 'Roma Antiga', cat: 'historia', colors: { bg: 'F5F0E5', title: '8B0000', text: '2C1810', subtitle: '6B4C3B', accent: '8B0000', coverBg: '800000', coverBg2: '4A0000' }, font: 'Georgia' },
    { id: 'hist_grecia', name: 'Grécia Antiga', cat: 'historia', colors: { bg: 'EDE8DD', title: '1E3A5F', text: '2D3436', subtitle: '5A6E7F', accent: '1E3A5F', coverBg: '1E3A5F', coverBg2: '0D2137' }, font: 'Georgia' },
    { id: 'hist_descobertas', name: 'Idade das Descobertas', cat: 'historia', colors: { bg: '0D1B2A', title: 'E0A526', text: 'D0D8E0', subtitle: '7A8A9A', accent: 'E0A526', coverBg: '0D1B2A', coverBg2: '1B3A5A' }, font: 'Georgia' },
    { id: 'hist_americana', name: 'História Americana', cat: 'historia', colors: { bg: 'F8F5EF', title: '002868', text: '1A1A2E', subtitle: '555770', accent: 'BF0A30', coverBg: '002868', coverBg2: 'BF0A30' }, font: 'Arial' },
    { id: 'hist_europeia', name: 'História Européia', cat: 'historia', colors: { bg: 'F0EDE8', title: '003399', text: '2D3436', subtitle: '5C6B7A', accent: '003399', coverBg: '003399', coverBg2: '001A4D' }, font: 'Georgia' },
    { id: 'hist_guerras', name: 'Guerras Mundiais', cat: 'historia', colors: { bg: '141414', title: 'A0A0A0', text: 'C0C0C0', subtitle: '707070', accent: '8B0000', coverBg: '1A1A1A', coverBg2: '333333' }, font: 'Arial' },
    { id: 'hist_arte', name: 'História da Arte', cat: 'historia', colors: { bg: 'FAF8F5', title: '8B4513', text: '2D2D2D', subtitle: '6B6B6B', accent: 'C0392B', coverBg: '8B4513', coverBg2: 'A0522D' }, font: 'Georgia' },
    { id: 'hist_musica', name: 'História da Música', cat: 'historia', colors: { bg: '0A0A14', title: 'FF6B35', text: 'E0E0E0', subtitle: '8A8A9A', accent: 'FF6B35', coverBg: '1A0A2E', coverBg2: 'FF6B35' }, font: 'Arial' },
    { id: 'hist_literatura', name: 'Literatura Clássica', cat: 'historia', colors: { bg: 'F5F0E5', title: '2C1810', text: '3A2A1A', subtitle: '7A6A50', accent: '8B4513', coverBg: '2C1810', coverBg2: '5C3A20' }, font: 'Georgia' },
    { id: 'hist_inventores', name: 'Inventores e Inovações', cat: 'historia', colors: { bg: 'F0F4F8', title: '0077B6', text: '1A1A2E', subtitle: '555770', accent: '0077B6', coverBg: '023E8A', coverBg2: '0077B6' }, font: 'Arial' },
    { id: 'hist_cultura', name: 'Cultura Popular', cat: 'historia', colors: { bg: 'FFF5E6', title: 'E65100', text: '2D2D2D', subtitle: '666666', accent: 'E65100', coverBg: 'E65100', coverBg2: 'BF4500' }, font: 'Arial' },
    { id: 'hist_cinema', name: 'História do Cinema', cat: 'historia', colors: { bg: '0A0A0A', title: 'F5C518', text: 'E0E0E0', subtitle: '8A8A8A', accent: 'F5C518', coverBg: '1A1A1A', coverBg2: 'F5C518' }, font: 'Arial' },
    { id: 'hist_industrial', name: 'Revoluções Industriais', cat: 'historia', colors: { bg: '1A1A1A', title: 'FF8C00', text: 'D0D0D0', subtitle: '888888', accent: 'FF8C00', coverBg: '2A2A2A', coverBg2: 'FF8C00' }, font: 'Arial' },
    { id: 'hist_politica', name: 'História Política', cat: 'historia', colors: { bg: 'F0EDE8', title: '1A237E', text: '212121', subtitle: '616161', accent: 'C62828', coverBg: '1A237E', coverBg2: '283593' }, font: 'Arial' },
    { id: 'hist_filosofia', name: 'História da Filosofia', cat: 'historia', colors: { bg: 'F8F5F0', title: '4A148C', text: '2D2D2D', subtitle: '757575', accent: '4A148C', coverBg: '4A148C', coverBg2: '6A1B9A' }, font: 'Georgia' },
    { id: 'hist_religioes', name: 'História das Religiões', cat: 'historia', colors: { bg: 'FAF8F2', title: '5D4037', text: '3E2723', subtitle: '795548', accent: 'BF360C', coverBg: '5D4037', coverBg2: '3E2723' }, font: 'Georgia' },
    { id: 'hist_mitologia', name: 'Mitologia Comparada', cat: 'historia', colors: { bg: '0F0C1A', title: 'CE93D8', text: 'E0D6F0', subtitle: '9575CD', accent: 'CE93D8', coverBg: '1A0A2E', coverBg2: '4A148C' }, font: 'Georgia' },
    { id: 'hist_ciencia', name: 'História da Ciência', cat: 'historia', colors: { bg: 'E8F5E9', title: '1B5E20', text: '212121', subtitle: '4E7A51', accent: '2E7D32', coverBg: '1B5E20', coverBg2: '388E3C' }, font: 'Arial' },
    { id: 'hist_biografias', name: 'Biografias de Líderes', cat: 'historia', colors: { bg: 'FAFAF0', title: '37474F', text: '212121', subtitle: '607D8B', accent: 'D4AF37', coverBg: '263238', coverBg2: '37474F' }, font: 'Georgia' },
    { id: 'hist_moda', name: 'História da Moda', cat: 'historia', colors: { bg: 'FFF0F5', title: 'AD1457', text: '2D2D2D', subtitle: '880E4F', accent: 'AD1457', coverBg: '880E4F', coverBg2: 'AD1457' }, font: 'Georgia' },
    { id: 'hist_cidades', name: 'História das Cidades', cat: 'historia', colors: { bg: 'ECEFF1', title: '37474F', text: '263238', subtitle: '607D8B', accent: '455A64', coverBg: '263238', coverBg2: '455A64' }, font: 'Arial' },
    { id: 'hist_educacao', name: 'História da Educação', cat: 'historia', colors: { bg: 'F3E5F5', title: '6A1B9A', text: '2D2D2D', subtitle: '8E24AA', accent: '6A1B9A', coverBg: '4A148C', coverBg2: '7B1FA2' }, font: 'Georgia' },
    { id: 'hist_medicina', name: 'História da Medicina', cat: 'historia', colors: { bg: 'E3F2FD', title: '0D47A1', text: '1A1A2E', subtitle: '1565C0', accent: '0D47A1', coverBg: '0D47A1', coverBg2: '1565C0' }, font: 'Arial' },
    { id: 'hist_descobrimentos', name: 'Descobertas Científicas', cat: 'historia', colors: { bg: 'E0F7FA', title: '006064', text: '212121', subtitle: '00838F', accent: '006064', coverBg: '004D40', coverBg2: '00838F' }, font: 'Arial' },
    { id: 'hist_locais', name: 'Histórias Locais', cat: 'historia', colors: { bg: 'FFF8E1', title: 'E65100', text: '3E2723', subtitle: 'A1887F', accent: 'E65100', coverBg: 'BF360C', coverBg2: 'E65100' }, font: 'Arial' },
    { id: 'hist_regionais', name: 'Histórias Regionais', cat: 'historia', colors: { bg: 'F1F8E9', title: '33691E', text: '1B5E20', subtitle: '558B2F', accent: '33691E', coverBg: '1B5E20', coverBg2: '558B2F' }, font: 'Arial' },
    { id: 'hist_arquitetura', name: 'Arquitetura Histórica', cat: 'historia', colors: { bg: 'EFEBE9', title: '4E342E', text: '3E2723', subtitle: '6D4C41', accent: '795548', coverBg: '3E2723', coverBg2: '5D4037' }, font: 'Georgia' },
    { id: 'hist_patrimonio', name: 'Patrimônio Mundial', cat: 'historia', colors: { bg: 'E8EAF6', title: '1A237E', text: '212121', subtitle: '3949AB', accent: 'E8B130', coverBg: '1A237E', coverBg2: '283593' }, font: 'Georgia' },
    { id: 'hist_transporte', name: 'História do Transporte', cat: 'historia', colors: { bg: 'F5F5F5', title: '424242', text: '212121', subtitle: '757575', accent: 'FF6D00', coverBg: '424242', coverBg2: '616161' }, font: 'Arial' },
    { id: 'hist_militar', name: 'História Militar', cat: 'historia', colors: { bg: '1B1B1B', title: '8D9E78', text: 'C0C0B0', subtitle: '6B7A5E', accent: '556B2F', coverBg: '2E3B2E', coverBg2: '556B2F' }, font: 'Arial' },
    { id: 'hist_navegacoes', name: 'Grandes Navegações', cat: 'historia', colors: { bg: '0A1628', title: 'C9B037', text: 'C8D0D8', subtitle: '6A7A8A', accent: 'C9B037', coverBg: '0A1628', coverBg2: '1A3050' }, font: 'Georgia' },
    { id: 'hist_escrita', name: 'História da Escrita', cat: 'historia', colors: { bg: 'FDF5E6', title: '6B3A2A', text: '3E2A1C', subtitle: '8B7355', accent: '6B3A2A', coverBg: '3E2A1C', coverBg2: '6B3A2A' }, font: 'Georgia' },
    { id: 'hist_olimpiadas', name: 'História das Olimpíadas', cat: 'historia', colors: { bg: 'FFFFFF', title: '0085C7', text: '1A1A1A', subtitle: '555555', accent: 'F4C300', coverBg: '0085C7', coverBg2: '009F3D' }, font: 'Arial' },
    { id: 'hist_teatro', name: 'História do Teatro', cat: 'historia', colors: { bg: '1A0A14', title: 'E6B422', text: 'E0D8D0', subtitle: 'A09080', accent: '8B0000', coverBg: '2A0A18', coverBg2: '8B0000' }, font: 'Georgia' },
    { id: 'hist_fotografia', name: 'História da Fotografia', cat: 'historia', colors: { bg: '1A1A1A', title: 'CCCCCC', text: 'B0B0B0', subtitle: '777777', accent: 'FFFFFF', coverBg: '0A0A0A', coverBg2: '333333' }, font: 'Arial' },
    { id: 'hist_digital', name: 'História Digital', cat: 'historia', colors: { bg: '0A0E17', title: '00D4AA', text: 'C0D0E0', subtitle: '6080A0', accent: '00D4AA', coverBg: '0A0E17', coverBg2: '00D4AA' }, font: 'Arial' },
    { id: 'hist_redes', name: 'Redes Sociais', cat: 'historia', colors: { bg: 'F0F2F5', title: '1877F2', text: '1C1E21', subtitle: '65676B', accent: '1877F2', coverBg: '1877F2', coverBg2: '0D5BBF' }, font: 'Arial' },
    { id: 'hist_jornalismo', name: 'História do Jornalismo', cat: 'historia', colors: { bg: 'FFF8EE', title: '1A1A1A', text: '333333', subtitle: '666666', accent: '8B0000', coverBg: '1A1A1A', coverBg2: '333333' }, font: 'Georgia' },
    { id: 'hist_quadrinhos', name: 'História dos Quadrinhos', cat: 'historia', colors: { bg: 'FFF59D', title: 'D32F2F', text: '1A1A1A', subtitle: '444444', accent: '1976D2', coverBg: 'D32F2F', coverBg2: '1976D2' }, font: 'Arial' },
    { id: 'hist_filosofia_oriental', name: 'Filosofia Oriental', cat: 'historia', colors: { bg: '1A140A', title: 'C9A84C', text: 'D0C8B0', subtitle: '8A7A5A', accent: '8B0000', coverBg: '0A0804', coverBg2: '3A2A14' }, font: 'Georgia' },
    { id: 'hist_direito', name: 'História do Direito', cat: 'historia', colors: { bg: 'F5F0E8', title: '1B2631', text: '2C3E50', subtitle: '5D6D7E', accent: '7B241C', coverBg: '1B2631', coverBg2: '2C3E50' }, font: 'Georgia' },
    { id: 'hist_astronomia', name: 'História da Astronomia', cat: 'historia', colors: { bg: '050510', title: '7EB8DA', text: 'C0D0E8', subtitle: '5A7A9A', accent: 'E8C547', coverBg: '050510', coverBg2: '0A1A30' }, font: 'Arial' },
    { id: 'hist_cidades_estado', name: 'Cidades-Estado', cat: 'historia', colors: { bg: 'E8E0D0', title: '5C4A32', text: '3A3020', subtitle: '7A6A50', accent: 'B8860B', coverBg: '5C4A32', coverBg2: '3A3020' }, font: 'Georgia' },

    // ==========================================
    //  CATEGORIA: EMPRESARIAL (50 temas)
    // ==========================================
    { id: 'biz_startup', name: 'Startups Modernas', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '6C5CE7', text: '2D3436', subtitle: '636E72', accent: '6C5CE7', coverBg: '6C5CE7', coverBg2: 'A29BFE' }, font: 'Arial' },
    { id: 'biz_consultoria', name: 'Consultoria Empresarial', cat: 'empresarial', colors: { bg: 'FAFAFA', title: '1A237E', text: '212121', subtitle: '616161', accent: '1A237E', coverBg: '1A237E', coverBg2: '283593' }, font: 'Arial' },
    { id: 'biz_financas', name: 'Finanças', cat: 'empresarial', colors: { bg: 'F0F4F0', title: '1B5E20', text: '212121', subtitle: '4CAF50', accent: '1B5E20', coverBg: '0D3B0D', coverBg2: '2E7D32' }, font: 'Arial' },
    { id: 'biz_marketing', name: 'Marketing Digital', cat: 'empresarial', colors: { bg: 'FFFFFF', title: 'E91E63', text: '212121', subtitle: '757575', accent: 'E91E63', coverBg: 'C2185B', coverBg2: 'E91E63' }, font: 'Arial' },
    { id: 'biz_tech', name: 'Tecnologia', cat: 'empresarial', colors: { bg: '0A0E17', title: '00BCD4', text: 'E0E8F0', subtitle: '6090B0', accent: '00BCD4', coverBg: '0A0E17', coverBg2: '00ACC1' }, font: 'Arial' },
    { id: 'biz_publicidade', name: 'Agência de Publicidade', cat: 'empresarial', colors: { bg: 'FFFFFF', title: 'FF5722', text: '212121', subtitle: '757575', accent: 'FF5722', coverBg: 'FF5722', coverBg2: 'E64A19' }, font: 'Arial' },
    { id: 'biz_portfolio', name: 'Portfolio Profissional', cat: 'empresarial', colors: { bg: '1A1A1A', title: 'FFFFFF', text: 'D0D0D0', subtitle: '888888', accent: 'FF4081', coverBg: '212121', coverBg2: 'FF4081' }, font: 'Arial' },
    { id: 'biz_coworking', name: 'Co-working', cat: 'empresarial', colors: { bg: 'FFF8E1', title: 'FF6F00', text: '212121', subtitle: '795548', accent: 'FF6F00', coverBg: 'E65100', coverBg2: 'FF8F00' }, font: 'Arial' },
    { id: 'biz_empreende', name: 'Empreendedorismo', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '0277BD', text: '212121', subtitle: '546E7A', accent: '0277BD', coverBg: '01579B', coverBg2: '0288D1' }, font: 'Arial' },
    { id: 'biz_invest', name: 'Investimentos', cat: 'empresarial', colors: { bg: '0D1117', title: '58A6FF', text: 'C9D1D9', subtitle: '8B949E', accent: '58A6FF', coverBg: '0D1117', coverBg2: '161B22' }, font: 'Arial' },
    { id: 'biz_analytics', name: 'Business Analytics', cat: 'empresarial', colors: { bg: 'F5F6FA', title: '3F51B5', text: '212121', subtitle: '7986CB', accent: '3F51B5', coverBg: '283593', coverBg2: '3F51B5' }, font: 'Arial' },
    { id: 'biz_saas', name: 'SaaS', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '5E35B1', text: '212121', subtitle: '9575CD', accent: '5E35B1', coverBg: '4527A0', coverBg2: '7C4DFF' }, font: 'Arial' },
    { id: 'biz_ti', name: 'Empresa de TI', cat: 'empresarial', colors: { bg: '0F111A', title: '82AAFF', text: 'A6ACCD', subtitle: '676E95', accent: '82AAFF', coverBg: '0F111A', coverBg2: '1A1C2C' }, font: 'Arial' },
    { id: 'biz_engenharia', name: 'Empresa de Engenharia', cat: 'empresarial', colors: { bg: 'F5F5F5', title: '37474F', text: '263238', subtitle: '78909C', accent: 'FF6F00', coverBg: '263238', coverBg2: '455A64' }, font: 'Arial' },
    { id: 'biz_arquitetura', name: 'Empresa de Arquitetura', cat: 'empresarial', colors: { bg: 'FAFAFA', title: '212121', text: '333333', subtitle: '9E9E9E', accent: 'FF5252', coverBg: '212121', coverBg2: '424242' }, font: 'Arial' },
    { id: 'biz_logistica', name: 'Empresa de Logística', cat: 'empresarial', colors: { bg: 'F0F4F8', title: '0D47A1', text: '1A237E', subtitle: '42A5F5', accent: 'FF8F00', coverBg: '0D47A1', coverBg2: '1976D2' }, font: 'Arial' },
    { id: 'biz_energia', name: 'Empresa de Energia', cat: 'empresarial', colors: { bg: 'E8F5E9', title: '2E7D32', text: '1B5E20', subtitle: '66BB6A', accent: 'FDD835', coverBg: '1B5E20', coverBg2: '388E3C' }, font: 'Arial' },
    { id: 'biz_estrategia', name: 'Consultoria Estratégica', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '263238', text: '37474F', subtitle: '90A4AE', accent: '0097A7', coverBg: '263238', coverBg2: '37474F' }, font: 'Arial' },
    { id: 'biz_edu_corp', name: 'Educação Corporativa', cat: 'empresarial', colors: { bg: 'FFF3E0', title: 'E65100', text: '212121', subtitle: 'FF8F00', accent: 'E65100', coverBg: 'BF360C', coverBg2: 'E65100' }, font: 'Arial' },
    { id: 'biz_rh', name: 'Recursos Humanos', cat: 'empresarial', colors: { bg: 'F3E5F5', title: '6A1B9A', text: '4A148C', subtitle: 'AB47BC', accent: '6A1B9A', coverBg: '4A148C', coverBg2: '8E24AA' }, font: 'Arial' },
    { id: 'biz_inovacao', name: 'Empresa de Inovação', cat: 'empresarial', colors: { bg: '0A0A14', title: '00E5FF', text: 'E0F0FF', subtitle: '60A0C0', accent: 'FF1744', coverBg: '0A0A14', coverBg2: '00B8D4' }, font: 'Arial' },
    { id: 'biz_software', name: 'Empresa de Software', cat: 'empresarial', colors: { bg: '1E1E2E', title: '89B4FA', text: 'CDD6F4', subtitle: '7F849C', accent: '89B4FA', coverBg: '11111B', coverBg2: '1E1E2E' }, font: 'Arial' },
    { id: 'biz_hardware', name: 'Empresa de Hardware', cat: 'empresarial', colors: { bg: 'F5F5F5', title: '424242', text: '212121', subtitle: '9E9E9E', accent: '00C853', coverBg: '303030', coverBg2: '424242' }, font: 'Arial' },
    { id: 'biz_telecom', name: 'Empresa de Telecom', cat: 'empresarial', colors: { bg: 'E3F2FD', title: '0277BD', text: '01579B', subtitle: '4FC3F7', accent: '0277BD', coverBg: '01579B', coverBg2: '0288D1' }, font: 'Arial' },
    { id: 'biz_saude', name: 'Empresa de Saúde', cat: 'empresarial', colors: { bg: 'E8F5E9', title: '00695C', text: '004D40', subtitle: '26A69A', accent: '00897B', coverBg: '004D40', coverBg2: '00897B' }, font: 'Arial' },
    { id: 'biz_biotech', name: 'Empresa de Biotecnologia', cat: 'empresarial', colors: { bg: 'E0F2F1', title: '00695C', text: '004D40', subtitle: '4DB6AC', accent: '00BFA5', coverBg: '004D40', coverBg2: '00897B' }, font: 'Arial' },
    { id: 'biz_mkt2', name: 'Empresa de Marketing', cat: 'empresarial', colors: { bg: 'FCE4EC', title: 'C2185B', text: '880E4F', subtitle: 'F06292', accent: 'C2185B', coverBg: '880E4F', coverBg2: 'D81B60' }, font: 'Arial' },
    { id: 'biz_vendas', name: 'Empresa de Vendas', cat: 'empresarial', colors: { bg: 'FFF3E0', title: 'E65100', text: 'BF360C', subtitle: 'FF9800', accent: 'E65100', coverBg: 'BF360C', coverBg2: 'EF6C00' }, font: 'Arial' },
    { id: 'biz_ecommerce', name: 'E-commerce', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '7B1FA2', text: '212121', subtitle: '9C27B0', accent: 'FF6D00', coverBg: '6A1B9A', coverBg2: 'AB47BC' }, font: 'Arial' },
    { id: 'biz_sustentavel', name: 'Sustentabilidade', cat: 'empresarial', colors: { bg: 'E8F5E9', title: '2E7D32', text: '1B5E20', subtitle: '4CAF50', accent: '8BC34A', coverBg: '1B5E20', coverBg2: '43A047' }, font: 'Arial' },
    { id: 'biz_transporte', name: 'Empresa de Transporte', cat: 'empresarial', colors: { bg: 'ECEFF1', title: '37474F', text: '263238', subtitle: '78909C', accent: 'FF6D00', coverBg: '37474F', coverBg2: '546E7A' }, font: 'Arial' },
    { id: 'biz_alimentacao', name: 'Alimentação', cat: 'empresarial', colors: { bg: 'FFF8E1', title: 'E65100', text: '3E2723', subtitle: 'A1887F', accent: 'FF6D00', coverBg: 'BF360C', coverBg2: 'E65100' }, font: 'Arial' },
    { id: 'biz_turismo', name: 'Empresa de Turismo', cat: 'empresarial', colors: { bg: 'E1F5FE', title: '01579B', text: '0D47A1', subtitle: '039BE5', accent: '00B0FF', coverBg: '01579B', coverBg2: '0288D1' }, font: 'Arial' },
    { id: 'biz_entreter', name: 'Entretenimento', cat: 'empresarial', colors: { bg: '12002E', title: 'EA80FC', text: 'E0D0F0', subtitle: 'B388FF', accent: 'EA80FC', coverBg: '12002E', coverBg2: '6200EA' }, font: 'Arial' },
    { id: 'biz_design', name: 'Empresa de Design', cat: 'empresarial', colors: { bg: '1A1A2E', title: 'E94560', text: 'EAEAEA', subtitle: 'A0A0B0', accent: 'E94560', coverBg: '16213E', coverBg2: 'E94560' }, font: 'Arial' },
    { id: 'biz_foto', name: 'Empresa de Fotografia', cat: 'empresarial', colors: { bg: '1A1A1A', title: 'FAFAFA', text: 'D0D0D0', subtitle: '8A8A8A', accent: 'FFD700', coverBg: '0A0A0A', coverBg2: '2A2A2A' }, font: 'Arial' },
    { id: 'biz_juridico', name: 'Consultoria Jurídica', cat: 'empresarial', colors: { bg: 'F5F0E5', title: '1B2631', text: '2C3E50', subtitle: '5D6D7E', accent: '7B241C', coverBg: '1B2631', coverBg2: '2C3E50' }, font: 'Georgia' },
    { id: 'biz_startup2', name: 'Startup de Tecnologia', cat: 'empresarial', colors: { bg: '0D0D1A', title: '00F0FF', text: 'D0E0F0', subtitle: '6090B0', accent: 'FF3366', coverBg: '0D0D1A', coverBg2: '00F0FF' }, font: 'Arial' },
    { id: 'biz_ai', name: 'Inteligência Artificial', cat: 'empresarial', colors: { bg: '0A0E17', title: '00E676', text: 'B0C4DE', subtitle: '5C7A9A', accent: '651FFF', coverBg: '0A0E17', coverBg2: '00E676' }, font: 'Arial' },
    { id: 'biz_cloud', name: 'Cloud Computing', cat: 'empresarial', colors: { bg: 'E3F2FD', title: '1565C0', text: '0D47A1', subtitle: '42A5F5', accent: '1565C0', coverBg: '0D47A1', coverBg2: '1976D2' }, font: 'Arial' },
    { id: 'biz_elearning', name: 'E-learning', cat: 'empresarial', colors: { bg: 'FFF9C4', title: 'F57F17', text: '212121', subtitle: 'F9A825', accent: 'F57F17', coverBg: 'E65100', coverBg2: 'FF8F00' }, font: 'Arial' },
    { id: 'biz_realestate', name: 'Real Estate', cat: 'empresarial', colors: { bg: 'F5F5F5', title: '263238', text: '37474F', subtitle: '546E7A', accent: 'D4AF37', coverBg: '263238', coverBg2: '37474F' }, font: 'Arial' },
    { id: 'biz_carreiras', name: 'Empresa de Carreiras', cat: 'empresarial', colors: { bg: 'E8EAF6', title: '283593', text: '1A237E', subtitle: '5C6BC0', accent: 'FF6E40', coverBg: '1A237E', coverBg2: '3949AB' }, font: 'Arial' },
    { id: 'biz_eventos', name: 'Empresa de Eventos', cat: 'empresarial', colors: { bg: 'FCE4EC', title: 'AD1457', text: '880E4F', subtitle: 'EC407A', accent: 'FFD54F', coverBg: 'AD1457', coverBg2: 'C2185B' }, font: 'Arial' },
    { id: 'biz_moda_corp', name: 'Moda Corporativa', cat: 'empresarial', colors: { bg: 'FAFAFA', title: '212121', text: '424242', subtitle: '9E9E9E', accent: 'FF4081', coverBg: '212121', coverBg2: '424242' }, font: 'Arial' },
    { id: 'biz_fitness', name: 'Empresa de Fitness', cat: 'empresarial', colors: { bg: '1A1A1A', title: '76FF03', text: 'E0E0E0', subtitle: '9E9E9E', accent: '76FF03', coverBg: '212121', coverBg2: '76FF03' }, font: 'Arial' },
    { id: 'biz_consultoria_fin', name: 'Consultoria Financeira', cat: 'empresarial', colors: { bg: 'F5F5F5', title: '004D40', text: '212121', subtitle: '00695C', accent: '00897B', coverBg: '004D40', coverBg2: '00695C' }, font: 'Arial' },
    { id: 'biz_startup_tech', name: 'Startup Tech', cat: 'empresarial', colors: { bg: '0D0D1A', title: '7C4DFF', text: 'D0D0F0', subtitle: '8080C0', accent: 'FF4081', coverBg: '1A1A3E', coverBg2: '7C4DFF' }, font: 'Arial' },
    { id: 'biz_edu_prof', name: 'Educação Profissional', cat: 'empresarial', colors: { bg: 'E8F5E9', title: '1B5E20', text: '212121', subtitle: '43A047', accent: 'FFB300', coverBg: '1B5E20', coverBg2: '2E7D32' }, font: 'Arial' },
    { id: 'biz_branding', name: 'Branding', cat: 'empresarial', colors: { bg: 'FFFFFF', title: '212121', text: '424242', subtitle: 'BDBDBD', accent: 'FF1744', coverBg: '212121', coverBg2: '616161' }, font: 'Arial' },

    // ==========================================
    //  CATEGORIA: LIMPO / MINIMALISTA (50 temas)
    // ==========================================
    { id: 'min_branco', name: 'Minimalista Branco', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '222222', text: '444444', subtitle: '999999', accent: '222222', coverBg: '222222', coverBg2: '555555' }, font: 'Arial' },
    { id: 'min_preto', name: 'Minimalista Preto', cat: 'minimalista', colors: { bg: '111111', title: 'FFFFFF', text: 'CCCCCC', subtitle: '666666', accent: 'FFFFFF', coverBg: '1A1A1A', coverBg2: '333333' }, font: 'Arial' },
    { id: 'min_mono', name: 'Monocromático', cat: 'minimalista', colors: { bg: 'F5F5F5', title: '333333', text: '555555', subtitle: '999999', accent: '333333', coverBg: '333333', coverBg2: '666666' }, font: 'Arial' },
    { id: 'min_grid', name: 'Grid Simples', cat: 'minimalista', colors: { bg: 'FAFAFA', title: '1A1A1A', text: '333333', subtitle: 'AAAAAA', accent: '0066CC', coverBg: '1A1A1A', coverBg2: '0066CC' }, font: 'Arial' },
    { id: 'min_onepage', name: 'One Page', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '2C3E50', text: '34495E', subtitle: '95A5A6', accent: 'E74C3C', coverBg: '2C3E50', coverBg2: '34495E' }, font: 'Arial' },
    { id: 'min_typo', name: 'Tipografia Forte', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '000000', text: '333333', subtitle: '888888', accent: '000000', coverBg: '000000', coverBg2: '222222' }, font: 'Georgia' },
    { id: 'min_espaco', name: 'Layout com Espaço', cat: 'minimalista', colors: { bg: 'FEFEFE', title: '2D2D2D', text: '4A4A4A', subtitle: 'B0B0B0', accent: '4A90D9', coverBg: '2D2D2D', coverBg2: '4A90D9' }, font: 'Arial' },
    { id: 'min_icones', name: 'Layout com Ícones', cat: 'minimalista', colors: { bg: 'F8F9FA', title: '343A40', text: '495057', subtitle: 'ADB5BD', accent: '007BFF', coverBg: '343A40', coverBg2: '007BFF' }, font: 'Arial' },
    { id: 'min_foto', name: 'Layout Fotográfico', cat: 'minimalista', colors: { bg: '1A1A1A', title: 'FFFFFF', text: 'D0D0D0', subtitle: '808080', accent: 'FF6B6B', coverBg: '0A0A0A', coverBg2: '2A2A2A' }, font: 'Arial' },
    { id: 'min_blog', name: 'Layout de Blog', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '1A1A2E', text: '333333', subtitle: '888888', accent: '3498DB', coverBg: '1A1A2E', coverBg2: '3498DB' }, font: 'Georgia' },
    { id: 'min_portfolio', name: 'Portfolio', cat: 'minimalista', colors: { bg: 'F0F0F0', title: '1A1A1A', text: '333333', subtitle: '888888', accent: 'E74C3C', coverBg: '1A1A1A', coverBg2: 'E74C3C' }, font: 'Arial' },
    { id: 'min_produto', name: 'Layout de Produto', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '1A1A1A', text: '3D3D3D', subtitle: '9E9E9E', accent: 'FF5722', coverBg: '1A1A1A', coverBg2: 'FF5722' }, font: 'Arial' },
    { id: 'min_servicos', name: 'Layout de Serviços', cat: 'minimalista', colors: { bg: 'F5F7FA', title: '2C3E50', text: '34495E', subtitle: '7F8C8D', accent: '2980B9', coverBg: '2C3E50', coverBg2: '2980B9' }, font: 'Arial' },
    { id: 'min_agencia', name: 'Layout de Agência', cat: 'minimalista', colors: { bg: '0F0F0F', title: 'FFFFFF', text: 'CCCCCC', subtitle: '777777', accent: 'FF3E6C', coverBg: '1A1A1A', coverBg2: 'FF3E6C' }, font: 'Arial' },
    { id: 'min_corp', name: 'Corporativo Clean', cat: 'minimalista', colors: { bg: 'FAFAFA', title: '1F2937', text: '374151', subtitle: '9CA3AF', accent: '2563EB', coverBg: '1F2937', coverBg2: '2563EB' }, font: 'Arial' },
    { id: 'min_ecommerce', name: 'E-commerce Minimalista', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '111827', text: '374151', subtitle: '9CA3AF', accent: '7C3AED', coverBg: '111827', coverBg2: '7C3AED' }, font: 'Arial' },
    { id: 'min_landing', name: 'Landing Page', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '1E293B', text: '334155', subtitle: '94A3B8', accent: 'F59E0B', coverBg: '1E293B', coverBg2: 'F59E0B' }, font: 'Arial' },
    { id: 'min_eventos', name: 'Layout de Eventos', cat: 'minimalista', colors: { bg: 'FFFBEB', title: '78350F', text: '451A03', subtitle: 'A16207', accent: 'D97706', coverBg: '78350F', coverBg2: 'B45309' }, font: 'Arial' },
    { id: 'min_app', name: 'Layout de App', cat: 'minimalista', colors: { bg: 'F0F2F5', title: '1A1A2E', text: '3D3D5C', subtitle: '8888AA', accent: '6366F1', coverBg: '1A1A2E', coverBg2: '6366F1' }, font: 'Arial' },
    { id: 'min_dashboard', name: 'Dashboard', cat: 'minimalista', colors: { bg: '0F172A', title: 'F8FAFC', text: 'CBD5E1', subtitle: '64748B', accent: '38BDF8', coverBg: '0F172A', coverBg2: '1E293B' }, font: 'Arial' },
    { id: 'min_consultoria', name: 'Consultoria Clean', cat: 'minimalista', colors: { bg: 'FAFAF9', title: '1C1917', text: '44403C', subtitle: 'A8A29E', accent: 'DC2626', coverBg: '1C1917', coverBg2: 'DC2626' }, font: 'Georgia' },
    { id: 'min_restaurante', name: 'Restaurante Clean', cat: 'minimalista', colors: { bg: 'FFFBEB', title: '451A03', text: '78350F', subtitle: 'D4A06A', accent: 'B45309', coverBg: '451A03', coverBg2: '92400E' }, font: 'Georgia' },
    { id: 'min_hotel', name: 'Hotel', cat: 'minimalista', colors: { bg: 'F5F5F0', title: '1A1A1A', text: '333333', subtitle: '999999', accent: 'B8860B', coverBg: '1A1A1A', coverBg2: 'B8860B' }, font: 'Georgia' },
    { id: 'min_foto_full', name: 'Fotografia Fullscreen', cat: 'minimalista', colors: { bg: '0A0A0A', title: 'FAFAFA', text: 'C8C8C8', subtitle: '707070', accent: 'E0E0E0', coverBg: '0A0A0A', coverBg2: '1A1A1A' }, font: 'Arial' },
    { id: 'min_design', name: 'Design Criativo', cat: 'minimalista', colors: { bg: 'FDF4FF', title: '701A75', text: '86198F', subtitle: 'C084FC', accent: 'A21CAF', coverBg: '701A75', coverBg2: '86198F' }, font: 'Arial' },
    { id: 'min_pessoal', name: 'Portfolio Pessoal', cat: 'minimalista', colors: { bg: 'FFFBEB', title: '1C1917', text: '44403C', subtitle: 'A8A29E', accent: 'EA580C', coverBg: '1C1917', coverBg2: 'EA580C' }, font: 'Arial' },
    { id: 'min_startup', name: 'Startup Clean', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '0F172A', text: '334155', subtitle: '94A3B8', accent: '8B5CF6', coverBg: '0F172A', coverBg2: '8B5CF6' }, font: 'Arial' },
    { id: 'min_edu', name: 'Educação', cat: 'minimalista', colors: { bg: 'EFF6FF', title: '1E3A8A', text: '1E40AF', subtitle: '60A5FA', accent: '2563EB', coverBg: '1E3A8A', coverBg2: '3B82F6' }, font: 'Arial' },
    { id: 'min_bio', name: 'Biografia', cat: 'minimalista', colors: { bg: 'FAF5EF', title: '3D2B1A', text: '5C4A3A', subtitle: 'A09080', accent: '8B6914', coverBg: '3D2B1A', coverBg2: '5C4A3A' }, font: 'Georgia' },
    { id: 'min_negocios', name: 'Negócios', cat: 'minimalista', colors: { bg: 'F8FAFC', title: '0F172A', text: '1E293B', subtitle: '94A3B8', accent: '0EA5E9', coverBg: '0F172A', coverBg2: '0EA5E9' }, font: 'Arial' },
    { id: 'min_blog_corp', name: 'Blog Corporativo', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '18181B', text: '3F3F46', subtitle: 'A1A1AA', accent: '2563EB', coverBg: '18181B', coverBg2: '2563EB' }, font: 'Georgia' },
    { id: 'min_rest_mod', name: 'Restaurante Moderno', cat: 'minimalista', colors: { bg: '1A1A14', title: 'F5DEB3', text: 'D0C8B0', subtitle: '8A8070', accent: '8B0000', coverBg: '0A0A08', coverBg2: '3A3020' }, font: 'Georgia' },
    { id: 'min_app_corp', name: 'App Corporativo', cat: 'minimalista', colors: { bg: 'F1F5F9', title: '0F172A', text: '334155', subtitle: '64748B', accent: '4F46E5', coverBg: '0F172A', coverBg2: '4F46E5' }, font: 'Arial' },
    { id: 'min_fin_dash', name: 'Dashboard Financeiro', cat: 'minimalista', colors: { bg: '0C1222', title: '4ADE80', text: 'A7F3D0', subtitle: '34D399', accent: '4ADE80', coverBg: '0C1222', coverBg2: '064E3B' }, font: 'Arial' },
    { id: 'min_eventos2', name: 'Eventos Limpo', cat: 'minimalista', colors: { bg: 'FFF1F2', title: '9F1239', text: '881337', subtitle: 'FB7185', accent: 'E11D48', coverBg: '881337', coverBg2: 'BE123C' }, font: 'Arial' },
    { id: 'min_digital', name: 'Produtos Digitais', cat: 'minimalista', colors: { bg: 'F5F3FF', title: '5B21B6', text: '6D28D9', subtitle: 'A78BFA', accent: '7C3AED', coverBg: '5B21B6', coverBg2: '7C3AED' }, font: 'Arial' },
    { id: 'min_tech2', name: 'Tech Clean', cat: 'minimalista', colors: { bg: 'ECFDF5', title: '064E3B', text: '065F46', subtitle: '34D399', accent: '059669', coverBg: '064E3B', coverBg2: '059669' }, font: 'Arial' },
    { id: 'min_inovacao', name: 'Inovação Clean', cat: 'minimalista', colors: { bg: '0A0A14', title: '818CF8', text: 'C7D2FE', subtitle: '6366F1', accent: '818CF8', coverBg: '0A0A14', coverBg2: '312E81' }, font: 'Arial' },
    { id: 'min_criativo', name: 'Agência Criativa', cat: 'minimalista', colors: { bg: 'FDF2F8', title: '9D174D', text: '831843', subtitle: 'F472B6', accent: 'DB2777', coverBg: '831843', coverBg2: 'DB2777' }, font: 'Arial' },
    { id: 'min_port_pro', name: 'Portfolio Pro', cat: 'minimalista', colors: { bg: '1A1A1A', title: 'F59E0B', text: 'D4D4D4', subtitle: '737373', accent: 'F59E0B', coverBg: '0A0A0A', coverBg2: 'F59E0B' }, font: 'Arial' },
    { id: 'min_hist_blog', name: 'Blog de História', cat: 'minimalista', colors: { bg: 'F5F0E5', title: '5C3A1E', text: '3D2B1A', subtitle: 'A09070', accent: '8B4513', coverBg: '5C3A1E', coverBg2: '8B4513' }, font: 'Georgia' },
    { id: 'min_edu_emp', name: 'Educação Empresarial', cat: 'minimalista', colors: { bg: 'FEF3C7', title: '78350F', text: '92400E', subtitle: 'D97706', accent: 'B45309', coverBg: '78350F', coverBg2: 'B45309' }, font: 'Arial' },
    { id: 'min_tech_emp', name: 'Tecnologia Clean', cat: 'minimalista', colors: { bg: 'F0FDFA', title: '134E4A', text: '115E59', subtitle: '2DD4BF', accent: '14B8A6', coverBg: '134E4A', coverBg2: '14B8A6' }, font: 'Arial' },
    { id: 'min_moda_ecom', name: 'Moda Minimalista', cat: 'minimalista', colors: { bg: 'FAFAFA', title: '171717', text: '404040', subtitle: 'A3A3A3', accent: 'DC2626', coverBg: '171717', coverBg2: 'DC2626' }, font: 'Arial' },
    { id: 'min_hotel2', name: 'Hotel Boutique', cat: 'minimalista', colors: { bg: 'F0EDE5', title: '2C1810', text: '4A3828', subtitle: '8A7A60', accent: 'C9A84C', coverBg: '2C1810', coverBg2: 'C9A84C' }, font: 'Georgia' },
    { id: 'min_juridico', name: 'Jurídico Clean', cat: 'minimalista', colors: { bg: 'F5F5F0', title: '1C1917', text: '44403C', subtitle: '78716C', accent: '7C2D12', coverBg: '1C1917', coverBg2: '7C2D12' }, font: 'Georgia' },
    { id: 'min_saas', name: 'SaaS Clean', cat: 'minimalista', colors: { bg: 'FFFFFF', title: '0F172A', text: '1E293B', subtitle: '94A3B8', accent: '6366F1', coverBg: '0F172A', coverBg2: '6366F1' }, font: 'Arial' },
    { id: 'min_fin_clean', name: 'Financeiro Clean', cat: 'minimalista', colors: { bg: 'F0FDF4', title: '14532D', text: '166534', subtitle: '4ADE80', accent: '16A34A', coverBg: '14532D', coverBg2: '16A34A' }, font: 'Arial' },
    { id: 'min_onepage_corp', name: 'One Page Corporativo', cat: 'minimalista', colors: { bg: 'F8FAFC', title: '020617', text: '1E293B', subtitle: '64748B', accent: '3B82F6', coverBg: '020617', coverBg2: '3B82F6' }, font: 'Arial' },
  ];

  const CATEGORIES = [
    { id: 'all', name: 'Todos' },
    { id: 'historia', name: 'História' },
    { id: 'empresarial', name: 'Empresarial' },
    { id: 'minimalista', name: 'Limpo / Minimalista' }
  ];

  // ========== SITE THEME (UI) ==========
  // The site always uses the dark urban aesthetic.
  // Slide themes only affect slide preview + PPTX export.

  let currentPresetId = 'hist_antiga';
  let customColors = { accent: null, accentSecondary: null };
  let globalFontSize = 100; // percentage (50–150)

  function getPreset(id) {
    return PRESETS.find(p => p.id === id) || PRESETS[0];
  }

  function apply(presetId) {
    const p = getPreset(presetId);
    if (p) {
      currentPresetId = presetId;
      customColors.accent = null;
      customColors.accentSecondary = null;
    }
  }

  function getCurrent() { return currentPresetId; }
  function getCurrentPreset() { return getPreset(currentPresetId); }
  function getAll() { return PRESETS; }
  function getCategories() { return CATEGORIES; }

  function getByCategory(cat) {
    if (cat === 'all') return PRESETS;
    return PRESETS.filter(p => p.cat === cat);
  }

  function setCustomColor(type, color) {
    customColors[type] = color;
  }

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

  function getSlideFont() {
    const preset = getCurrentPreset();
    return preset.font || 'Arial';
  }

  function getSlideThemeStyle() {
    const preset = getCurrentPreset();
    return {
      font: preset.font || 'Arial',
      layout: preset.layout || 'left',
      decor: preset.decor || 'none'
    };
  }

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
    // Legacy support
    if (state.theme && !state.presetId) currentPresetId = 'hist_antiga';
  }

  return {
    apply, getCurrent, getCurrentPreset, getAll, getCategories,
    getByCategory, setCustomColor, getSlideColors, getSlideFont, getSlideThemeStyle,
    getCustomColors, setGlobalFontSize, getGlobalFontSize,
    getState, loadState, getPreset
  };
})();
