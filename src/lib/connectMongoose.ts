// Recuerda, los modulos són singelton
import mongoose from "mongoose";

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión", err);
});
mongoose.connection.once("open", () => {
  //console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect(<string>process.env.MONGODB_URI);
export { mongoose };
