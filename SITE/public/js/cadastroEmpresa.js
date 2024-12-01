document.addEventListener('DOMContentLoaded', () => {
    console.log(document.getElementById('idDoElemento'));
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => {
            validarCampo(input.id.replace('input_', ''), input.id === 'input_cnpj' ? 14 : input.id === 'input_cep' ? 8 : 0);
            toggleButton();
        });
    });
});

async function cadastrarEmpresa(event) {
    event.preventDefault();
    aguardar();

    let erro = false;

    if (!validarCampo('nome', 0, 45)) erro = true;
    if (!validarCampo('cnpj', 14, 14)) erro = true;
    if (!validarCampo('cep', 8, 8)) erro = true;
    if (!validarCampo('logradouro', 0, 45)) erro = true;
    if (!validarCampo('bairro', 0, 45)) erro = true;
    if (!validarCampo('cidade', 0, 45)) erro = true;
    if (!validarCampo('numero', 0, 10)) erro = true;
    if (!validarCampo('complemento', -1, 45)) erro = true;
    if (!validarCampo('qtdFuncionarios', 1, 8)) erro = true;

    if (erro) {
        exibirModalErro(); // Exibe o modal de erro
        finalizarAguardar();
        return;
    }

    var input_nome = document.getElementById("input_nome");
    var input_cnpj = document.getElementById("input_cnpj");
    var input_cep = document.getElementById("input_cep");
    var input_logradouro = document.getElementById("input_logradouro");
    var input_bairro = document.getElementById("input_bairro");
    var input_cidade = document.getElementById("input_cidade");
    var input_numero = document.getElementById("input_numero");
    var input_complemento = document.getElementById("input_complemento");
    var input_qtdFuncionarios = document.getElementById("input_qtdFuncionarios");

    var nomeVar = input_nome.value;
    var cnpjVar = input_cnpj.value;
    var cepVar = input_cep.value;
    var logradouroVar = input_logradouro.value;
    var bairroVar = input_bairro.value;
    var cidadeVar = input_cidade.value;
    var numeroVar = input_numero.value;
    var complementoVar = input_complemento.value;
    var qtdFuncionariosVar = input_qtdFuncionarios.value;

    sumirMensagem();

    fetch("/usuarios/cadastrarEmpresa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeVar,
          cnpjServer: cnpjVar,
          cepServer: cepVar,
          logradouroServer: logradouroVar,
          bairroServer: bairroVar,
          cidadeServer: cidadeVar,
          numeroServer: numeroVar,
          complementoServer: complementoVar,
          qtdFuncionariosServer: qtdFuncionariosVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            exibirModalSucesso(); // Substituição do alert pelo modal

            setTimeout(() => {
                window.location = "cadastroFuncionario.html";
            }, 2100);
  
            finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            exibirModalErro(); // Exibir o modal de erro
            finalizarAguardar();
            return;
        });
        
}

function exibirModalSucesso() {
    const modalSucesso = document.querySelector("#successModal"); // Certifique-se do ID correto
    if (modalSucesso) {
        modalSucesso.style.display = "flex";
        setTimeout(() => {
            modalSucesso.style.display = "none";
        }, 2000);
    }
}

function exibirModalErro() {
    const modal = document.querySelector("#errorModal"); // Certifique-se do ID correto
    if (modal) {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 1700);
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

    if (!validarCampo('nome', 0, 45)) todosValidos = false;
    if (!validarCampo('cnpj', 14, 14)) todosValidos = false;
    if (!validarCampo('cep', 8, 8)) todosValidos = false;
    if (!validarCampo('logradouro', 0, 45)) todosValidos = false;
    if (!validarCampo('bairro', 0, 45)) todosValidos = false;
    if (!validarCampo('cidade', 0, 45)) todosValidos = false;
    if (!validarCampo('numero', 0, 10)) todosValidos = false;
    if (!validarCampo('complemento', -1, 45)) todosValidos = false;
    if (!validarCampo('qtdFuncionarios', 1, 8)) todosValidos = false;

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
