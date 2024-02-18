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

//GET
router.get("/", getItems);
router.get("/:id", getItem);

//POST
router.post(
  "/",
  uploadMiddleware.uploadSingle,
  productValidationRules,
  createItem
);

//PUT
router.put(
  "/:id",
  verifyProductExists,
  uploadMiddleware.uploadSingle,
  productValidationRules,
  updateItem
);

//DELETE
router.delete("/:id", deleteItem);

module.exports = router;
