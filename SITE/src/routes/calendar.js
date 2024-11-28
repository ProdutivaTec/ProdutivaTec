var express = require("express");
var router = express.Router();
var calendarController = require("../controllers/calendarController");

// Rota para buscar eventos
router.get("/events", calendarController.buscarEventos);

// Rota para criar um evento
router.post("/events", calendarController.criarEvento);

// Rota para excluir um evento
router.delete("/events/:date", calendarController.excluirEvento);

module.exports = router;
