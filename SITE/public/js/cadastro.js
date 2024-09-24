function entrar() {
    aguardar()
    const nome = input_nome.value
    const senha = input_senha.value
    const email = input_email.value
    const senhaConfirmada = input_senhaConfirmar.value

    let erro = "";
    let verificarCaracterEspecial = false;
    let verificarLetraMaiuscula = false;
    let senhaValidada = false;

    const caracteresEspeciais = /[!@#$%^&*(),?/:{}|<>]/
    const letrasMaiusculas = /[A-Z]/

    // Verificações
    if (email == "" || senha == "" || senhaConfirmada == "" || nome == "") {
        erro = "camposVazios";
    } else if (senha != senhaConfirmada) {
        erro = "senhaDiferente";
    } else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        erro = "emailInvalido";
    } else if (senha.length < 8) {
        erro = "senhaCurta";
    } 
    
    else { 
        // Verifica caracteres especiais e letras maiúsculas
        for (let i = 0; i < senha.length; i++) {
            let char = senha[i];
            if (caracteresEspeciais.indexOf(char) !== -1) {
                verificarCaracterEspecial = true;
            }
            if (letrasMaiusculas.indexOf(char) !== -1) {
                verificarLetraMaiuscula = true;
            }
        }
   
        senhaValidada = verificarCaracterEspecial && verificarLetraMaiuscula;
        
        if (!senhaValidada) {
            erro = "senhaInvalida";
        }
    }

    switch (erro) {
        case "camposVazios":
            alertas.innerHTML += "AAA";
            finalizarAguardar();
            return false;
        case "senhaDiferente":
            alertas.innerHTML += "AAA";
            finalizarAguardar();
            return false;
        case "emailInvalido":
            alertas.innerHTML += "AAA";
            finalizarAguardar();
            return false;
        case "senhaCurta":
            alertas.innerHTML += "AAA";
            finalizarAguardar();
            return false;
        case "senhaInvalida":
            alertas.innerHTML += "AAA";
            finalizarAguardar();
            return false;
        default:
            sumirMensagem();
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: nome,
                    emailServer: email,
                    senhaServer: senha,
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {
                        setTimeout(() => {
                            window.location = "login.html";
                        }, 2000);

                        limparFormulario();
                    } else {
                        throw "Houve um erro ao tentar realizar o cadastro!";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });

            return false;
    }
}


function sumirMensagem() {
    div_alert.style.display = 'none';
}