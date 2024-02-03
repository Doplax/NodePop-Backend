import { Router } from "express";
import LoginController from "../../controller/LoginController";

const router = Router();
const loginController = new LoginController();

router.get("/", loginController.index); //  [] Redirect to private

router.get("/users", loginController.listAllUsers); // [X] Get all users

router.get("/login", loginController.listAllUsers); // [] Return JWT

router.get("/logout", loginController.logout); // [] Return JWT

// TODO: Crear usuario
//router.post("/", loginController.post);

router.get("/", loginController.logout);

export default router;
