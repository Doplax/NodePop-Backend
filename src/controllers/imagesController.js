const Product = require("../models/Product.js");
const handleHttpError = require("../utils/errorHandler.js");

const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.photo) {
      return res.status(404).send({ message: "Image not found" });
    }

    const { data, contentType } = product.photo;
    console.log("contentType", contentType);
    res.set("Content-Type", contentType);
    res.send(Buffer.from(data));
  } catch (error) {
    return handleHttpError(res, "ERROR_FETCHING_IMAGE", 404);
  }
};

module.exports = {
  getImage,
};
