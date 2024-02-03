const express = require("express");
const router = express.Router();
//const sessionAuthMiddleware = require("../lib/sessionAuthMiddleware");
const UsersController = require("../../controller/UsersController");

const usersController = new UsersController();

router.get("/", usersController.new);

module.exports = router;
