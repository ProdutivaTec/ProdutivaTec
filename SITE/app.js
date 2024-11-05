var ambiente_processo = 'producao'

var caminho_env = ambiente_processo = '.env';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT 
var HOST_APP = process.env.APP_HOST 

var app = express();


var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

if (!PORTA_APP || !HOST_APP) {
    console.error("ERRO: As variáveis de ambiente APP_HOST e APP_PORT não estão definidas.");
    process.exit(1);  // Interrompe o processo em caso de erro
}

app.listen(PORTA_APP, function () {
    console.log(`
    .: http://${HOST_APP}:${PORTA_APP} :. \n\n`);
});
