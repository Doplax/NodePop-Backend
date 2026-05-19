import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/nodepop";

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
