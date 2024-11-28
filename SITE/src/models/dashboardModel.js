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

module.exports = {
    genero
}