function validarSessao() {
    const email = sessionStorage.EMAIL_USUARIO;
    const nome = sessionStorage.NOME_USUARIO.toUpperCase()
    const sobrenome = sessionStorage.SOBRENOME_USUARIO.toUpperCase()

    var user = document.getElementById("nome_usuario");
    var sobreuser = document.getElementById("sobrenome_usuario");

    if (email != null && nome != null) {
        user.innerHTML = nome;
        sobreuser.innerHTML = sobrenome;
    } else {
        window.location = "login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "index.html";
}

// carregamento (loading)
function aguardar() {
    var loading = document.getElementById("loading-gif");

}

function finalizarAguardar() {
    var loading = document.getElementById("loading-gif");


}

function irParaDashboard() {
    var tipoFuncionario = sessionStorage.FK_TIPO_FUNCIONARIO;
    
        if (tipoFuncionario == 1) {
            setTimeout(function () {
            window.location = "dashboard.html";
        }, 500);
        } else {
            setTimeout(function () {
            window.location = "dashboardGestor.html";
            }, 500);
        }
}

function irParaConfiguracoes() {
    var tipoFuncionario = sessionStorage.FK_TIPO_FUNCIONARIO;
    
        if (tipoFuncionario == 1) {
            setTimeout(function () {
            window.location = "configuracoesPerfil.html";
        }, 500);
        } else {
            setTimeout(function () {
            window.location = "configuracoesPerfil.html";
            }, 500);
        }
}