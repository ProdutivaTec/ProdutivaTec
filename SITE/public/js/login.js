function validarEmail() {
    var emailVar = document.getElementById("email").value;
    var emailError = document.getElementById("email-error");
    emailError.textContent = ""; // Limpa mensagens anteriores

    // Validação do email
    if (emailVar === "") {
        emailError.textContent = "O email está incompleto.";
    } else if (!emailVar.includes("@")) {
        emailError.textContent = "O email deve conter '@'.";
    } else if (!emailVar.endsWith(".com")) {
        emailError.textContent = "O email deve terminar com '.com'.";
    } else if ((emailVar.match(/\./g) || []).length > 1) {
        emailError.textContent = "O email não deve conter mais de um ponto '.'."; // Verifica mais de um ponto
    } else if (emailVar.indexOf(".") < emailVar.indexOf("@") + 1) {
        emailError.textContent = "O domínio do e-mail deve vir após o '@'."; // Verifica a posição do ponto em relação ao arroba
    } else if (/[^a-zA-Z0-9@.]/.test(emailVar)) {
        emailError.textContent = "O email não deve conter caracteres especiais."; // Verifica caracteres especiais
    }

    // Remover a mensagem de erro assim que o usuário digitar caracteres válidos
    if (emailVar.includes("@") && emailVar.includes(".") &&
        emailVar.indexOf(".") > emailVar.indexOf("@") + 1 &&
        emailVar.endsWith(".com") && 
        (emailVar.match(/\./g) || []).length === 1 &&
        !/[^a-zA-Z0-9@.]/.test(emailVar)) {
        emailError.textContent = ""; // Limpa a mensagem de erro
    }
}


function validarSenha() {
    var senhaVar = document.getElementById("senha").value;
    var senhaError = document.getElementById("senha-error");
    var barraForca = document.getElementById("barra-forca");

    senhaError.innerHTML = ""; // Limpa mensagens anteriores
    barraForca.style.width = "0%"; // Reseta a largura da barra

    // Validação da senha
    let forca = 0; // Inicia a força como 0
    if (senhaVar.length >= 8) {
        forca++; // Adiciona 1 ponto de força
    }
    if (/[A-Z]/.test(senhaVar)) {
        forca++; // Adiciona 1 ponto de força
    }
    if (/[0-9]/.test(senhaVar)) {
        forca++; // Adiciona 1 ponto de força
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(senhaVar)) {
        forca++; // Adiciona 1 ponto de força
    }

    // Determinando a força da senha
    if (forca === 0) {
        senhaError.innerHTML = "<ul style='padding-left: 20px; margin: 0;'><li>A senha deve ter pelo menos 8 caracteres</li><li>Uma letra maiúscula</li><li>Um número</li><li>Um caractere especial</li></ul>";
        senhaError.innerHTML = `
        <div style="display: flex; flex-direction: column; line-height: 1.5;">
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 5px;">°</span>
                <span class="spanSenha">A senha deve ter pelo menos 8 caracteres</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 5px;">°</span>
                <span class="spanSenha">Uma letra maiúscula</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 5px;">°</span>
                <span class="spanSenha" >Um número</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 5px;">°</span>
                <span class="spanSenha">Um caractere especial</span>
            </div>
        </div>
    `;
            barraForca.style.width = "0%"; // Sem força
        barraForca.style.backgroundColor = "red"; // Vermelho
    } else if (forca === 1) {
        senhaError.innerHTML = "Senha Fraca";
        senhaError.style.color = "red"; // Mensagem em vermelho
        barraForca.style.width = "25%"; // 25% da força
        barraForca.style.backgroundColor = "red"; // Vermelho
    } else if (forca === 2) {
        senhaError.innerHTML = "Senha Média";
        senhaError.style.color = "orange"; // Mensagem em laranja
        barraForca.style.width = "50%"; // 50% da força
        barraForca.style.backgroundColor = "orange"; // Laranja
    } else if (forca === 3) {
        senhaError.innerHTML = "Senha Forte";
        senhaError.style.color = "green"; // Mensagem em verde
        barraForca.style.width = "75%"; // 75% da força
        barraForca.style.backgroundColor = "yellowgreen"; // Verde amarelado
    } else {
        senhaError.innerHTML = "Senha Muito Forte";
        senhaError.style.color = "green"; // Mensagem em verde
        barraForca.style.width = "100%"; // 100% da força
        barraForca.style.backgroundColor = "green"; // Verde
    }
}

// Adicione um evento de input ao campo de senha
document.getElementById("senha").addEventListener("input", function() {
    validarSenha(); // Chama a função de validação sempre que o usuário digitar
});





function entrar() {
    aguardar();

    var emailVar = document.getElementById("email").value;
    var senhaVar = document.getElementById("senha").value;

    // Limpar mensagens de erro
    document.getElementById("email-error").textContent = "";
    document.getElementById("senha-error").textContent = "";

    // Verificando se os campos estão vazios
    if (emailVar === "" || senhaVar === "") {
        finalizarAguardar();
        if (emailVar === "") {
            document.getElementById("email-error").textContent = "O email deve ser preenchido.";
            document.getElementById("email-error").style.color = "red"; // Mensagem em vermelho
        }
        if (senhaVar === "") {
            document.getElementById("senha-error").textContent = "A senha deve ser preenchida.";
            document.getElementById("senha-error").style.color = "red"; // Mensagem em vermelho
        }
        return false;
    } else {
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);
    
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
    
                    // Redirecionando para a dashboard após um pequeno atraso
                    setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 1000); // apenas para exibir o loading
                })
    
            } else {
                finalizarAguardar();
                
                console.log("Houve um erro ao tentar realizar o login!");
    
                resposta.text().then(texto => {
                    console.error(texto);
                    document.getElementById("senha-error").textContent = "Erro: " + texto; // Mostrar mensagem de erro ao usuário
                    document.getElementById("senha-error").style.color = "red"; // Mensagem em vermelho
                });
            }
    
        }).catch(function (erro) {
            finalizarAguardar();
            console.log(erro);
            document.getElementById("senha-error").textContent = "Erro na comunicação com o servidor.";
            document.getElementById("senha-error").style.color = "red"; // Mensagem em vermelho
        });
    }
    return false;
}
