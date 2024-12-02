
var ambiente_processo = 'desenvolvimento'

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var dashboardRouter = require("./src/routes/dashboard");
var dashboardGestorRouter = require("./src/routes/dashboardGestor");
var calendarRoutes = require("./src/routes/calendar"); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashboardGestor", dashboardGestorRouter);
app.use("/api", calendarRoutes);


if (!PORTA_APP || !HOST_APP) {
    console.error("ERRO: As variáveis de ambiente APP_HOST e APP_PORT não estão definidas.");
    process.exit(1);  // Interrompe o processo em caso de erro
}

app.listen(PORTA_APP, function () {
    console.log(`
    .: http://${HOST_APP}:${PORTA_APP} :. \n\n`);
});
