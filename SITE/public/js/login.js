function entrar() {
    aguardar();

    var emailVar = document.getElementById("email").value;
    var senhaVar = document.getElementById("senha").value;

    if (senhaVar == "" || 
        senhaVar == ""
    )   {
        emaildiv.innerHTML = "preecha os campos";
        emaildv.innerHTML = "preecha os campos";
        exibirModalErro();

        console.log("campo não preechido")
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
                    sessionStorage.TELEFONE = json.telefone;
                    sessionStorage.SENHA_USUARIO = json.senha;
                    sessionStorage.FK_EMPRESA = json.fkEmpresa;
                    sessionStorage.FK_TIPO_FUNCIONARIO = json.fkTipoFuncionario;

                    var tipoFuncionario = sessionStorage.FK_TIPO_FUNCIONARIO = json.fkTipoFuncionario;

    
                    if (tipoFuncionario == 1) {
                        exibirModalSucesso();
                        
                        setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 2000);
                    } else {
                        exibirModalSucesso();

                        setTimeout(function () {
                            window.location = "dashboard-VisãoGestor.html";
                        }, 2000);
                    }
                    
    
                })
    
            } else {
                finalizarAguardar();
                exibirModalErro();
                console.log("Houve um erro ao tentar realizar o login!");
    
                resposta.text().then(texto => {
                    console.error(texto);
                    
                });
            }
    
        }).catch(function (erro) {
            exibirModalErro();

            console.log(erro);
            return;
        })
    }
    return false;
}

function exibirModalSucesso() {
    const modalSucesso = document.querySelector("#successModal");
    if (modalSucesso) {
        console.log("Exibindo modal de sucesso...");
        modalSucesso.style.display = "flex"; // Mostra o modal
        setTimeout(() => {
            modalSucesso.style.display = "none"; // Oculta o modal após 1.9 segundos
        }, 1900);
    } else {
        console.error("Modal de sucesso não encontrado!");
    }
}

function exibirModalErro() {
    const modalErro = document.querySelector("#errorModal");
    if (modalErro) {
        console.log("Exibindo modal de erro...");
        modalErro.style.display = "flex";
        setTimeout(() => {
            modalErro.style.display = "none";
        }, 1700);
    } else {
        console.error("Modal de erro não encontrado!");
    }
}