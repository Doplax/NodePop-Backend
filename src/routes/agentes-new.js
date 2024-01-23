const express = require('express');
const router = express.Router();

const AgentesController = require('../controller/AgentesController')

const agentesController = AgentesController()


router.get('/agentes-new', sessionAuthMiddleware, agentesController.new)


module.exports = router;
