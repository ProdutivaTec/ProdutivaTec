var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarFuncionarioRoot", function (req, res) {
    usuarioController.cadastrarFuncionarioRoot(req, res);
    console.log('passando pela rota');
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/enviarLeads", function (req, res) {
    usuarioController.enviarLeads(req, res);
});

router.get("/listarEmpresas", function (req, res) {
    usuarioController.listarEmpresas(req, res);
});

module.exports = router;