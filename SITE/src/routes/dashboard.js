var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/genero", function (req, res) {
    dashboardController.genero(req, res);
});
router.post("/totalColaboradores", function (req, res) {
    dashboardController.totalColaboradores(req, res);
});
router.post("/porcentagemRespostas", function (req, res) {
    dashboardController.calcularPorcentagemRespostas(req, res);
});
router.post("/satisfeitos", function (req, res) {
    dashboardController.colaboradoresSatisfeitos(req, res);
});

router.post("/insatisfeitos", function (req, res) {
    dashboardController.colaboradoresInsatisfeitos(req, res);
});

router.post("/recomendacao", function (req, res) {
    dashboardController.recomendacao(req, res);
});

router.post("/produtividade/equipes", function (req, res) {
    dashboardController.produtividadePorEquipe(req, res);
});
router.post("/satisfacao/equipes", function (req, res) {
    dashboardController.satisfacaoPorEquipe(req, res); 
});
router.post("/comparacao/equipes", function (req, res) {
    dashboardController.comparacaoProdutividadeSatisfacao(req, res);
});
router.get("/pioresAspectos/:tipo", function (req, res) {
    dashboardController.pioresAspectos(req, res);
});

router.post("/nomeEmpresa", function (req, res) {
    dashboardController.nomeEmpresa(req, res);
});

module.exports = router;