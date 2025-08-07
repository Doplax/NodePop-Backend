import express from "express";
import changeLocale from "@/modules/Locales/changeLocaleController";

const router = express.Router();
router.get("/:locale", changeLocale);

export default router;