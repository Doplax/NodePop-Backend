import { Router } from "express";
import LangController from "../../controller/LangController";

const router = Router();
const langController = new LangController();

router.get("/change-locale", langController.changeLocale);

export default router;
