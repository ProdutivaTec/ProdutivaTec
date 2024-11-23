function entrar() {
    aguardar();

    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (senhaVar == "" || senhaVar == "") {

        finalizarAguardar();
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
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
    
                    setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 1000);
    
                })
    
            } else {
                finalizarAguardar();
                
                console.log("Houve um erro ao tentar realizar o login!");
    
                resposta.text().then(texto => {
                    console.error(texto);
                    
                });
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })
    }
    return false;
}