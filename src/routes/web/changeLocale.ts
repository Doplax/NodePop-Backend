import express from "express";
import changeLocale from "@/controllers/changeLocaleController";

const router = express.Router();
router.get("/:locale", changeLocale);

export default router;