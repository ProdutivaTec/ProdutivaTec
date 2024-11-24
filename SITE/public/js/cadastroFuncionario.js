document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener('input', () => validarCampo(input.id));
    });
});

function cadastrarFuncionarioRoot() {
    event.preventDefault()
    aguardar();
    
    var nomeVar =  document.getElementById("input_nome").value;
    var emailVar = document.getElementById("input_email").value;
    var telefoneVar = document.getElementById("input_telefone").value;
    var cargoVar = document.getElementById("input_cargo").value;
    var senhaVar = document.getElementById("input_senha").value;
    var confirmacaoSenhaVar = document.getElementById("input_senhaConfirmar").value;
//    var empresaVar = listaEmpresas.value

    if (
      nomeVar == "" ||
      emailVar == "" ||
      telefoneVar == "" ||
      cargoVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" 
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarFuncionarioRoot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        telefoneServer: telefoneVar,
        cargoServer: cargoVar,
        senhaServer: senhaVar
        //empresaServer: empresaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          alert("Funcionário cadastrado com sucesso!");

        setTimeout(() => {
          window.location = "index.html";
        }, "2000");
        
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

function cadastrarFuncionario() {
  event.preventDefault()
  aguardar();

  var nome_input = document.getElementById("nome_input");
  var sobrenome_input = document.getElementById("sobrenome_input");
  var email_input = document.getElementById("email_input");
  var funcao_input = document.getElementById("funcao_input");
  const acessoTotal_input = document.getElementById("acessoTotal_input");
  const acessoLimitado_input = document.getElementById("acessoLimitado_input");

  let nivelAcessoVar = '';
    if (acessoTotal_input.checked) {
        nivelAcessoVar = "RH";
    } else if (acessoLimitado_input.checked) {
        nivelAcessoVar = "Gestor";
    } else {
        // Exibe mensagem de erro se nenhum for selecionado
        const checkboxError = document.getElementById("checkboxError");
        checkboxError.textContent = "Por favor, selecione um nível de acesso.";
        return;
    }
  
  var nomeVar = `${nome_input.value} ${sobrenome_input.value}`;
  var emailVar = email_input.value;
  var telefoneVar = '';
  var cargoVar = funcao_input.value;
  var senhaAleatoriaVar = Math.floor(Math.random() * 100_000_000);
  //var empresaVar = listaEmpresas.value
      nivelAcessoVar;

  // COMEÇO DAS VALIDAÇÕES //

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaAleatoriaVar == "" ||
    cargoVar == "" ||
    nivelAcessoVar == ""
  //  empresaVar == ""
  ) {
    checkboxError.textContent =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  } 

  // VALIDAÇÕES NOME //
  let nomeTrim = nomeVar.trim(); 
  let nomeTamanho = nomeVar.length;

  // SE O NOME SEM OS ESPACOS FOR IGUAL A VAZIO, ELE NÃO PASSA
  if (nomeTrim == '') {
    checkboxError.textContent =
      "(Preencha o campo Nome)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // SE O TAMANHO DO NOME FOR MAIOR QUE 50, ELE NÃO PASSA
  if (nomeTamanho > 45) {
    checkboxError.textContent =
      "(O nome só pode ter no maximo 45 caracteres)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // VALIDAÇÕES EMAIL //
  let emailTrim = emailVar.trim();
  let emailTamanho = emailVar.length; 
  let caracterEmail = 0;

  // SE O EMAIL SEM OS ESPACOS FOR IGUAL A VAZIO, ELE NÃO PASSA
  if (emailTrim == '') {
    checkboxError.textContent =
      "(Preencha o campo Email)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // SE O EMAIL TIVER UM TAMANHO MAIOR QUE 200, ELE NÃO PASSA
  if (emailTamanho > 45) {
    checkboxError.textContent =
      "(O email não pode ter mais de 45 caracteres)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // SE A SENHA NÃO TIVER PELO MENOS 1 CARACTER ESPECIAL, ELE NÃO PASSA 
  for (let contador = 0; contador < emailTamanho; contador += 1) {   
      if (emailVar[contador] == '@') {
        caracterEmail += 1;
      }
  }

  if (caracterEmail < 1) {
    checkboxError.textContent = "Email precisa ter um dominio";
      finalizarAguardar();
      return false;
  } else {
    setInterval(5000);
  }

  // VALIDAÇÕES SENHA 
  let senhaTamanho = senhaAleatoriaVar.length;

  // SE O TAMANHO DA SENHA FOR MENOR QUE 6 OU MAIOR QUE 20, ELE NÃO PASSA
  if (senhaTamanho < 3 || senhaTamanho > 45) {
    checkboxError.textContent =
      "Senha precisa ter no minimo 6 caracteres e no maximo 45";

    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
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
      telefoneServer: telefoneVar,
      cargoServer: cargoVar,
      senhaServer: senhaAleatoriaVar,
      nivelAcessoServer: nivelAcessoVar
      //empresaServer: empresaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {

        setTimeout(() => {
          window.location = "configuracoesColaboradores.html";
        }, "2000");

        finalizarAguardar();
      } else {
        throw new Error("Erro ao cadastrar funcionário.");
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