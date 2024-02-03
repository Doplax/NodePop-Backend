import express from "express";

import createProductRoutes from "./web/create-product";
import featuresRoutes from "./web/features";
import privateRoutes from "./web/private";

import authRoutes from "./api/auth";
import changeLocaleRoutes from "./api/change-locale";
import docsRoutes from "./api/docs";
import productsRoutes from "./api/products";
import usersRoutes from "./api/users";

const router = express.Router();

//WEB
router.use("/web/create-product", createProductRoutes);
router.use("/web/features", featuresRoutes);
router.use("/web/private", privateRoutes);

//ROUTES
router.use("/api/auth", authRoutes);
router.use("/api/change-locale", changeLocaleRoutes);
router.use("/api/docs", docsRoutes);
router.use("/api/products", productsRoutes);
router.use("/api/users", usersRoutes);

export default router;
