// Import middlewares and modules
import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "@/modules/auth/auth.middleware";

const router = Router();

// Import routes and controllers
import authRoutes from "@/modules/auth/auth.route";
import emailRoutes from "@/modules/email/email.route";
import productRoutes from "@/modules/wallapop/products.route";
import imagesRoutes from "@/modules/wallapop/images.route";
import swaggerRoutes from "@/modules/swagger/swagger-docs.route";

import tracksRoutes from "@/modules/tracks/tracks.route";
import changeLocale from "@/modules/locales/changeLocale.route";

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
