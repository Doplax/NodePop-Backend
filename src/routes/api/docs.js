const express = require("express");
const router = express.Router();
const swaggerMiddleware = require("../../lib/swaggerUIMiddleware");

router.use("/docs", swaggerMiddleware);

module.exports = router;
