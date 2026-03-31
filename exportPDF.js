// exportPDF.js — SOLUÇÃO SIMPLES E RÁPIDA
const ExportPDF = (() => {
  let currentPdfBlob = null;
  
  // Aguarda renderização real do browser
  async function waitForRender() {
    return new Promise(resolve => {
      void document.body.offsetHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });
    });
  }
  
  // Captura HTML com retry - FORÇA reflows antes
  async function captureSlide(previewElement) {
    const orig = {
      display: previewElement.style.display,
      visibility: previewElement.style.visibility,
      opacity: previewElement.style.opacity
    };
    
    previewElement.style.display = 'block';
    previewElement.style.visibility = 'visible';
    previewElement.style.opacity = '1';
    
    try {
      // SUPER AGRESSIVO: 50 reflows
      for (let i = 0; i < 50; i++) {
        void document.body.offsetHeight;
        void previewElement.offsetHeight;
        void previewElement.scrollHeight;
      }
      
      // Quad RAF
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(resolve);
            });
          });
        });
      });
      
      // Pausa de 200ms antes de capturar
      await new Promise(r => setTimeout(r, 200));
      
      let canvas = null;
      let attempts = 0;
      
      while (!canvas && attempts < 3) {
        try {
          console.log(`  Tentativa ${attempts + 1}/3 de captura html2canvas...`);
          
          canvas = await html2canvas(previewElement, {
            scale: 3.0,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 10000,
            removeContainer: false,
            windowWidth: previewElement.scrollWidth || 1920,
            windowHeight: previewElement.scrollHeight || 1080
          });
          
          console.log(`  ✓ Canvas capturado: ${canvas.width}x${canvas.height}px`);
        } catch (err) {
          console.warn(`  Tentativa ${attempts + 1} falhou: ${err.message}`);
          attempts++;
          if (attempts < 3) await new Promise(r => setTimeout(r, 1000));
        }
      }
      
      if (!canvas) throw new Error('Captura falhou após 3 tentativas');
      return canvas;
    } finally {
      previewElement.style.display = orig.display;
      previewElement.style.visibility = orig.visibility;
      previewElement.style.opacity = orig.opacity;
    }
  }
  
  async function generatePdfToMemory() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [297, 167]
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);
    const totalSlides = Slides.getTotal();
    const originalIndex = Slides.getSelectedIndex();
    
    return { pdf, pageWidth, pageHeight, margin, contentWidth, contentHeight, totalSlides, originalIndex };
  }
  
  async function generate() {
    const toast = window.toast || ((msg, type) => console.log(msg));
    try {
      // Capturar estado ANTES de qualquer mudança
      const originalIndex = Slides.getSelectedIndex();
      const allSlides = Slides.getSlides();
      const coverData = Slides.getCover();
      
      // Total = Capa + todos os slides
      const totalSlides = 1 + allSlides.length;
      
      if (totalSlides < 2) {
        toast('Crie pelo menos um slide', 'error');
        return;
      }
      
      toast(`Gerando PDF com ${totalSlides} pginas...`, 'info');
      console.log(`\nPDF: Capa + ${allSlides.length} slides = ${totalSlides} pginas\n`);
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 167]
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 5;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);
      
      for (let i = 0; i < totalSlides; i++) {
        if (i > 0) pdf.addPage();
        
        // Índice: -1 (capa), 0, 1, 2, ...
        const slideIndex = i - 1;
        const oldContent = document.getElementById('slidePreviewInner')?.innerHTML || '';
        
        console.log(`\n[${'='.repeat(50)}]`);
        console.log(`PÁGINA ${i + 1}/${totalSlides}`);
        console.log(`[${'='.repeat(50)}]`);
        console.log(`slideIndex = ${i} - 1 = ${slideIndex}`);
        
        // 1. MUDAR SLIDE
        console.log(`1. Chamando Slides.setSelectedIndex(${slideIndex})`);
        Slides.setSelectedIndex(slideIndex);
        
        // VERIFICAR IMEDIATAMENTE se foi setado
        const indexAfterSet = Slides.getSelectedIndex();
        console.log(`   ✓ Confirmado: Slides.getSelectedIndex() = ${indexAfterSet}`);
        if (indexAfterSet !== slideIndex) {
          console.warn(`   ⚠️ ERRO! setSelectedIndex não funcionou!`);
          throw new Error(`setSelectedIndex falhou! Esperado ${slideIndex}, obtido ${indexAfterSet}`);
        }
        
        // 2. RENDERIZAR
        console.log(`2. Chamando App.renderPreview()`);
        if (App && typeof App.renderPreview === 'function') {
          App.renderPreview();
          console.log(`   ✓ App.renderPreview() executado`);
        } else if (typeof renderPreview === 'function') {
          renderPreview();
          console.log(`   ✓ renderPreview() global executado`);
        } else {
          throw new Error('renderPreview não disponível!');
        }
        
        // Verificação imediata do índice APÓS renderizar
        const indexAfterRender = Slides.getSelectedIndex();
        console.log(`3. Após renderizar, Slides.getSelectedIndex() = ${indexAfterRender}`);
        
        // Verificação imediata - o DOM foi atualizado?
        await new Promise(r => setTimeout(r, 100));
        const contentAfterRender = document.getElementById('slidePreviewInner')?.innerHTML || '';
        console.log(`4. HTML após renderPreview (primeiros 100 chars): ${contentAfterRender.substring(0, 100)}`);
        console.log(`5. É cover-title? ${contentAfterRender.includes('cover-title') ? 'SIM' : 'NÃO'}`);
        console.log(`6. É slide-title? ${contentAfterRender.includes('slide-title') ? 'SIM' : 'NÃO'}`);
        
        // Forçar reflow IMEDIATO
        const previewElement = document.getElementById('slidePreviewInner');
        if (!previewElement) throw new Error(`Preview não encontrado na página ${i + 1}`);
        
        for (let j = 0; j < 30; j++) {
          void previewElement.offsetHeight;
          void previewElement.scrollHeight;
        }
        
        // Aguardar browser processar
        await new Promise(r => setTimeout(r, 1500));
        await waitForRender();
        
        // VERIFICAR se conteúdo mudou
        const newContent = previewElement.innerHTML;
        if (newContent === oldContent && i > 0) {
          console.warn(`⚠️ AVISO: Conteúdo IGUAL ao anterior! Pode ser cache do html2canvas!`);
        } else if (newContent.length === 0) {
          throw new Error(`Conteúdo VAZIO!`);
        } else {
          console.log(`✓ Conteúdo verificado`);
        }
        
        // CAPTURAR
        console.log(`7. Capturando canvas...`);
        const canvas = await captureSlide(previewElement);
        console.log(`✓ Canvas capturado: ${canvas.width}x${canvas.height}px`);
        
        // Adicionar ao PDF
        const imgData = canvas.toDataURL('image/png');
        const ratio = Math.min(contentWidth / canvas.width, contentHeight / canvas.height);
        const imgWidth = canvas.width * ratio;
        const imgHeight = canvas.height * ratio;
        const x = margin + (contentWidth - imgWidth) / 2;
        const y = margin + (contentHeight - imgHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        console.log(`✓ Página adicionada ao PDF\n`);
        
        await new Promise(r => setTimeout(r, 500));
      }
      
      // Restaurar slide originalmente selecionado
      Slides.setSelectedIndex(originalIndex);
      if (typeof renderPreview === 'function') renderPreview();
      else if (App?.renderPreview) App.renderPreview();
      
      const fileName = (coverData?.title || 'Apresentacao')
        .trim()
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ\s]/g, '_')
        .replace(/\s+/g, '_') + '.pdf';
      
      pdf.save(fileName);
      
      console.log(`\nPDF COMPLETO: ${fileName} (${totalSlides} pginas)\n`);
      toast(`PDF criado: ${totalSlides} pginas!`, 'success');
      
      return fileName;
    } catch (err) {
      console.error('Erro:', err.message);
      toast(`Erro: ${err.message}`, 'error');
      throw err;
    }
  }
  
  async function generateAndPresent() {
    const toast = window.toast || ((msg, type) => console.log(msg));
    try {
      toast('� Preparando apresentação...', 'info');
      
      const fileName = await generate();
      
      console.log('🎉 Iniciando apresentação...\n');
      await new Promise(r => setTimeout(r, 500));
      
      Slides.setSelectedIndex(0);
      if (typeof renderPreview === 'function') renderPreview();
      else if (App?.renderPreview) App.renderPreview();
      
      if (window.Presentation?.start) {
        window.Presentation.start();
      }
      
      return fileName;
    } catch (err) {
      console.error('❌ Erro:', err.message);
      toast(`❌ Erro: ${err.message}`, 'error');
      throw err;
    }
  }
  
  function openPdfPresentation() {
    const toast = window.toast || ((msg, type) => console.log(msg));
    if (!currentPdfBlob) {
      toast('❌ Nenhum PDF em memória. Gere um PDF primeiro.', 'error');
      return;
    }
    
    const pdfUrl = URL.createObjectURL(currentPdfBlob);
    const newWindow = window.open(pdfUrl, 'PDFPresentation', 'fullscreen=yes');
    
    if (!newWindow) {
      toast('⚠️ Não foi possível abrir PDF em fullscreen. Verifique as permissões do navegador.', 'warning');
      console.log('URL do PDF:', pdfUrl);
      return;
    }
    
    toast('📄 PDF aberto em nova janela/aba', 'info');
  }
  
  return { 
    generate,              // 📄 Exportar PDF normal
    generateAndPresent,    // 🎬 Gerar PDF + apresentação automática em fullscreen
    openPdfPresentation    // 📊 Abrir PDF em nova janela/aba em fullscreen
  };
})();
window.ExportPDF = ExportPDF;
