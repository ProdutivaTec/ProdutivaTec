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



module.exports = {
    genero,
    totalColaboradores,
    calcularPorcentagemRespostas,
    colaboradoresInsatisfeitos,
    colaboradoresSatisfeitos,
    recomendacao
};