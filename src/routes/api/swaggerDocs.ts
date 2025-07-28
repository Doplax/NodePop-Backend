import express from "express";
import path from "node:path";
const router = express.Router();

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "@/config/swaggerConfig"; // Dinamic Gerenation
// const swaggerDocs = require("./src/swagger-output.json"); // Static document

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve Swagger Docs
router.use("/swagger-ui", express.static(path.join(require.resolve("swagger-ui-dist"), "..")));

export default router;