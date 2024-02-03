import { Router } from "express";
import UsersController from "../../controller/UsersController";

const router = Router();
const usersController = new UsersController();

router.get("/", usersController.new);

export default router;
