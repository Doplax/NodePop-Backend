const express = require("express");
const router = express.Router();
const LoginController = require("./../controller/LoginController")

const loginController = new LoginController()

router.get('/', loginController.logout)

module.exports = router;
