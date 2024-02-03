import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

// Este archivo exporta dos funciones para manejar errores en una aplicación Node.js.

// La primera función "catch404" se utiliza para capturar solicitudes a rutas que no existen y generar un error 404.
export const catch404 = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404)); // Crea un error HTTP 404 y lo pasa al siguiente middleware.
};

// La segunda función "handleErrors" se utiliza para manejar otros tipos de errores en la aplicación.
export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.array) {
    // Verifica si el error tiene un arreglo (usado para manejar errores de validación).
    const errorInfo = err.array()[0]; // Obtiene la información del primer error del arreglo.
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422; // Establece el estado del error a 422 (Unprocessable Entity).
  }

  if (req.originalUrl.startsWith("/api/")) {
    // Si la solicitud es una API, envía una respuesta JSON con el mensaje de error.
    res.status(err.status || 500).json({ error: err.message });
    return;
  }

  // Configura variables locales en la respuesta para mostrar el mensaje de error y los detalles en la página de error.
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // En modo desarrollo, muestra detalles completos del error.

  // Renderiza una página de error (puede depender de la configuración de la plantilla en la aplicación).
  res.status(err.status || 500).render("error");
};
