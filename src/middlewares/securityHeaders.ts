// Establece el encabezado de respuesta "X-Content-Type-Options" en "nosniff".
// Esto ayuda a proteger tu aplicación web contra ataques de sniffing de tipo MIME.

import { Request, Response, NextFunction } from "express";

export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
};
