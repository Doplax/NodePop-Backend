/* eslint-disable @typescript-eslint/no-unused-vars */
import "express-session";
import "express-serve-static-core";

declare module "express-session" {
  // Extensión de la interfaz Session para añadir la propiedad usuarioLogado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Session {
    isLoggedUser?: boolean; // Puedes cambiar el tipo según tus necesidades
  }
}

declare module "express-serve-static-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Request {
    session: import("express-session").Session & {
      isLoggedUser?: boolean;
    };
  }
}
