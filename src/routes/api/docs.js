const express = require("express");
const router = express.Router();
const swaggerMiddleware = require("../../middlewares/swaggerUIMiddleware");

router.use("/docs", swaggerMiddleware);

module.exports = router;
