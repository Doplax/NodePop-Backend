const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const i18n = require("./lib/i18nConfigure");
//const basicAuthMiddleware = require('./lib/basicAuthMiddleware'); // Para control de inicio de sesión
require("./lib/connectMongoose");

const sessionConfig = require("./middlewares/sessionConfig");
const securityHeaders = require("./middlewares/securityHeaders");
const { catch404, handleErrors } = require("./middlewares/errorHandlers");

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
app.use(sessionConfig); // Configuración de sesiones.

// Hacemos que el objeto session esté disponible al renderizar las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ROUTES
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(catch404);

// error handler
app.use(handleErrors);

module.exports = app;
