const express = require("express");
const path = require("node:path");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../../config/swaggerConfig.js"); // Dinamic Gerenation
// const swaggerDocs = require("./src/swagger-output.json"); // Static document

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve Swagger Docs
router.use("/swagger-ui", express.static(path.join(require.resolve("swagger-ui-dist"), "..")));

module.exports = router;
