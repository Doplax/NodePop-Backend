import { Router } from "express";
import FeaturesController from "../../controller/FeaturesController";

const router = Router();
const featuresController = new FeaturesController();

router.get("/", featuresController.index);

export default router;
