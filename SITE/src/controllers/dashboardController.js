var dashboardModel = require("../models/dashboardModel");

function genero(req, res) {
    dashboardModel.genero()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const dadosGenero = {
                    quantidade_homens: 0,
                    quantidade_mulheres: 0,
                };

                resultado.forEach(item => {
                    if (item.genero === 'Homem') {
                        dadosGenero.quantidade_homens = item.quantidade;
                    } else if (item.genero === 'Mulher') {
                        dadosGenero.quantidade_mulheres = item.quantidade;
                    }
                });

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

module.exports = {
    genero,
};