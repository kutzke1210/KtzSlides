/* ============================================
   IMAGES — Image upload & handling
   ============================================ */
const Images = (() => {
  const MAX_WIDTH = 800;
  const MAX_SIZE_MB = 5;

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        reject(new Error(`Imagem muito grande (máx ${MAX_SIZE_MB}MB)`));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Erro ao carregar imagem'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }

  function handleUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      return Promise.reject(new Error('Arquivo não é uma imagem válida'));
    }
    return compressImage(file);
  }

  // Extract base64 data from data URL for PptxGenJS
  function dataUrlToBase64(dataUrl) {
    if (!dataUrl) return null;
    return dataUrl.split(',')[1] || null;
  }

  function getMimeType(dataUrl) {
    if (!dataUrl) return 'image/jpeg';
    const match = dataUrl.match(/data:([^;]+);/);
    return match ? match[1] : 'image/jpeg';
  }

  return { handleUpload, dataUrlToBase64, getMimeType };
})();
