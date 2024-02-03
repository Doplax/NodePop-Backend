const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const basicAuthMiddleware = require("./lib/basicAuthMiddleware");
const swaggerMiddleware = require("./lib/swaggerUIMiddleware");

require("./lib/connectMongoose");

//const Agente = require('./models/Agente');
//const agentes = Agente.find().then((results) => {
//  console.log(results);
//}).catch((err) => console.log(err));

//var indexRouter = ;
//var usersRouter = ;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "NodeApp";

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use('/pdfs', express.static(path.join(__dirname, 'public')));

//app.use((req, res, next) => {
//  console.log('Ha llegado una petición a', req.url);
//  next();
//})

/**
 * Rutas del API
 */
app.use("/api-doc", swaggerMiddleware);
app.use("/api/agentes", require("./routes/api/agentes"));

/**
 * Rutas del website
 */
// Podemos usar basicAuthMiddleware para proteger las rutas
app.use("/", basicAuthMiddleware, require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validación
  if (err.array) {
    const errorInfo = err.array[0];
    console.log(errorInfo);
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422;
  }

  // Si lo que ha fallado es una perición al api, responder con un JSON
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return; // Para que no se siga ejecutando el código de abajo
  }

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
