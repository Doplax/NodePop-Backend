const { Router } = require("express");
const router = Router();
const productValidationRules = require("../../validators/productValidator.js");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/productController.js");
const uploadMiddleware = require("../../middlewares/uploadMiddleware.js");
const verifyProductExists = require("../../middlewares/verifyProductExists");

// PRODUCTS
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", uploadMiddleware.uploadSingle, productValidationRules, createItem);
router.put("/:id", verifyProductExists, uploadMiddleware.uploadSingle, productValidationRules, updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
