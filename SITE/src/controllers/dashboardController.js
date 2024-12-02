var dashboardModel = require("../models/dashboardModel");

function genero(req, res) {
    dashboardModel.genero()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const totalColaboradores = resultado.reduce((acc, item) => acc + item.quantidade, 0);
                const dadosGenero = {
                    quantidade_homens: 0,
                    quantidade_mulheres: 0,
                    porcentagem_homens: 0,
                    porcentagem_mulheres: 0,
                };

                resultado.forEach(item => {
                    if (item.genero === 'Homem') {
                        dadosGenero.quantidade_homens = item.quantidade;
                    } else if (item.genero === 'Mulher') {
                        dadosGenero.quantidade_mulheres = item.quantidade;
                    }
                });

                dadosGenero.porcentagem_homens = ((dadosGenero.quantidade_homens / totalColaboradores) * 100);
                dadosGenero.porcentagem_mulheres = ((dadosGenero.quantidade_mulheres / totalColaboradores) * 100);

                res.status(200).json(dadosGenero);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados de gênero:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function totalColaboradores(req, res) {
    dashboardModel.totalColaboradores()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ quantidade_colaboradores: resultado[0].quantidade_colaboradores });
            } else {
                res.status(204).send("Nenhum colaborador encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar a quantidade de colaboradores:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function calcularPorcentagemRespostas(req, res) {
    Promise.all([dashboardModel.totalColaboradores(), dashboardModel.totalRespostasPesquisa()])
        .then(function (resultados) {
            const totalColaboradores = resultados[0][0].quantidade_colaboradores;
            const totalRespostas = resultados[1][0].quantidade_respostas;

            if (totalColaboradores > 0) {
                const porcentagem = (totalRespostas / totalColaboradores) * 100;
                res.status(200).json({ porcentagem_respostas: porcentagem });
            } else {
                res.status(204).send("Nenhum colaborador encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao calcular a porcentagem de respostas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function colaboradoresSatisfeitos(req, res) {
    Promise.all([dashboardModel.colaboradoresSatisfeitos(), dashboardModel.totalColaboradores()])
        .then(function (resultados) {
            const totalColaboradores = resultados[1][0].quantidade_colaboradores;
            const totalSatisfeitos = resultados[0][0].quantidade_satisfeitos;

            if (totalColaboradores > 0) {
                const porcentagemSatisfeitos = ((totalSatisfeitos / totalColaboradores) * 100).toFixed(2);
                res.status(200).json({ porcentagem_satisfeitos: porcentagemSatisfeitos });
            } else {
                res.status(204).send("Nenhum colaborador encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao calcular a porcentagem de satisfeitos:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function colaboradoresInsatisfeitos(req, res) {
    Promise.all([dashboardModel.colaboradoresInsatisfeitos(), dashboardModel.totalColaboradores()])
        .then(function (resultados) {
            const totalColaboradores = resultados[1][0].quantidade_colaboradores;
            const totalInsatisfeitos = resultados[0][0].quantidade_insatisfeitos;

            if (totalColaboradores > 0) {
                const porcentagemInsatisfeitos = ((totalInsatisfeitos / totalColaboradores) * 100).toFixed(2);
                res.status(200).json({ porcentagem_insatisfeitos: porcentagemInsatisfeitos });
            } else {
                res.status(204).send("Nenhum colaborador encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao calcular a porcentagem de insatisfeitos:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function recomendacao(req, res) {
    dashboardModel.recomendacao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const { recomendaria, total } = resultado[0];
                const porcentagemRecomendaria = total > 0 ? ((recomendaria / total) * 100).toFixed(0) : 0;

                res.status(200).json({
                    recomendaria: recomendaria,
                    porcentagem: porcentagemRecomendaria
                });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados de recomendação:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function produtividadePorEquipe(req, res) {
    dashboardModel.produtividadePorEquipe()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const equipes = [...new Set(resultado.map(item => item.equipe))]; 

                const produtividadeEquipes = equipes.map((equipe) => {
                    const produtividadeEquipe = resultado.filter((item) => item.equipe === equipe)
                        .map((item) => ({
                            equipe: equipe,
                            categoria_produtividade: item.categoria_produtividade,
                            quantidade: item.quantidade
                        }));
                    return produtividadeEquipe;
                });

                res.status(200).json(produtividadeEquipes.flat());
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados de produtividade por equipe:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoRecursos(req, res) {
    console.log("Recebendo requisição para '/graficoRecursos'");
    dashboardModel.graficoRecursos()
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

function satisfacaoPorEquipe(req, res) {
    dashboardModel.satisfacaoPorEquipe()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const equipes = [...new Set(resultado.map(item => item.equipe))];

                const satisfacaoEquipes = equipes.map((equipe) => {
                    const satisfacaoEquipe = resultado.filter((item) => item.equipe === equipe)
                        .map((item) => ({
                            equipe: equipe,
                            categoria_satisfacao: item.categoria_satisfacao,
                            quantidade: item.quantidade
                        }));
                    return satisfacaoEquipe;
                });

                res.status(200).json(satisfacaoEquipes.flat());
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados de satisfação por equipe:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function comparacaoProdutividadeSatisfacao(req, res) {
    Promise.all([
        dashboardModel.produtividadePorEquipe(),
        dashboardModel.satisfacaoPorEquipe()
    ])
    .then(([produtividadeResult, satisfacaoResult]) => {
        if (produtividadeResult.length === 0 || satisfacaoResult.length === 0) {
            res.status(204).send("Nenhum dado encontrado!");
            return;
        }

        const comparacao = [];

        const equipes = [...new Set([
            ...produtividadeResult.map(item => item.equipe),
            ...satisfacaoResult.map(item => item.equipe)
        ])];

        equipes.forEach(equipe => {
            const produtividade = produtividadeResult.find(item => item.equipe === equipe)?.quantidade || 0;
            const satisfacao = satisfacaoResult.find(item => item.equipe === equipe)?.quantidade || 0;

            comparacao.push({
                equipe,
                produtividade,
                satisfacao
            });
        });

        res.status(200).json(comparacao);
    })
    .catch(erro => {
        console.error("Erro ao buscar dados de comparação:", erro.sqlMessage || erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}
function pioresAspectosRemoto(req, res) {
    dashboardModel.pioresAspectosRemoto()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const aspectos = resultado.map(item => ({
                    aspecto: item.aspecto,
                    quantidade: item.quantidade
                }));
                res.status(200).json(aspectos);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar piores aspectos do trabalho remoto:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function pioresAspectos(req, res) {
    const tipo = req.params.tipo; 
    dashboardModel.pioresAspectos(tipo)
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
module.exports = {
    genero,
    totalColaboradores,
    calcularPorcentagemRespostas,
    colaboradoresInsatisfeitos,
    colaboradoresSatisfeitos,
    recomendacao,
    produtividadePorEquipe,
    satisfacaoPorEquipe,
    comparacaoProdutividadeSatisfacao,
    pioresAspectos,
    graficoRecursos
};