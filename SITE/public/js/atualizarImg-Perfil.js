// Função para carregar a foto de perfil armazenada no localStorage (caso exista)
function carregarFotoPerfil() {
    const fotoSalva = localStorage.getItem('fotoPerfil');
    if (fotoSalva) {
        atualizarTodasAsFotos(fotoSalva);
    }
}

// Função para atualizar todas as fotos de perfil
function atualizarTodasAsFotos(imageData) {
    const todasAsFotos = document.querySelectorAll('.fotoUsuario'); // Seleciona todas as imagens com a classe fotoUsuario
    todasAsFotos.forEach(foto => {
        foto.src = imageData;
    });
}

// Selecionar elementos (somente se existirem na página)
const atualizarFotoBtn = document.getElementById('atualizarFotoBtn');
const apagarFotoBtn = document.getElementById('apagarFotoBtn');
const inputUploadFoto = document.getElementById('inputUploadFoto');

// Adicionar evento ao botão de atualizar foto, se ele existir
if (atualizarFotoBtn && inputUploadFoto) {
    atualizarFotoBtn.addEventListener('click', () => {
        inputUploadFoto.click(); // Simula um clique no input de upload de arquivo
    });

    // Lidar com a seleção de um novo arquivo
    inputUploadFoto.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            // Carregar a nova imagem como URL e substituir a imagem atual
            reader.onload = (e) => {
                const imageData = e.target.result;
                atualizarTodasAsFotos(imageData); // Atualizar todas as imagens de perfil
                localStorage.setItem('fotoPerfil', imageData); // Armazenar a imagem no localStorage
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Adicionar evento ao botão de apagar foto, se ele existir
if (apagarFotoBtn) {
    apagarFotoBtn.addEventListener('click', () => {
        const placeholder = './assets/img/image-placeholder.png'; // Define uma imagem padrão
        atualizarTodasAsFotos(placeholder); // Atualiza todas as imagens para o placeholder
        localStorage.removeItem('fotoPerfil'); // Remove a imagem do localStorage
    });
}

// Carregar a foto de perfil ao iniciar a página
carregarFotoPerfil();
