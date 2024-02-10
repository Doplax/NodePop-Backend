//const { matchedData } = require("express-validator");
const { User } = require("../models/index.js");
const handleHttpError = require("../utils/errorHandler.js");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword.js");
const { tokenSign } = require("../utils/handleJwt.js");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);

    const userExists = await User.findOne({ email: req.email });
    if (userExists) {
      return handleHttpError(res, "ERROR_REGISTER_USER_ALREADY_EXISTS", 409);
    }

    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await User.create(body);
    dataUser.set("password", undefined, { strict: false });

    console.log("dataUser", dataUser);
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await User.findOne({ email: req.email });

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const token = await tokenSign(user);

    res.send({ token });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ALL_USERS");
  }
};

module.exports = { registerCtrl, loginCtrl, getAllUsersCtrl };
