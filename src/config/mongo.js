const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("The connection with MongoDB has been successful.");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Detener la aplicación en caso de error de conexión
  }
};

module.exports = dbConnect;
