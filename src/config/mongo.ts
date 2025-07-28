import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI as string);
    console.log("The connection with MongoDB has been successful.");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Detener la aplicación en caso de error de conexión
  }
};

export default dbConnect;