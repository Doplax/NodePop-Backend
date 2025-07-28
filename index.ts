import "dotenv/config"; // Carga las variables de entorno desde el archivo .env
import express from "express";
import cors from "cors";
import path from "node:path";
import logger from "morgan";
import http from "node:http";
import indexRouter from "./src/routes/index";
import i18n from "./src/config/i18nConfigure";
import cookieParser from "cookie-parser";

import dbConnect from "./src/config/mongo"; // Connects to the database

dbConnect();

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

server.on("error", (err: Error) => {
  console.error("Server error:", err);
});