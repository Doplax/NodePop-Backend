// Importamos los tipos existentes para extenderlos
import "express-session";

declare module "express-session" {
  // Extensión de la interfaz Session para añadir la propiedad usuarioLogado
  interface Session {
    isLoggedUser?: boolean; // Puedes cambiar el tipo según tus necesidades
  }
}
