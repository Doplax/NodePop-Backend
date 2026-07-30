import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  // Se aceptan ambos nombres: el .env de este proyecto define MONGODB_URI,
  // mientras que el código sólo leía DB_URI, así que la variable configurada
  // se ignoraba y siempre se caía al valor por defecto.
  // El host por defecto es 127.0.0.1 y no localhost: en Windows localhost
  // resuelve primero a ::1 y Mongo escucha sólo en IPv4, lo que provoca un
  // ECONNREFUSED que luego aparece como un 500 opaco en el login.
  const DB_URI =
    process.env.DB_URI ||
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/nodepop";

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  try {
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    console.warn("Starting server without database connection (dev only)");
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};

const gracefulShutdown = async (signal: NodeJS.Signals): Promise<void> => {
  console.log(`Received ${signal}, closing MongoDB connection...`);
  await disconnectDB();
  process.exit(0);
};

process.once("SIGINT", gracefulShutdown);
process.once("SIGTERM", gracefulShutdown);

export default connectDB;
