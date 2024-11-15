document.addEventListener('DOMContentLoaded', () => {
    console.log(document.getElementById('idDoElemento'));
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => {
            validarCampo(input.id.replace('input_', ''), input.id === 'input_cnpj' ? 14 : input.id === 'input_cep' ? 8 : 0);
            toggleButton();
        });
    });
});

async function entrar(event) {
    event.preventDefault()
    aguardar();

    let erro = false;

    if (!validarCampo('nome', 0, 60)) erro = true;
    if (!validarCampo('cnpj', 14, 14)) erro = true;
    if (!validarCampo('cep', 8, 8)) erro = true;
    if (!validarCampo('logradouro', 0, 60)) erro = true;
    if (!validarCampo('bairro', 0, 50)) erro = true;
    if (!validarCampo('cidade', 0, 50)) erro = true;
    if (!validarCampo('numero', 0, 7)) erro = true;
    if (!validarCampo('complemento', -1, 50)) erro = true;
    if (!validarCampo('qtdFuncionarios', 1, 1000000)) erro = true;

    if (erro) {
        finalizarAguardar();
        return;
    }

    sumirMensagem();

    try {
        const resposta = await fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: document.querySelector('#input_nome').value,
                cnpjServer: document.querySelector('#input_cnpj').value,
                cepServer: document.querySelector('#input_cep').value,
                logradouroServer: document.querySelector('#input_logradouro').value,
                bairroServer: document.querySelector('#input_bairro').value,
                cidadeServer: document.querySelector('#input_cidade').value,
                numeroServer: document.querySelector('#input_numero').value,
                complementoServer: document.querySelector('#input_complemento').value,
                qtdFuncionariosServer: document.querySelector('#input_qtdFuncionarios').value
            }),
        });

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "cadastroFuncionario.html";
            }, 2000);
            limparFormulario();
        } else {
            console.log(document.getElementById('idDoElemento'));
            throw new Error("Houve um erro ao tentar realizar o cadastro!");
        }
    } catch (error) {
        console.log(`#ERRO: ${error}`);
    } finally {
        finalizarAguardar();
    }
}

function validarCampo(campo, minLength, maxLength) {
    const valor = document.querySelector(`#input_${campo}`).value;
    const erroDiv = document.querySelector(`#erro_${campo}`);
    
    if (valor.length < minLength || valor === "" || valor.length > maxLength || (campo === 'qtdFuncionarios' && valor <= 0)) {
        if (erroDiv) { 
            erroDiv.innerHTML = mensagensErro[campo]; 
        } 
        return false; 
    } else { 
        if (erroDiv) { 
            erroDiv.innerHTML = ""; 
        } 
        return true;
    }
}

function toggleButton() {
    const botaoCadastrar = document.querySelector('#botaoCadastrar');
    let todosValidos = true;

    if (!validarCampo('nome', 0, 60)) todosValidos = false;
    if (!validarCampo('cnpj', 14, 14)) todosValidos = false;
    if (!validarCampo('cep', 8, 8)) todosValidos = false;
    if (!validarCampo('logradouro', 0, 60)) todosValidos = false;
    if (!validarCampo('bairro', 0, 50)) todosValidos = false;
    if (!validarCampo('cidade', 0, 50)) todosValidos = false;
    if (!validarCampo('numero', 0, 7)) todosValidos = false;
    if (!validarCampo('complemento', -1, 50)) todosValidos = false;
    if (!validarCampo('qtdFuncionarios', 1, 1000000)) todosValidos = false;

    botaoCadastrar.style.pointerEvents = todosValidos ? 'auto' : 'none';
    botaoCadastrar.style.opacity = todosValidos ? '1' : '0.5';
}

function sumirMensagem() {
    const div_alert = document.querySelector('#alertas');
    if (div_alert) div_alert.style.display = 'none';
}

const mensagensErro = {
    nome: "Nome da empresa é obrigatório",
    cnpj: "CNPJ deve ter 14 dígitos",
    cep: "CEP deve ter 8 dígitos",
    logradouro: "Logradouro é obrigatório",
    bairro: "Bairro é obrigatório",
    cidade: "Cidade é obrigatória",
    numero: "Número é obrigatório",
    qtdFuncionarios: "Quantidade de funcionários deve ser maior que zero",
};

function aguardar() {
    const loader = document.querySelector('#loader');
    if (loader) loader.style.display = 'block';
}

function finalizarAguardar() {
    const loader = document.querySelector('#loader');
    if (loader) loader.style.display = 'none';
}

function limparFormulario() {
    document.querySelector('#input_nome').value = '';
    document.querySelector('#input_cnpj').value = '';
    document.querySelector('#input_cep').value = '';
    document.querySelector('#input_logradouro').value = '';
    document.querySelector('#input_bairro').value = '';
    document.querySelector('#input_cidade').value = '';
    document.querySelector('#input_numero').value = '';
    document.querySelector('#input_complemento').value = '';
    document.querySelector('#input_qtdFuncionarios').value = '';
}
