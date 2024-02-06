//const { matchedData } = require("express-validator");
const { User } = require("../models/index.js");
const handleHttpError = require("../utils/errorHandler");

const registerCtrl = async (req, res) => {
  try {
    console.log("registro");
    const { email, password } = req.body;
    const response = await User.create({ email, password });

    res.send(response);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginCtrl = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    res.send(user);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
