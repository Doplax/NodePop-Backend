import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  // Si el cliente que hace la petición no tiene en su sesión la variable isLoggedUser
  // Lo redirigimos al login porque no lo conocemos
  if (!req.session.isLoggedUser) {
    res.redirect("./login");
    return;
  }

  next(); // Para que continúe sin hacer nada
};
