var calendarModel = require("../models/calendarModel");

async function buscarEventos(req, res) {
  try {
    const eventos = await calendarModel.buscarEventos();
    res.json(eventos); // Retorna os eventos para o frontend
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
}

async function criarEvento(req, res) {
  const { date, title } = req.body;

  if (!date || !title) {
    return res.status(400).json({ error: "Data e título são necessários" });
  }

  const evento = { date, title };

  try {
    await calendarModel.criarEvento(evento);
    res.status(201).json({ message: "Evento criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ error: "Erro ao criar evento" });
  }
}

// Controller: calendarController.js
async function excluirEvento(req, res) {
  const { date } = req.params; // Captura a data da URL

  if (!date) {
    return res.status(400).json({ error: "Data do evento é necessária" });
  }

  try {
    await calendarModel.excluirEvento(date); // Chama o método da model
    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
    res.status(500).json({ error: "Erro ao excluir evento" });
  }
}

module.exports = {
  buscarEventos,
  criarEvento,
  excluirEvento
};
