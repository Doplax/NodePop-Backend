// Import middlewares and modules
import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "@/middlewares/authMiddleware";

const router = Router();

// Import routes and controllers
import authRoutes from "@/routes/api/auth";
import emailRoutes from "@/routes/api/email";
import productRoutes from "@/routes/api/products";
import imagesRoutes from "@/routes/api/images";
import swaggerRoutes from "@/routes/api/swaggerDocs";

import tracksRoutes from "@/routes/api/tracks";
import changeLocale from "@/routes/web/changeLocale";

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
