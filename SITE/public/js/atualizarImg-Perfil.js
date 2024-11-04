// Selecionar elementos
const atualizarFotoBtn = document.getElementById('atualizarFotoBtn');
const apagarFotoBtn = document.getElementById('apagarFotoBtn');
const inputUploadFoto = document.getElementById('inputUploadFoto');
const fotoUsuario = document.getElementById('fotoUsuario');

// Função para carregar a foto do perfil armazenada no localStorage (caso exista)
function carregarFotoPerfil() {
    const fotoSalva = localStorage.getItem('fotoPerfil');
    if (fotoSalva) {
        fotoUsuario.src = fotoSalva;
    }
}

// Função para atualizar a foto de perfil
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
            fotoUsuario.src = imageData; // Atualizar a imagem de perfil
            localStorage.setItem('fotoPerfil', imageData); // Armazenar a imagem no localStorage
        };
        
        reader.readAsDataURL(file);
    }
});

// Função para apagar a foto de perfil
apagarFotoBtn.addEventListener('click', () => {
    fotoUsuario.src = './assets/img/image-placeholder.png'; // Define uma imagem padrão
    localStorage.removeItem('fotoPerfil'); // Remove a imagem do localStorage
});

// Carregar a foto de perfil ao iniciar a página
carregarFotoPerfil();
