const { Router } = require("express");
const router = Router();
const {
  loginCtrl,
  registerCtrl,
  getAllUsersCtrl,
} = require("../../controllers/authController.js");
const {
  validatorRegister,
  validatorLogin,
} = require("../../validators/authValidator.js");

//const { validatorRegister, validatorLogin } = require("../validators/auth");

router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);

router.get("/users", getAllUsersCtrl);

module.exports = router;
