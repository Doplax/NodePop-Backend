// Import middlewares and modules
import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "@/modules/Auth/auth.middleware";

const router = Router();

// Import routes and controllers
import authRoutes from "@/modules/Auth/auth.route";
import emailRoutes from "@/modules/Email/email.route";
import productRoutes from "@/modules/Wallapop/products.route";
import imagesRoutes from "@/modules/Wallapop/images.route";
import swaggerRoutes from "@/modules/Swagger/swagger-docs.route";

import tracksRoutes from "@/modules/Tracks/tracks.route";
import changeLocale from "@/modules/Locales/changeLocale.route";

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

export { router as indexRouter };
