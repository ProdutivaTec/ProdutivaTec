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
    var cargoVar = '1';
    var senhaVar = document.getElementById("input_senha").value;
    var confirmacaoSenhaVar = document.getElementById("input_senhaConfirmar").value;
    var empresaVar = document.getElementById("listaEmpresas").value;
    console.log("Empresa selecionada:", empresaVar);


    if (
      nomeVar == "" ||
      emailVar == "" ||
      telefoneVar == "" ||
      cargoVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" ||
      empresaVar == ""
    ) {
      console.log('erro ao enviar para o controller')

      finalizarAguardar();
      
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
        senhaServer: senhaVar,
        empresaServer: empresaVar,
        cargoServer: cargoVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          exibirModalSucesso();

          setTimeout(() => {
          window.location = "index.html";
        }, 2100);
        
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro! no featch";
        }
      })
      .catch(function (resposta) {
        exibirModalErro();
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
        return;
      });

    return false;
}

function cadastrarFuncionario() {
  event.preventDefault()
  aguardar();

  var nome_input = document.getElementById("nome_input");
  var sobrenome_input = document.getElementById("sobrenome_input");
  var email_input = document.getElementById("email_input");
  var senha_input = document.getElementById("senha_input");
  const acessoTotal_input = document.getElementById("acessoTotal_input");
  const acessoLimitado_input = document.getElementById("acessoLimitado_input");

  let nivelAcessoVar = '';
    if (acessoTotal_input.checked) {
        nivelAcessoVar = 1;
    } else if (acessoLimitado_input.checked) {
        nivelAcessoVar = 2;
    } else {
        const checkboxError = document.getElementById("checkboxError");
        checkboxError.textContent = "Por favor, selecione um nível de acesso.";
        exibirModalErro();
        return;
    }
  
  var nomeVar = `${nome_input.value} ${sobrenome_input.value}`;
  var emailVar = email_input.value;
  var telefoneVar = '';
  var senhaVar = senha_input.value;
  var empresaVar = sessionStorage.FK_EMPRESA;
      nivelAcessoVar;

  // COMEÇO DAS VALIDAÇÕES //

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    nivelAcessoVar == "" ||
    empresaVar == ""
  ) {
    checkboxError.textContent =
      "preencha os campos vazios";

      exibirModalErro();  
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
      exibirModalErro();
    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // SE O TAMANHO DO NOME FOR MAIOR QUE 50, ELE NÃO PASSA
  if (nomeTamanho > 45) {
    checkboxError.textContent =
      "(O nome só pode ter no maximo 45 caracteres)";
      exibirModalErro();
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
      exibirModalErro();
    finalizarAguardar();
    return false;
  } else {
    setInterval(5000);
  }

  // SE O EMAIL TIVER UM TAMANHO MAIOR QUE 200, ELE NÃO PASSA
  if (emailTamanho > 45) {
    checkboxError.textContent =
      "(O email não pode ter mais de 45 caracteres)";
      exibirModalErro();
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
    exibirModalErro();
      finalizarAguardar();
      return false;
  } else {
    setInterval(5000);
  }

  // VALIDAÇÕES SENHA 
  let senhaTamanho = senhaVar.length;

  // SE O TAMANHO DA SENHA FOR MENOR QUE 6 OU MAIOR QUE 20, ELE NÃO PASSA
  if (senhaTamanho < 3 || senhaTamanho > 45) {
    checkboxError.textContent =
      "Senha precisa ter no minimo 6 caracteres e no maximo 45";
      exibirModalErro();
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
      senhaServer: senhaVar,
      empresaServer: empresaVar,
      nivelAcessoServer: nivelAcessoVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        exibirModalSucesso();

        setTimeout(() => {
          window.location = "configuracoesColaboradores.html";
        }, "2000");

        finalizarAguardar();
      } else {
        exibirModalErro();
        throw new Error("Erro ao cadastrar funcionário.");
      }
    })
    .catch(function (resposta) {
      exibirModalErro();
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
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

/* function listar() {
  fetch("/usuarios/listarEmpresas", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((empresas) => {
        empresas.forEach((empresa) => {
          listaEmpresas.innerHTML += `<option value='${empresa.idEmpresa}'>${empresa.cnpj}</option>`;
          document.getElementById("listaEmpresas").innerHTML += `<option value='${empresa.idEmpresa}'>${empresa.cnpj}</option>`;
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
*/