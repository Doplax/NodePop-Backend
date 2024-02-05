const { Router } = require("express");
const router = Router();
const authRoutes = require("./api/auth.js");
//const { validatorRegister, validatorLogin } = require("../validators/auth");

// API routes
//router.use("/api/products", );
router.use("/api/auth/", authRoutes);
//router.use("/api/upload", );

// ViEWS routes
router.get("/", (req, res, next) => {
  res.send("hola");
});
//router.use("/change-locale", );

module.exports = router;
