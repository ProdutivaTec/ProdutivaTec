document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e o modal
    const btnCadastro = document.getElementById('btnCadastro');
    const modalCadastro = document.getElementById('modalCadastro');
    const closeCadastro = document.getElementById('closeCadastro');
    const cadastroForm = document.getElementById('cadastroForm');
    const submitButton = cadastroForm.querySelector('button[type="submit"]'); // Botão de submit

    // Função para abrir o modal
    btnCadastro.onclick = function() {
        modalCadastro.style.display = 'block';
    }

    // Função para fechar o modal
    closeCadastro.onclick = function() {
        modalCadastro.style.display = 'none';
    }

    // Fecha o modal se o usuário clicar fora do modal
    window.onclick = function(event) {
        if (event.target === modalCadastro) {
            modalCadastro.style.display = 'none';
        }
    }

    });
