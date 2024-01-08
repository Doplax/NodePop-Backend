class AgentesController {
    new(req, res, next){
        req.render('agentes-new')
    }
}

module.exports = AgentesController