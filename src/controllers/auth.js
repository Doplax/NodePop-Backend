//const { matchedData } = require("express-validator");
const { User } = require("../models/index.js");
const handleHttpError = require("../utils/errorHandler");

const registerCtrl = async (req, res) => {
  try {
    console.log("registro");
    res(req.body);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginCtrl = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    res.send(user);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
