const authMiddleware = require("../middlewares/authMiddleware.js");
const { Router } = require("express");
const router = Router();
const authRoutes = require("./api/auth.js");
const productRoutes = require("./api/products.js");
const changeLocale = require("./web/changeLocale.js");

// API routes
router.use("/api/auth", authRoutes);

// Protected routes
router.use("/api/products", authMiddleware, productRoutes);

// ViEWS routes
router.get("/", (req, res, next) => {
  res.render("index");
});
router.use("/change-locale", changeLocale);

module.exports = router;
