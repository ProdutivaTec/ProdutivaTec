// Ao carregar a página, verifica se existe uma imagem salva no localStorage e a exibe
document.addEventListener("DOMContentLoaded", function() {
    const savedImage = localStorage.getItem("profileImage");
    const userImage = document.getElementById("userImage");
    if (savedImage) {
        userImage.src = savedImage; // Exibe a imagem salva
    }
});

// Função para carregar a imagem do dispositivo ou câmera
document.getElementById("uploadBtn").addEventListener("click", function() {
    document.getElementById("uploadInput").click(); // Abre o seletor de arquivo
});

function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const userImage = document.getElementById("userImage");
        userImage.src = e.target.result; // Exibe a nova imagem

        // Armazena a imagem no localStorage como base64
        localStorage.setItem("profileImage", e.target.result);
    };

    if (file) {
        reader.readAsDataURL(file); // Converte a imagem para base64
    }
}

// Função para excluir a imagem do localStorage e restaurar a imagem padrão
document.getElementById("deleteBtn").addEventListener("click", function() {
    localStorage.removeItem("profileImage"); // Remove a imagem do localStorage

    // Restaura a imagem padrão
    document.getElementById("userImage").src = "./assets/img/image 56.png";
});
