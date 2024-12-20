var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarLeads(nome, email, telefone, descricao) {
    console.log("ACESSEI O USUARIO MODEL cadastroFuncionario \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, telefone, descricao);

    var instrucaoSql = `
        INSERT INTO leads (nome, email, telefone, mensagem) VALUES ('${nome}', '${email}', '${telefone}', '${descricao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(function (resultado) {
            console.log("Resultado da execução SQL:", resultado);
            return resultado;
        })
        .catch(function (erro) {
            console.log("Erro na execução SQL:", erro);
            throw erro;
        });
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarFuncionarioRoot(nome, email, telefone, senha, empresa, cargo) {
    console.log("ACESSEI O USUARIO MODEL cadastroFuncionario \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, telefone, senha, empresa, cargo);

    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, telefone, senha, fkEmpresa, fkTipoFuncionario) VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${empresa}', '${cargo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(function (resultado) {
            console.log("Resultado da execução SQL:", resultado);
            return resultado;
        })
        .catch(function (erro) {
            console.log("Erro na execução SQL:", erro);
            throw erro;
        });
}

function cadastrarFuncionario(nome, email, telefone, senha, empresa, tipoFuncionario) {
    console.log("ACESSEI O USUARIO MODEL cadastroFuncionario \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, telefone, senha, empresa, tipoFuncionario);

    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, telefone, senha, fkEmpresa, fkTipoFuncionario) VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${empresa}', '${tipoFuncionario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(function (resultado) {
            console.log("Resultado da execução SQL:", resultado);
            return resultado;
        })
        .catch(function (erro) {
            console.log("Erro na execução SQL:", erro);
            throw erro;
        });
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarEmpresa(nome, cnpj, cep, logradouro, bairro, cidade, numero, complemento, qtdFuncionarios) {
    console.log("ACESSEI O USUARIO MODEL cadastroEmpresa \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, cep, logradouro, bairro, cidade, numero, complemento, qtdFuncionarios);

    var instrucaoSql = `
        INSERT INTO empresa (nome, cnpj, cep, logradouro, bairro, cidade, numero, complemento, qtdFuncionarios) VALUES ('${nome}', '${cnpj}', '${cep}', '${logradouro}', '${bairro}','${cidade}','${numero}', '${complemento}', ${qtdFuncionarios});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(function (resultado) {
            console.log("Resultado da execução SQL:", resultado);
            return resultado;
        })
        .catch(function (erro) {
            console.log("Erro na execução SQL:", erro);
            throw erro;
        });
}

function listarEmpresas() {
    var instrucaoSql = `
    SELECT * FROM empresa
    `;
  
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;
  
    return database.executar(instrucaoSql);
}
  
function buscarPorCnpj(cnpj) {
    var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;
  
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    enviarLeads,
    cadastrarFuncionarioRoot,
    cadastrarFuncionario,
    cadastrarEmpresa,
    listarEmpresas,
    buscarPorCnpj,
    buscarPorId
};