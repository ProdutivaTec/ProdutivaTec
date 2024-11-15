var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            idFuncionario: resultadoAutenticar[0].idFuncionario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            telefone: resultadoAutenticar[0].telefone,
                            nomeEmpresa: resultadoAutenticar[0].nomeEmpresa,
                            cargo: resultadoAutenticar[0].cargo,
                            senha: resultadoAutenticar[0].senha,
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {

                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    console.log("Dados recebidos no body: ", req.body);

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cargo = req.body.cargoServer;
    var senha = req.body.senhaServer;

    // Validações
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (nomeEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, telefone, nomeEmpresa, cargo, senha)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no cadastro:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrarEmpresa(req, res) {
    console.log("Dados recebidos no body: ", req.body);

    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var logradouro = req.body.logradouroServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var qtdFuncionarios = req.body.qtdFuncionariosServer;

    // Validações
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    }else if (qtdFuncionarios == undefined) {
        res.status(400).send("Sua qtdFuncionarios está undefined!");
    } else {
        usuarioModel.cadastrar(nome, cnpj, cep, logradouro, bairro, cidade, numero, complemento, qtdFuncionarios)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no cadastro:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEmpresa
}