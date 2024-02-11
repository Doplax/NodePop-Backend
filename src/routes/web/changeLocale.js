const express = require("express");
const changeLocale = require("../../controllers/changeLocaleController.js");

const router = express.Router();
router.get("/:locale", changeLocale);

module.exports = router;
