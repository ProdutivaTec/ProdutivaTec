function registrar() {
    aguardar()
    const nome = input_nome.value
    const senha = input_senha.value
    const email = input_email.value
    const senhaConfirmada = input_senhaConfirmar.value

    let verificarLetraMaiuscula = false
    let verificarCaracterEspecial = false
    let senhaValidada = false

    const caracteresEspeciais = /[!@#$%^&*(),?/:{}|<>]/
    const letrasMaiusculas = /[A-Z]/
 



    // verificação de campos
    if (email == "" ||
        senha == "" ||
        senhaConfirmada == "" ||
        nome == "") {

        finalizarAguardar();
        return false;
    }
    // verificação senha igual
    else if (senha != senhaConfirmada) {

        finalizarAguardar();
        return false;
    }
    // verificação email
    else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
     
        finalizarAguardar();
        return false;
    }
    // verificação de senha
    else if (senha.length < 8) {
       
        finalizarAguardar();
        return false;
    }
    // verificação de caracter especial + letra maiuscula + for
    else {
        for (let senhaVerificiar = 0; senhaVerificiar < senha.length; senhaVerificiar++) {
            let char = senha[senhaVerificiar]
            if (caracteresEspeciais.indexOf(char) != -1) {
                verificarCaracterEspecial = true;
            }
            if (letrasMaiusculas.indexOf(char) != -1) {
                verificarLetraMaiuscula = true;
            }
        }
        if (verificarCaracterEspecial && verificarLetraMaiuscula) {
            senhaValidada = true
        }

        if (!senhaValidada) {
 
            finalizarAguardar();
            return false;
        } else {
            sumirMensagem()
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
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
                        }, "2000");

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
}


function sumirMensagem() {
    div_alert.style.display = 'none';
}