// Import middlewares and modules
import { Request, Response, NextFunction } from "express";
const authMiddleware = require("../middlewares/authMiddleware.js");
const { Router } = require("express");
const router = Router();

// Import routes and controllers
const authRoutes = require("./api/auth.js");
const emailRoutes = require("./api/email.js");
const productRoutes = require("./api/products.js");
const imagesRoutes = require("./api/images.js");
const swaggerRoutes = require("./api/swaggerDocs.js");

const tracksRoutes = require("./api/tracks.js");
const changeLocale = require("./web/changeLocale.js");

// VIEW ROUTES
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  //res.render("index");
  res.redirect("/api/swaggerDocs/swagger-ui");
});

router.use("/change-locale", changeLocale);

// API ROUTES
// - Unprotected routes
router.use("/api/auth", authRoutes);
router.use("/api/email", emailRoutes);
router.use("/api/images", imagesRoutes);
router.use("/api/swaggerDocs", swaggerRoutes);
router.use("/api/tracks", tracksRoutes);

// - Protected routes
router.use("/api/products", authMiddleware, productRoutes);

export {router as indexRouter};
