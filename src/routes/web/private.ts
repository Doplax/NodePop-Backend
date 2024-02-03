import { Router } from "express";
import PrivadoController from "../../controller/PrivadoController";
import sessionAuthMiddleware from "../../middlewares/sessionAuthMiddleware";

const router = Router();
const privadoController = new PrivadoController();

router.get("/", sessionAuthMiddleware, privadoController.index);

export default router;
