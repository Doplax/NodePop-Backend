const { Router } = require("express");
const router = Router();
const { loginCtrl, registerCtrl } = require("../../controllers/auth.js");
//const { validatorRegister, validatorLogin } = require("../validators/auth");

router.post("/register", registerCtrl);

router.post("/login", loginCtrl);

module.exports = router;
