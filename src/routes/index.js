// Import middlewares and modules
const authMiddleware = require("../middlewares/authMiddleware.js");
const { Router } = require("express");
const router = Router();

// Import routes and controllers
const authRoutes = require("./api/auth.js");
const productRoutes = require("./api/products.js");
const changeLocale = require("./web/changeLocale.js");
const { getImage } = require("../controllers/imagesController.js");

// VIEW ROUTES
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/change-locale", changeLocale);

// API ROUTES
// - Unprotected routes
router.use("/api/auth", authRoutes);
router.get("/api/images/:id", getImage);

// - Protected routes
router.use("/api/products", authMiddleware, productRoutes);

module.exports = router;
