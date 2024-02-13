const Product = require("../models/Product.js");
const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/errorHandler.js");

const getItems = async (req, res) => {
  try {
    const data = await Product.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
      return handleHttpError(res, "ERROR_GET_ITEM: Product not Found", 404);
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req, { locations: ["body"] });
    const file = req.file;
    if (!file) {
      return handleHttpError(
        res,
        "ERROR_CREATE_ITEMS: No images were uploaded",
        400
      );
    }

    body.photo = file.path;

    const data = await Product.create(body);
    await data.createThumbnail();

    res.send({ data });
  } catch (error) {
    handleHttpError(res, `ERROR_CREATE_ITEMS: ${error.message}`);
  }
};
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);

    if (req.file) {
      body.photo = req.file.path;
    }

    const data = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      handleHttpError(res, "ERROR_UPDATE_ITEM: Product not Found", 404);
    }

    res.send({ data });
    console.log("Product", id, "updated");
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
