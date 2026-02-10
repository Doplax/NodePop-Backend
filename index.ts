import dotenv from "dotenv";

import express from "express";
import http from "http";
import cors from "cors";
import path from "node:path";
import logger from "morgan";
import cookieParser from "cookie-parser"; // Carga las variables de entorno

// Configuraciones internas
import { indexRouter } from "./index.route";
import i18n from "./src/shared/config/i18nConfigure";

// Conexión a la DB
import connectDB from "./src/shared/config/mongo";
dotenv.config();

// Conectar DB
connectDB();

const app = express();

/**
 * Configuración del Puerto
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Middlewares
app.use(
  cors({
    // Array con los dominios permitidos
    origin: [
      "http://localhost:5173", // Tu frontend en desarrollo (Vite)
      "http://localhost:3000", // Tu frontend en desarrollo (alternativo)
      "https://node-pop-frontend.vercel.app", // Tu frontend en producción (Vercel)
    ],
    credentials: true, // Permite cookies y headers de autorización
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(express.json()); // Allows to receive information in JSON
app.use(express.urlencoded({ extended: false })); // Parse request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serves static files
app.use(logger("dev")); // Log requests and responses
app.use(cookieParser());
app.use((req: any, res: any, next: any) => {
  i18n.init(req, res);
  next();
});

// View Engine Setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routes
app.use(indexRouter);

/**
 * Creación y arranque del Servidor HTTP
 */
const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Funciones Helper
 */

function normalizePort(val: string): string | number | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // named pipe
  }

  if (port >= 0) {
    return port; // port number
  }

  return false;
}

function onError(error: any): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "pipe " + addr : "port " + (addr as any)?.port;
  console.log(`Server listening on ${bind}`);
  console.log(`http://localhost:${port}/`);
}

export default app;
