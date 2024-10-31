function entrar() {
    aguardar();
    
    const nome = input_nome.value;
    const senha = input_senha.value;
    const senhaConfirmada = input_senhaConfirmar.value;
    const telefone = input_telefone.value;
    const email = input_email.value; 
    const nomeEmpresa = input_empresa.value;
    const cargo = input_cargo.value;

    console.log("Dados antes de enviar:", {
        nomeServer: nome,
        emailServer: email,
        telefoneServer: telefone,
          nomeEmpresaServer: nomeEmpresa,
        cargoServer: cargo,
        senhaServer: senha
    });

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            telefoneServer: telefone,
            nomeEmpresaServer: nomeEmpresa,
            cargoServer: cargo,
            senhaServer: senha
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
