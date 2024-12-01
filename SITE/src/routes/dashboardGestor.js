var express = require("express");
var router = express.Router();

var dashboardGestorController = require("../controllers/dashboardGestorController");

router.get("/porcentagem-produtivo-presencial", function (req, res) {
    dashboardGestorController.porcentagemProdutivoPresencial(req, res);
});

router.get("/porcentagem-produtivo-remoto", function (req, res) {
    dashboardGestorController.porcentagemProdutivoRemoto(req, res);
});

router.get('/porcentagem-remoto-mulher', function (req, res) {
    dashboardGestorController.porcentagemProdutivoRemotoMulher(req, res);
});

router.get('/porcentagem-presencial-mulher', function (req, res) {
    dashboardGestorController.porcentagemProdutivoPresencialMulher(req, res);
});

router.get('/media-produtividade-equipe', function (req, res) {
    dashboardGestorController.mediaProdutividadeEquipe(req, res);
});


module.exports = router;