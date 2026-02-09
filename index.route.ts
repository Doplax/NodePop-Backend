import { Router } from "express";
import productsRouter from "./src/routes/products.route";
import imagesRouter from "./src/routes/images.route";
import authRouter from "./src/routes/auth.route";

const router = Router();

// Rutas principales
router.use("/api/products", productsRouter);
router.use("/api/images", imagesRouter);
router.use("/api/auth", authRouter);

// Ruta raíz
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to NodePop API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      images: "/api/images",
      auth: "/api/auth",
    },
  });
});

export { router as indexRouter };
export default router;
