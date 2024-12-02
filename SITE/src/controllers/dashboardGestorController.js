var dashboardGestorModel = require("../models/dashboardGestorModel");

function porcentagemProdutivoPresencial(req, res) {
    dashboardGestorModel.porcentagemProdutivoPresencial()
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Verifica se a coluna retornada está com o nome correto
                const porcentagemPresencial = resultado[0].percentual_presencial;
                console.log("Porcentagem encontrada (presencial):", porcentagemPresencial);
                res.status(200).json({ porcentagemPresencial });
            } else {
                console.log("Nenhum resultado encontrado (presencial).");
                res.status(204).send(); // Retorna sem conteúdo
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar porcentagem produtiva do presencial:", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage }); // Retorna erro interno do servidor
        });
}


function porcentagemProdutivoRemoto(req, res) {
    dashboardGestorModel.porcentagemProdutivoRemoto()
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Verifica se a coluna retornada está com o nome correto
                const porcentagemRemoto = resultado[0].percentual_remoto;
                console.log("Porcentagem encontrada (remoto):", porcentagemRemoto);
                res.status(200).json({ porcentagemRemoto });
            } else {
                console.log("Nenhum resultado encontrado (remoto).");
                res.status(204).send(); // Retorna sem conteúdo
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar porcentagem produtiva do remoto:", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage }); // Retorna erro interno do servidor
        });
}

function porcentagemProdutivoRemotoMulher(req, res) {
    dashboardGestorModel.porcentagemProdutivoRemotoMulher()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const porcentagemRemoto = resultado[0].percentual_remoto;
                console.log("Porcentagem encontrada (remoto, mulher):", porcentagemRemoto);
                res.status(200).json({ porcentagemRemoto });
            } else {
                console.log("Nenhum resultado encontrado (remoto, mulher).");
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar porcentagem produtiva do remoto (mulher):", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage });
        });
}

function porcentagemProdutivoPresencialMulher(req, res) {
    dashboardGestorModel.porcentagemProdutivoPresencialMulher()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const porcentagemPresencial = resultado[0].percentual_presencial;
                console.log("Porcentagem encontrada (presencial, mulher):", porcentagemPresencial);
                res.status(200).json({ porcentagemPresencial });
            } else {
                console.log("Nenhum resultado encontrado (presencial, mulher).");
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar porcentagem produtiva do presencial (mulher):", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage });
        });
}

function mediaProdutividadeEquipe(req, res) {
    dashboardGestorModel.mediaProdutividadeEquipe()
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Verifica se a coluna retornada está com o nome correto
                const mediaProdutividadeEquipe = resultado[0].media_produtividade_equipe;
                console.log("Média de produtividade da equipe (remoto):", mediaProdutividadeEquipe);
                res.status(200).json({ mediaProdutividadeEquipe });
            } else {
                console.log("Nenhum resultado encontrado (produtividade equipe).");
                res.status(204).send(); // Retorna sem conteúdo
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar média de produtividade da equipe do remoto:", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage }); // Retorna erro interno do servidor
        });
}
function pioresAspectosPorOcupacao(req, res) {
    const tipo = req.params.tipo; 
    dashboardGestorModel.pioresAspectos(tipo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar piores aspectos:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoRecursos(req, res) {
    console.log("Recebendo requisição para '/graficoRecursos'");
    dashboardGestorModel.graficoRecursos()
        .then(function (resultado) {
            console.log("Dados recebidos do model:", resultado); // Log para ver o que o model retorna
            if (resultado && resultado.length > 0) {
                const remoto = resultado.find(r => r.TipoTrabalho === 'Trabalho Remoto') || {};
                const presencial = resultado.find(r => r.TipoTrabalho === 'Trabalho Presencial') || {};

                res.status(200).json({
                    remoto: {
                        tempoFamilia: parseFloat(remoto.MediaTempoFamilia) || 0,
                        tempoTrabalho: parseFloat(remoto.MediaTempoTrabalho) || 0,
                    },
                    presencial: {
                        tempoFamilia: parseFloat(presencial.MediaTempoFamilia) || 0,
                        tempoTrabalho: parseFloat(presencial.MediaTempoTrabalho) || 0,
                    }
                });
            } else {
                console.log("Nenhum resultado encontrado");
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro no controller:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

module.exports = {
    porcentagemProdutivoPresencial,
    porcentagemProdutivoRemoto,
    porcentagemProdutivoRemotoMulher,
    porcentagemProdutivoPresencialMulher,
    mediaProdutividadeEquipe,
    pioresAspectosPorOcupacao,
    graficoRecursos
};