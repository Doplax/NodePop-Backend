const express = require("express");
const router = express.Router();
const {
  contactMe,
} = require("../../controllers/emailController");
//const { validateCreate } = require("../validators/users");

// POST
router.post("/contactMe", contactMe);

module.exports = router;
