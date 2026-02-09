import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

class LoginController {
  public index(req: Request, res: Response, next: NextFunction) {
    res.locals.error = "";
    res.locals.email = "";
    console.log("login");
    res.render("login");
  }

  public async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }); // Buscar User en la base de datos
      console.log(user, password);
      res.send(user);
      // Si no lo encuentra o la contraseña no coincide --> error
      // if (!User || !(await User.comparePassword(password))) {
      //   res.locals.error = req.__("Invalid credentials");
      //   res.locals.email = email;
      //   res.render("login");
      //   return;
      // }

      // Si existe y la contraseña coincide --> zona privada
      // Apuntar en la sesión del User que está autenticado
      // req.session.isLoggedUser = User._id;

      // Enviar email al User
      // User.sendEmail('Bienvenido', 'Bienvenido a NodeApp');
      // User.sendEmailRabbitMQ("Bienvenido", "Bienvenido a NodeApp");
      // const result = await User.sendEmailCote('Bienvenido', 'Bienvenido a NodeApp');
      // console.log(result);

      // res.redirect("/privado");
    } catch (err) {
      next(err);
    }
  }

  // ¿Cómo funciona?
  public logout(req: Request, res: Response, next: NextFunction) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }

  public async postJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Buscar el User en la base de datos
      const user = (await User.findOne({ email })) as any;

      // Si no lo encuentra o la contraseña no coincide --> error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      // Si existe y la contraseña coincide --> devolver un JWT
      const tokenJWT = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "2h",
        },
      );
      res.json({ jwt: tokenJWT });
    } catch (err) {
      next(err);
    }
  }

  public async listAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find(); // Buscar todos los Users
      res.send(users); // Enviar la lista de Users como respuesta
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
