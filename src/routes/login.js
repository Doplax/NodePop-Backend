const express = require("express");
const router = express.Router();
const LoginController = require("./../controller/LoginController");

const loginController = new LoginController();

router.get("/login", loginController.index);
router.post("/login", loginController.post);

module.exports = router;
