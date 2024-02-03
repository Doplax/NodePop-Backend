import { Router } from "express";
import upload from "../../lib/uploadConfigure";
import productController from "../../controller/ProductController";

const router = Router();

// GET para listar productos
router.get("/", productController.getAllProducts);
router.post("/", upload.single("file"), productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
