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

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", productValidationRules, createItem);
router.put("/:id", productValidationRules, updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
