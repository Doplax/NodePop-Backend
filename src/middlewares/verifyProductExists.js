const Product = require("../models/Product.js");
const handleHttpError = require("../utils/errorHandler");

const verifyProductExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
    }
    next();
  } catch (error) {
    return handleHttpError(res, `ERROR VERYFING PRODUCT: ${error.message}`, 500);
  }
};

module.exports = verifyProductExists;
