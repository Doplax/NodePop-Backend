const express = require("express");
const cors = require("cors");
const path = require("node:path");
const indexRouter = require("./src/routes/index.js");
require("./src/config/mongo.js")(); // Connects to the database

const app = express();

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "/src/views/"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(cors()); // Avoid CORS errors
app.use(express.json()); // Allows to receive information in JSON
app.use(express.static(path.join(__dirname, "..", "/public"))); // Serves static files in the public folder
app.use(express.urlencoded({ extended: true })); // Parse request bodies with content type application/x-www-form-urlencoded

// ROUTES
app.use(indexRouter);

module.exports = app;
