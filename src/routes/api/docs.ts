// Asumiendo que el archivo está en src/routes/apiDocs.js o similar

import { Router, Request, Response, NextFunction } from "express";
//import { swaggerMiddleware } from "../../middlewares/swaggerUIMiddleware"; // Ajusta la ruta según sea necesario

const router = Router();

//console.log(swaggerMiddleware);
router.use("/docs", (req: Request, res: Response, next: NextFunction) => {
  console.log("docs");
});

export default router;
