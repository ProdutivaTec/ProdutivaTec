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

async function buscarDadosRecursos(ocupacao) {
    const query = `
         SELECT 
        'Remoto' AS tipo_atividade,
        SUM(tempoDedicadoTarefasRemoto) AS tempo_pessoal,
        SUM(tempoDedicadoTrabalhoRemoto) AS trabalho
    FROM 
        dadosDashboard
    WHERE 
        ocupacao = 'Gestores'

    UNION ALL

    SELECT 
        'Presencial' AS tipo_atividade,
        SUM(tempoDedicadoTarefasPresencial) AS tempo_pessoal,
        SUM(tempoDedicadoTrabalhoPresencial) AS trabalho
    FROM 
        dadosDashboard
    WHERE 
    ocupacao = 'Gestores';
    `;

    console.log("Executando a query SQL com ocupação:", ocupacao);
    try {
        const resultados = await database.executar(query, [ocupacao, ocupacao]);
        return resultados;
    } catch (erro) {
        console.error("Erro ao executar a query no modelo:", erro);
        throw erro;
    }
}
function totalColaboradores() {
    var instrucaoSql = `
        SELECT COUNT(*) AS quantidade_colaboradores
        FROM dadosDashboard WHERE ocupacao = 'Gestores';
    `;
    console.log("Executando a instrução SQL para contar os colaboradores: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    porcentagemProdutivoPresencial,
    porcentagemProdutivoRemoto,
    porcentagemProdutivoRemotoMulher,
    porcentagemProdutivoPresencialMulher,
    mediaProdutividadeEquipe,
    pioresAspectos,
    buscarDadosRecursos,
    totalColaboradores
}

