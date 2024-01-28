const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const productController = require("../../controller/productController");

// GET para listar productos

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
