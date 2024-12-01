var database = require("../database/config")

function porcentagemProdutivoPresencial() {
    var instrucaoSql = `
        SELECT 
    ROUND(
        100.0 * SUM(CASE 
            WHEN tempoDedicadoTarefasPresencial > tempoDedicadoTarefasRemoto 
            THEN 1 
            ELSE 0 
        END) / COUNT(*), 0
    ) AS percentual_presencial
FROM 
    dadosDashboard
WHERE 
    genero = 'Homem';
    `;
    console.log("Executando a instrução SQL para presencial: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function porcentagemProdutivoRemoto() {
    var instrucaoSql = `
        SELECT 
    ROUND(
        100.0 * SUM(CASE 
            WHEN tempoDedicadoTarefasRemoto > tempoDedicadoTarefasPresencial 
            THEN 1 
            ELSE 0 
        END) / COUNT(*), 0
    ) AS percentual_remoto
FROM 
    dadosDashboard
WHERE 
    genero = 'Homem';
    `;
    console.log("Executando a instrução SQL para remoto: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function porcentagemProdutivoRemotoMulher() {
    const instrucaoSql = `
        SELECT 
    ROUND(
        100.0 * SUM(CASE 
            WHEN tempoDedicadoTarefasRemoto > tempoDedicadoTarefasPresencial 
            THEN 1 
            ELSE 0 
        END) / COUNT(*), 0
    ) AS percentual_remoto
FROM 
    dadosDashboard
WHERE 
    genero = 'Mulher';
    `;
    return database.executar(instrucaoSql);
}

// Função para calcular a porcentagem de produtividade presencial (Mulher)
function porcentagemProdutivoPresencialMulher() {
    const instrucaoSql = `
        SELECT 
    ROUND(
        100.0 * SUM(CASE 
            WHEN tempoDedicadoTarefasPresencial > tempoDedicadoTarefasRemoto 
            THEN 1 
            ELSE 0 
        END) / COUNT(*), 0
    ) AS percentual_presencial
FROM 
    dadosDashboard
WHERE 
    genero = 'Mulher';
    `;
    return database.executar(instrucaoSql);
}

function mediaProdutividadeEquipe() {
    var instrucaoSql = `
        SELECT 
            ROUND(AVG(((tempoDedicadoTrabalhoRemoto + tempoDedicadoTarefasRemoto) / 40) * 5), 1) AS media_produtividade_equipe
        FROM 
            dadosDashboard;
    `;
    console.log("Executando a instrução SQL para média de produtividade da equipe do remoto: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    porcentagemProdutivoPresencial,
    porcentagemProdutivoRemoto,
    porcentagemProdutivoRemotoMulher,
    porcentagemProdutivoPresencialMulher,
    mediaProdutividadeEquipe
}

