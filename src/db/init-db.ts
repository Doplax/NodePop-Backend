import "dotenv/config";
import readline from "node:readline";
import { mongoose } from "../lib/connectMongoose";
import models from "../models";

const { User } = models as unknown as {
  User?: any;
};

const connection = mongoose.connection;

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  await new Promise((resolve) => connection.once("open", resolve));

  const borrar = await pregunta(
    "Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?",
  );
  if (!borrar) {
    process.exit();
  }

  await initUsuarios();

  connection.close();
}

async function initUsuarios() {
  if (!User) {
    throw new Error("El modelo User no está disponible");
  }

  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  const inserted = await User.insertMany([
    {
      email: "admin@example.com",
      password: await User.hashPassword("1234"),
    },
    {
      email: "usuario1@example.com",
      password: await User.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}

function pregunta(texto: string): Promise<boolean> {
  return new Promise((resolve) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
      ifc.close();
      resolve(respuesta.toLowerCase() === "si");
    });
  });
}
