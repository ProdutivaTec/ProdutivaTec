var database = require("../database/config")

function genero() {
    var instrucaoSql = `
    SELECT
        'Homem' AS genero,
        COUNT(*) AS quantidade
    FROM
        dadosDashboard
    WHERE
        TRIM(genero) = 'Homem'
    
    UNION ALL
    
    SELECT
        'Mulher' AS genero,
        COUNT(*) AS quantidade
    FROM
        dadosDashboard
    WHERE
        TRIM(genero) = 'Mulher';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalRespostasPesquisa() {
    var instrucaoSql = `
        SELECT COUNT(DISTINCT idDados) AS quantidade_respostas
        FROM dadosDashboard;
    `;
    console.log("Executando a instrução SQL para contar as respostas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalColaboradores() {
    var instrucaoSql = `
        SELECT COUNT(*) AS quantidade_colaboradores
        FROM dadosDashboard;
    `;
    console.log("Executando a instrução SQL para contar os colaboradores: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function colaboradoresSatisfeitos() {
    var instrucaoSql = `
    SELECT 
        COUNT(*) AS quantidade_satisfeitos
    FROM 
        dadosDashboard
    WHERE 
        TRIM(preferenciaTrabalhoRemoto) = 'Satisfeito';
    `;
    console.log("Executando a instrução SQL para colaboradores satisfeitos: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function colaboradoresInsatisfeitos() {
    var instrucaoSql = `
    SELECT 
        COUNT(*) AS quantidade_insatisfeitos
    FROM 
        dadosDashboard
    WHERE 
        TRIM(preferenciaTrabalhoRemoto) = 'Insatisfeito';
    `;
    console.log("Executando a instrução SQL para colaboradores insatisfeitos: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recomendacao() {
    var instrucaoSql = `
         SELECT 
            (SELECT COUNT(*) FROM dadosDashboard WHERE TRIM(recomendacao) = 'Recomendaria') AS recomendaria,
            (SELECT COUNT(*) FROM dadosDashboard) AS total;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function produtividadePorEquipe() {
    var instrucaoSql = `
    SELECT 
        ocupacao AS equipe,
        produtividade AS categoria_produtividade,
        COUNT(*) AS quantidade
    FROM 
        dadosDashboard
    GROUP BY 
        ocupacao, produtividade
    ORDER BY 
        quantidade DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function satisfacaoPorEquipe() {
    var instrucaoSql = `
    SELECT 
        ocupacao AS equipe,
        colaboracaoComColegasAnoAnterior AS categoria_satisfacao,
        COUNT(*) AS quantidade
    FROM 
        dadosDashboard
    GROUP BY 
        ocupacao, colaboracaoComColegasAnoAnterior
    ORDER BY 
        quantidade DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pioresAspectos(tipo) {
    let coluna = tipo === "remoto" ? "piorAspectoTrabalhoRemoto" : "piorAspectoTrabalhoPresencial";
    let instrucaoSql = `
        SELECT ${coluna} AS aspecto, COUNT(*) AS quantidade
        FROM dadosDashboard
        WHERE ${coluna} IS NOT NULL
        GROUP BY ${coluna}
        ORDER BY quantidade DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function nomeEmpresa(fkEmpresa) {
    var instrucaoSql = `
        SELECT nome FROM empresa WHERE idEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL para contar os colaboradores: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    genero,
    totalColaboradores,
    totalRespostasPesquisa,
    colaboradoresInsatisfeitos,
    colaboradoresSatisfeitos,
    recomendacao,
    produtividadePorEquipe,
    satisfacaoPorEquipe,
    pioresAspectos,
    nomeEmpresa
};
