import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import createError from "http-errors";

class PrivadoController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      // Obtener el ID del usuario de la sesión
      const usuarioId = req.session.isLoggedUser;

      // Buscar el usuario en la BD
      const usuario = await User.findById(usuarioId);

      if (!usuario) {
        next(createError(500, "Usuario no encontrado"));
        return;
      }

      // Cargar lista de agentes que pertenecen al usuario
      const agentes = await User.find({ owner: usuarioId });

      res.render("privado", {
        email: usuario.email,
        agentes,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default PrivadoController;
