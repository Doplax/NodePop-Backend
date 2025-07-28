const { handleHttpError } = require("../utils/errorHandler");
const { tracksList } = require("../../public/music/main-music/tracksList");
const userModel = require("../models/User");

const getItems = async (req, res) => {
  try {
    res.send({ data: tracksList });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItem = (req, res) => {

};

const createItem = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const resDetail = await userModel.create({
      name,
      age,
      email,
    });
    res.send({ data: resDetail });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const updateItem = (req, res) => {};

const deleteItem = (req, res) => {};

module.exports = { getItem, getItems, deleteItem, createItem, updateItem };
