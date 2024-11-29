var database = require("../database/config")

function genero(){
    var instrucaoSql = `
    SELECT
            'Homem' AS genero,
            COUNT(*) AS quantidade
        FROM
            DadosTrabalhoRemoto
        WHERE
            genero = "'Homem'"
        
        UNION ALL
        
        SELECT
            'Mulher' AS genero,
            COUNT(*) AS quantidade
        FROM
            DadosTrabalhoRemoto
        WHERE
            genero = "'Mulher'";

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalRespostasPesquisa() {
    var instrucaoSql = `
        SELECT COUNT(DISTINCT response_id) AS quantidade_respostas
        FROM DadosTrabalhoRemoto;
    `;
    console.log("Executando a instrução SQL para contar as respostas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalColaboradores() {
    var instrucaoSql = `
        SELECT COUNT(*) AS quantidade_colaboradores
        FROM DadosTrabalhoRemoto;
    `;
    console.log("Executando a instrução SQL para contar os colaboradores: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function colaboradoresSatisfeitos() {
    var instrucaoSql = `
    SELECT 
        COUNT(*) AS quantidade_satisfeitos
    FROM 
        DadosTrabalhoRemoto
    WHERE 
        recomendacao_trabalho_remoto_3_meses = "'Satisfeito'";
    `;
    console.log("Executando a instrução SQL para colaboradores satisfeitos: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function colaboradoresInsatisfeitos() {
    var instrucaoSql = `
    SELECT 
        COUNT(*) AS quantidade_insatisfeitos
    FROM 
        DadosTrabalhoRemoto
    WHERE 
        recomendacao_trabalho_remoto_3_meses = "'Insatisfeito'";
    `;
    console.log("Executando a instrução SQL para colaboradores insatisfeitos: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function recomendacao() {
    var instrucaoSql = `
         SELECT 
            (SELECT COUNT(*) FROM DadosTrabalhoRemoto WHERE TRIM(recomendacao_trabalho_remoto_passado) = "'Recomendaria'") AS recomendaria,
            (SELECT COUNT(*) FROM DadosTrabalhoRemoto) AS total;
            
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    genero,
    totalColaboradores,
    totalRespostasPesquisa,
    colaboradoresInsatisfeitos,
    colaboradoresSatisfeitos,
    recomendacao,
}