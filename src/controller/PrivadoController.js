const Usuario = require("../models/Usuario");
const createError = require("http-errors");
const Agente = require("../models/Agente");
class PrivadoController {
  async index(req, res, next) {
    try {
      // Obtener el ID del usuario de la sesión
      const usuarioId = req.session.usuarioLogado;

      // Buscar el usuario en la BD
      const usuario = await Usuario.findById(usuarioId);

      if (!usuario) {
        next(createError(500, "Usuario no encontrado"));
        return;
      }

      // Cargar lista de agentes que percenecen al usuario
      const agentes = await Agente.find({ owner: usuarioId });

      res.render("privado", {
        email: usuario.email,
        agentes,
      });
    } catch (error) {}
  }
}

module.exports = PrivadoController;
