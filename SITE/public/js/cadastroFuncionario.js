document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => validarCampo(input.id));
    });
});

function entrar() {
    let erro = false;

    if (!validarCampo('input_nome')) erro = true;
    if (!validarCampo('input_email')) erro = true;
    if (!validarCampo('input_telefone')) erro = true;
    if (!validarCampo('input_cargo')) erro = true;
    if (!validarCampo('input_senha')) erro = true;
    if (!validarCampo('input_senhaConfirmar')) erro = true;

    if (erro) return false;

    // Exemplo de lógica para envio de dados e redirecionamento (substituir com lógica real)
    alert("Cadastro realizado com sucesso!");
    return false;
}

function validarCampo(campoId) {
    const campo = document.querySelector(`#${campoId}`);
    const valor = campo.value;
    const erroDivId = `erro_${campoId}`;
    let erroMsg = "";

    if (!document.querySelector(`#${erroDivId}`)) {
        const erroDiv = document.createElement('div');
        erroDiv.id = erroDivId;
        erroDiv.style.color = 'red';
        campo.parentNode.appendChild(erroDiv);
    }
    
    const erroDiv = document.querySelector(`#${erroDivId}`);

    if (campoId === 'input_nome' && valor.trim() === "") {
        erroMsg = "Nome é obrigatório";
    } else if (campoId === 'input_email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor)) {
        erroMsg = "Email inválido";
    } else if (campoId === 'input_telefone' && !/^\d{10,11}$/.test(valor)) {
        erroMsg = "Telefone deve ter 11 dígitos";
    } else if (campoId === 'input_cargo' && valor.trim() === "") {
        erroMsg = "Cargo é obrigatório";
    } else if (campoId === 'input_senha' && valor.length < 6) {
        erroMsg = "Senha deve ter no mínimo 6 caracteres";
    } else if (campoId === 'input_senhaConfirmar' && valor !== document.querySelector('#input_senha').value) {
        erroMsg = "As senhas não coincidem";
    } 

    erroDiv.textContent = erroMsg;
    return erroMsg === "";
}
