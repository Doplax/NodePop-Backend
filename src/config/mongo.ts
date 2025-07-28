import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    console.error("❌ DB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("✅ The connection with MongoDB has been successful.");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default dbConnect;
