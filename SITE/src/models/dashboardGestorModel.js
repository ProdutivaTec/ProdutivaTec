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
function pioresAspectos(tipo) {
    let coluna = tipo === "remoto" ? "piorAspectoTrabalhoRemoto" : "piorAspectoTrabalhoPresencial";
    let instrucaoSql = `
        SELECT ${coluna} AS aspecto, COUNT(*) AS quantidade
        FROM dadosDashboard
        WHERE ${coluna} IS NOT NULL
        AND ocupacao = 'Gestores'  
        GROUP BY ${coluna}
        ORDER BY quantidade DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoRecursos() {
    const instrucaoSql = `
        SELECT 
            'Trabalho Remoto' AS TipoTrabalho,
            AVG(tempoDedicadoTarefasRemoto) AS MediaTempoFamilia,
            AVG(tempoDedicadoTrabalhoRemoto) AS MediaTempoTrabalho
        FROM dadosDashboard
        WHERE preferenciaTrabalhoRemoto = 'Remoto'
        UNION ALL
        SELECT 
            'Trabalho Presencial' AS TipoTrabalho,
            AVG(tempoDedicadoTarefasPresencial) AS MediaTempoFamilia,
            AVG(tempoDedicadoTrabalhoPresencial) AS MediaTempoTrabalho
        FROM dadosDashboard
        WHERE preferenciaTrabalhoRemoto = 'Presencial';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql) // Deve retornar uma Promise
        .then(resultado => {
            console.log("Resultado da execução SQL:", resultado);
            return resultado; // Retorna o resultado para o controller
        })
        .catch(erro => {
            console.error("Erro na execução SQL:", erro);
            throw erro; // Garante que o erro seja tratado no controller
        });
}

module.exports = {
    porcentagemProdutivoPresencial,
    porcentagemProdutivoRemoto,
    porcentagemProdutivoRemotoMulher,
    porcentagemProdutivoPresencialMulher,
    mediaProdutividadeEquipe,
    pioresAspectos,
    graficoRecursos,
}

