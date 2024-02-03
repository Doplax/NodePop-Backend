import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { i18n } from "./lib/i18nConfigure";
//const basicAuthMiddleware = require('./lib/basicAuthMiddleware'); // Para control de inicio de sesión

import { getSessionConfig } from "./middlewares/sessionConfig";
import { securityHeaders } from "./middlewares/securityHeaders";
import { catch404, handleErrors } from "./middlewares/errorHandlers";
import indexRouter from "./routes/index";

require("./lib/connectMongoose");

const app = express();

//const { Session } = require("inspector");

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.locals.title = "NodeApp";

// MIDDLEWARE
app.use(cors()); // Habilita Cors
app.use(express.static(path.join(__dirname, "../public"))); // Sirve los ficheros estáticos  en la carpeta públic
app.use(securityHeaders); // Configura encabezados de seguridad
app.use(logger("dev")); // Regista solicitudes y respuestas en la consola en modo desarrollo.
app.use(express.json()); // Analizar solicitudes con formato JSON.
app.use(express.urlencoded({ extended: true })); // Analizar cuerpos de solicitud con tipo de contenido application/x-www-form-urlencoded
app.use(cookieParser()); // Analizar cookies en las solicitudes
app.use(i18n.init); // Internacionalización (i18n).
app.use(getSessionConfig); // Configuración de sesiones.

// Hacemos que el objeto session esté disponible al renderizar las vistas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.session = req.session;
  next();
});

// ROUTES
app.use(indexRouter);

// catch 404 and forward to error handler
app.use(catch404);

// error handler
app.use(handleErrors);

export default app;
