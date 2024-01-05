const Usuario = require('../models/Usuario')
var createError = require('http-errors')
class PrivadoController {
    async index(req, res, next) {

        try {
        // Obtener el ID del usuario de la sesión
        const usuarioId = req.session.usuarioLogado;

        // Buscar el usuario en la BD
        const usuario = await Usuario.findById(usuarioId);

        if (!usuario){
            next(createError(500, 'Usuario no encontrado'))
            return;
        }

        res.render('privado', {email: usuario.email})

    } catch (error) {
            
    }
    }
}

module.exports = PrivadoController;