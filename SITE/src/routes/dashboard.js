var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/genero", function (req, res) {
    dashboardController.genero(req, res);
});


module.exports = router;