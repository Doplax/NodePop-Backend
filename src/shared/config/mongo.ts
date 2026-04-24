import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/nodepop";

    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.warn("⚠️ Starting server without database connection");
  }
};

export default connectDB;
