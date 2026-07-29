import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import path from "node:path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { indexRouter } from "./index.route";
import i18n from "./src/shared/config/i18nConfigure";
import connectDB from "./src/shared/config/mongo";

connectDB();

const app = express();

app.set("trust proxy", 1);

/**
 * Configuración del Puerto
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Middlewares
const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://node-pop-frontend.vercel.app",
];
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean)
  .concat(defaultOrigins);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV !== "test") {
  app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}
app.use(cookieParser());
app.use((req, res, next) => {
  // i18n's @types signature is overly narrow; cast at the boundary.
  i18n.init(req as any, res as any);
  next();
});

// Health check (lightweight, no DB roundtrip)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Brute-force protection on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "TOO_MANY_AUTH_ATTEMPTS" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Routes
app.use(indexRouter);

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "NOT_FOUND", path: req.path });
});

// Centralised error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err?.message === "CORS not allowed") {
    res.status(403).json({ success: false, error: "CORS_NOT_ALLOWED" });
    return;
  }
  if (err?.name === "MulterError") {
    res.status(400).json({ success: false, error: err.code || "UPLOAD_ERROR" });
    return;
  }
  console.error(err);
  const status = typeof err?.status === "number" ? err.status : 500;
  res.status(status).json({
    success: false,
    error: err?.message || "INTERNAL_SERVER_ERROR",
  });
});

/**
 * Creación y arranque del Servidor HTTP
 */
const server = http.createServer(app);

// Vercel handles the listener itself when imported as a serverless function.
if (process.env.VERCEL !== "1") {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
}

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
