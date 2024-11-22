document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => validarCampo(input.id));
    });
});

function entrar() {
    event.preventDefault()
    aguardar();

    function gerarNumeroDecimalAleatorio(min, max) {
      return Math.random() * (max - min) + min;
  }
    
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var telefoneVar = telefone_input.value;
    var cargoVar = cargo_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
//    var empresaVar = listaEmpresas.value

    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" 
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        empresaServer: empresaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
}

function entrar2() {
  event.preventDefault()
  aguardar();

  var nome_input = document.getElementById("nome_input");
  var sobrenome_input = document.getElementById("sobrenome_input");
  var email_input = document.getElementById("email_input");
  var funcao_input = document.getElementById("funcao_input");

  if (document.getElementById("acessoTotal_input") != '') {
    var nivelAcessoVar = document.getElementById("acessoTotal_input")
  } else if (document.getElementById("acessoLimitado_input") != '') {
    var nivelAcessoVar = document.getElementById("acessoLimitado_input")
  }
  
  var nomeVar = nome_input.value + ' ' + sobrenome_input;
  var emailVar = email_input.value;
  var funcaoVar = funcao_input.value;
  var senhaAleatoriaVar = Math.floor(Math.random() * 10000) + 6;
  //var empresaVar = listaEmpresas.value
  var nivelAcessoVar = nivelAcesso_input.value;

  // COMEÇO DAS VALIDAÇÕES //

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaAleatoriaVar == "" ||
    funcaoVar == "" ||
    nivelAcessoVar == ""
  //  empresaVar == ""
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  } 

  // VALIDAÇÕES NOME //
  let nomeTrim = nomeVar.trim(); 
  let nomeTamanho = nomeVar.length;

  // SE O NOME SEM OS ESPACOS FOR IGUAL A VAZIO, ELE NÃO PASSA
  if (nomeTrim == '') {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Preencha o campo Nome)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // SE O TAMANHO DO NOME FOR MAIOR QUE 50, ELE NÃO PASSA
  if (nomeTamanho > 50) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(O nome só pode ter no maximo 50 caracteres)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // VALIDAÇÕES EMAIL //
  let emailTrim = emailVar.trim();
  let emailTamanho = emailVar.length; 
  let caracterEmail = 0;

  // SE O EMAIL SEM OS ESPACOS FOR IGUAL A VAZIO, ELE NÃO PASSA
  if (emailTrim == '') {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Preencha o campo Email)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // SE O EMAIL TIVER UM TAMANHO MAIOR QUE 200, ELE NÃO PASSA
  if (emailTamanho > 200) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(O email não pode ter mais de 200 caracteres)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // SE A SENHA NÃO TIVER PELO MENOS 1 CARACTER ESPECIAL, ELE NÃO PASSA 
  
  for (let contador = 0; contador < emailTamanho; contador += 1) {
      // Verifica se o email tem @      
      if (emailVar[contador] == '@') {
        caracterEmail += 1;
      }
  }

  if (caracterEmail < 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "Email precisa ter um dominio";
      finalizarAguardar();
      return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // VALIDAÇÕES SENHA //
  let senhaTamanho = senhaAleatoriaVar.length;

  // SE O TAMANHO DA SENHA FOR MENOR QUE 6 OU MAIOR QUE 20, ELE NÃO PASSA
  if (senhaTamanho < 6 || senhaTamanho > 45) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "Senha precisa ter no minimo 6 caracteres e no maximo 45";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // FIM DAS VALIDAÇÕES //


  // Enviando o valor da nova input
  fetch("/usuarios/cadastrarFuncionario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      funcaoServer: funcaoVar,
      senhaServer: senhaAleatoriaVar,
      nivelAcessoServer: nivelAcessoVar
      //empresaServer: empresaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

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

function aguardar() {
    const loader = document.querySelector('#loader');
    if (loader) loader.style.display = 'block';
}

function finalizarAguardar() {
    const loader = document.querySelector('#loader');
    if (loader) loader.style.display = 'none';
}