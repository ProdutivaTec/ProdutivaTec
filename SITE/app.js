// Define o ambiente: 'producao' ou 'desenvolvimento'
var ambiente_processo = process.env.AMBIENTE_PROCESSO || 'desenvolvimento';

// Define o caminho para o arquivo .env dependendo do ambiente
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

// Importa dependências necessárias
var express = require("express");
var cors = require("cors");
var path = require("path");

// Obtém as variáveis de ambiente do arquivo .env
var PORTA_APP = process.env.APP_PORT || 3000;  // Usa 3000 se não definido
var HOST_APP = process.env.APP_HOST || 'localhost';  // Usa 'localhost' se não definido

var app = express();

// Configura rotas
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

// Middleware para permitir JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware de CORS
app.use(cors());

// Definir as rotas da aplicação
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

// Verifica se as variáveis de ambiente foram definidas corretamente
if (!PORTA_APP || !HOST_APP) {
    console.error("ERRO: As variáveis de ambiente APP_HOST e APP_PORT não estão definidas.");
    process.exit(1);  // Interrompe o processo em caso de erro
}

// Inicia o servidor
app.listen(PORTA_APP, function () {
    console.log(`Servidor rodando em: http://${HOST_APP}:${PORTA_APP}`);
});
