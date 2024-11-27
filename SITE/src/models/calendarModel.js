var database = require("../database/config");

function buscarEventos() {
  var instrucaoSql = 'SELECT * FROM eventos ORDER BY date;';
  return database.executar(instrucaoSql);
}

function criarEvento(evento) {
  var instrucaoSql = `
    INSERT INTO eventos (date, title) 
    VALUES ('${evento.date}', '${evento.title}');
  `;
  return database.executar(instrucaoSql);
}

function excluirEvento(date) {
  var instrucaoSql = `DELETE FROM eventos WHERE date = '${date}';`;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarEventos,
  criarEvento,
  excluirEvento
};
