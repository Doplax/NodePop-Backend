const express = require("express");
const cors = require("cors");
const path = require("node:path");
const logger = require("morgan");
const indexRouter = require("./src/routes/index.js");
const i18n = require("./src/config/i18nConfigure.js");
const cookieParser = require("cookie-parser");

const swaggerDocs = require("./src/config/swaggerConfig.js"); // Swagger Config
//const swaggerDocs = require("./src/scripts/swagger-output.json");

const swaggerUi = require("swagger-ui-express");

require("./src/config/mongo.js")(); // Connects to the database

const app = express();

// Serve Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "./src/views/"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(cors()); // Avoid CORS errors
app.use(express.json()); // Allows to receive information in JSON
app.use(express.static(path.join(__dirname, "/public"))); // Serves static files in the public folder
app.use(express.urlencoded({ extended: false })); // Parse request bodies with content type application/x-www-form-urlencoded
app.use(logger("dev")); // Log requests and responses on the console in development mode.
app.use(cookieParser());
app.use(i18n.init);

// ROUTES
app.use(indexRouter);

module.exports = app;
