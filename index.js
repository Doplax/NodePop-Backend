require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const logger = require("morgan");
const http = require("node:http");
const indexRouter = require("./src/routes/index.js");
const i18n = require("./src/config/i18nConfigure.js");
const cookieParser = require("cookie-parser");

require("./src/config/mongo.js")(); // Connects to the database

const app = express();
const PORT = process.env.PORT || 4000;

app.set("port", PORT);

// Middlewares
app.use(cors()); // Avoid CORS errors
app.use(express.json()); // Allows to receive information in JSON
app.use(express.urlencoded({ extended: false })); // Parse request bodies with content type application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "/public"))); // Serves static files in the public folder
app.use(logger("dev")); // Log requests and responses on the console in development mode.
app.use(cookieParser());
app.use(i18n.init);
app.use("/public", express.static(path.join(__dirname, "public"))); // Set public folder

// View Engine Setup
app.set("views", path.join(__dirname, "./src/views/"));
app.set("view engine", "ejs");

// Routes
app.use(indexRouter);

// Create and start server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
