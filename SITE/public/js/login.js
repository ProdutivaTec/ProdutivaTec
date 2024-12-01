function entrar() {
    aguardar();

    var emailVar = document.getElementById("email").value;
    var senhaVar = document.getElementById("senha").value;

    if (senhaVar == "" || senhaVar == "") {
        emaildiv.innerHTML = "preecha os campos";
        emaildv.innerHTML = "preecha os campos";

        console.log("campo não preechido")
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
                senhaServer: senhaVar,
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_FUNCIONARIO = json.idFuncionario;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.TELEFONE = json.felefone;
                    sessionStorage.SENHA_USUARIO = json.senha;
                    sessionStorage.FK_EMPRESA = json.fkEmpresa;
                    sessionStorage.FK_TIPO_FUNCIONARIO = json.fkTipoFuncionario;

                    var tipoFuncionario = sessionStorage.FK_TIPO_FUNCIONARIO = json.fkTipoFuncionario;

                    alert("Login realizado com sucesso");
    
                    if (tipoFuncionario == 1) {
                        setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 1000);
                    } else {
                        setTimeout(function () {
                            window.location = "dashboard-VisãoGestor.html";
                        }, 1000);
                    }
                    
    
                })
    
            } else {
                finalizarAguardar();

                alert("Houve um erro ao tentar realizar o login!");
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