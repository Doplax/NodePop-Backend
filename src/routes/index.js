// Import middlewares and modules
const authMiddleware = require("../middlewares/authMiddleware.js");
const { Router } = require("express");
const router = Router();

// Import routes and controllers
const authRoutes = require("./api/auth.js");
const productRoutes = require("./api/products.js");
const imagesRoutes = require("./api/images.js");
const tracksRoutes = require("./api/tracks.js");
const changeLocale = require("./web/changeLocale.js");

// VIEW ROUTES
router.get("/", (req, res, next) => {
  //res.render("index");
  res.redirect("/docs");
});

router.use("/change-locale", changeLocale);

// API ROUTES
// - Unprotected routes
router.use("/api/auth", authRoutes);
router.use("/api/images", imagesRoutes);
router.use("/api/tracks", tracksRoutes);

// - Protected routes
router.use("/api/products", authMiddleware, productRoutes);

module.exports = router;
