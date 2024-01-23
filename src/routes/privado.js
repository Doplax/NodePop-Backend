const express = require("express");
const router = express.Router();
const PrivadoController = require('./../controller/PrivadoController')

const privadoController = new PrivadoController();


router.get('/privado', sessionAuthMiddleware, privadoController.index)


module.exports = router;
