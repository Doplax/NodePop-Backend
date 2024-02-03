import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import Product from "../../models/Product"; // Asegúrate de que Product tenga un archivo de declaración de tipos o esté exportado como un módulo TypeScript.

const router = express.Router();
const PATH_ROUTES: string = __dirname;

const removeFileExtension = (fileName: string): string => {
  return fileName.split(".").shift() || "";
};

// Asegúrate de que el path sea correcto dependiendo de la estructura de tu proyecto
fs.readdirSync(PATH_ROUTES).forEach((file: string) => {
  const name: string = removeFileExtension(file);
  if (name === "index") {
    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const products = await Product.find({});
        res.locals.products = products;
        res.render("index");
      } catch (err) {
        next(err);
      }
    });
  } else {
    console.log(`Cargando índice de la ruta: /${name} - /${file}`);
    router.use(`/${name}`, require(path.join(PATH_ROUTES, file))); // Considera cambiar este require por una importación dinámica si es posible.
  }
});

export default router;
