import express from "express";
import changeLocale from "@/modules/locales/changeLocaleController";

const router = express.Router();
router.get("/:locale", changeLocale);

export default router;