const express = require("express");
const router = express.Router();
const PrivadoController = require("./../controller/PrivadoController");
const sessionAuthMiddleware = require("../lib/sessionAuthMiddleware");

const privadoController = new PrivadoController();

router.get("/", sessionAuthMiddleware, privadoController.index);

module.exports = router;
