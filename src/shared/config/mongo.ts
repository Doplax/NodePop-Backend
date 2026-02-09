import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/nodepop";

    await mongoose.connect(DB_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
