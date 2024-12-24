const Product = require("../models/Product.js");
const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/errorHandler.js");
const { deleteOldPhotoAndThumbnail } = require("../utils/photoManager.js"); // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

const getItems = async (req, res) => {
  try {
    const data = await Product.find({});
    console.log(data);
    res.send({ data });
  } catch (error) {
    return handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
      return handleHttpError(res, "ERROR_GET_ITEM: Product not Found", 404);
    }
    res.send(data);
  } catch (error) {
    return handleHttpError(res, "ERROR_GET_ITEM");
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

    const data = await Product.create({ ...body, photo: file.filename });
    console.log({ data });
    await data.createThumbnail();

    res.send({ data });
  } catch (error) {
    return handleHttpError(res, `ERROR_CREATE_ITEMS: ${error.message}`);
  }
};
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);
    const file = req.file;

    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      return handleHttpError(res, "ERROR_UPDATE_ITEM: Product not Found", 404);
    }

    if (file) {
      await deleteOldPhotoAndThumbnail(currentProduct.photo);
    }

    const update = file ? { ...body, photo: file.filename } : body;
    const data = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    if (file) {
      await data.createThumbnail();
    }

    res.send({ data });
  } catch (error) {
    return handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);

    if (!data) {
      return handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
    }
    await deleteOldPhotoAndThumbnail(data.photo);

    res.send({ data });
  } catch (error) {
    return handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
