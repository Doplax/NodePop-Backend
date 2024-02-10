const { Router } = require("express");
const router = Router();
const {
  loginCtrl,
  registerCtrl,
  getAllUsersCtrl,
} = require("../../controllers/auth.js");
const {
  validatorRegister,
  validatorLogin,
} = require("../../validators/auth.js");

//const { validatorRegister, validatorLogin } = require("../validators/auth");

router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);

router.get("/users", getAllUsersCtrl);

module.exports = router;
