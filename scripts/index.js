const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('birth-file');
const fileList = document.getElementById('file-list');

// Verificar se os elementos existem antes de adicionar event listeners
if (!dropzone || !fileInput || !fileList) {
  console.error('Um ou mais elementos necessários não foram encontrados no DOM');
} else {
  // Evitar o comportamento padrão para permitir o "drop"
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // Adicionar destaque quando um arquivo é arrastado sobre a área
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, handleHighlight, false);
  });

  // Remover destaque quando o arquivo sai da área ou é solto
  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, handleUnhighlight, false);
  });

  // Função para adicionar classe de destaque
  function handleHighlight(e) {
    dropzone.classList.add('highlight');
  }

  // Função para remover classe de destaque
  function handleUnhighlight(e) {
    dropzone.classList.remove('highlight');
  }

  // Manipular o evento de soltar arquivos
  dropzone.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    if (dt.files && dt.files.length > 0) {
      handleFiles(dt.files);
    }
  }

  // Processar os arquivos
  function handleFiles(files) {
    const filesArray = Array.from(files);
    filesArray.forEach(uploadFile);
  }

  // Upload e processamento individual de arquivos
  function uploadFile(file) {
    console.log('Arquivo recebido:', file.name);
    // Validar o tipo do arquivo se necessário
    // const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    // if (!validTypes.includes(file.type)) {
    //   console.error('Tipo de arquivo não permitido:', file.type);
    //   return;
    // }

    displayFile(file); // Exibe o nome do arquivo na lista
    
    // Aqui você adicionaria o código para realmente fazer upload do arquivo
    // por exemplo usando FormData e fetch
  }

  // Exibir o arquivo na lista
  function displayFile(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileName = document.createElement('span');
    fileName.textContent = file.name;
    
    const fileSize = document.createElement('span');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);
    fileSize.style.marginLeft = '10px';
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = 'remove-file';
    removeButton.style.position = 'relative';  // Adicionar posição relativa
    removeButton.style.zIndex = '10';          // Garantir que esteja acima
    
    // Impedir propagação do evento para evitar que o input file seja acionado
    removeButton.addEventListener('click', function(e) {
        e.stopPropagation();  // Impedir propagação do evento
        fileItem.remove();
        // Você pode querer adicionar lógica aqui para cancelar o upload
    });
    
    fileItem.appendChild(fileName);
    fileItem.appendChild(fileSize);
    fileItem.appendChild(removeButton);
    fileList.appendChild(fileItem);
}

  // Formatar o tamanho do arquivo
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Event listener para o input de arquivo tradicional
  fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      handleFiles(this.files);
    }
  });
  
  // Opcional: permitir clique na dropzone para abrir o seletor de arquivos
  dropzone.addEventListener('click', function() {
    fileInput.click();
  });
}