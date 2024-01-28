const express = require("express");
const router = express.Router();
const sessionAuthMiddleware = require("../lib/sessionAuthMiddleware");
const AgentesController = require("../controller/AgentesController");

const agentesController = new AgentesController();

router.get("/agentes-new", sessionAuthMiddleware, agentesController.new);

module.exports = router;
