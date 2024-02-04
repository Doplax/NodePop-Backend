const express = require("express");
const cors = require("cors");
const path = require("node:path");
const indexRouter = require("./src/routes/index.js"); // Asegúrate de que la ruta coincida con la ubicación de tu archivo de rutas

const app = express();

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "/src/views/"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(cors()); // Avoid CORS errors
app.use(express.json()); // Permite recibir información en JSON
app.use(express.static(path.join(__dirname, "..", "/public"))); // Sirve los ficheros estáticos  en la carpeta públic
app.use(express.urlencoded({ extended: true })); // Analizar cuerpos de solicitud con tipo de contenido application/x-www-form-urlencoded

// ROUTES
app.use(indexRouter);

module.exports = app;
