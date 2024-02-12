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
      return res.status(404).send({ message: "Item not found" });
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
      return res.status(400).send({ message: "No se subió ninguna imagen." });
    }

    body.imagePath = file.path;

    const data = await Product.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);
    const data = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
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
