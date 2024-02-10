const authMiddleware = require("../middlewares/authMiddleware.js");
const { Router } = require("express");
const router = Router();
const authRoutes = require("./api/auth.js");
const productRoutes = require("./api/products.js");

// API routes
router.use("/api/auth", authRoutes);

// Protected routes
router.use("/api/products", authMiddleware, productRoutes);
//router.use("/api/upload", );

// ViEWS routes
router.get("/", (req, res, next) => {
  res.send("hola");
});
//router.use("/change-locale", );

module.exports = router;
