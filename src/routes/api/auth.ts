import { Router } from "express";
const router = Router();
import {
  loginCtrl,
  registerCtrl,
  getAllUsersCtrl,
} from "@/controllers/authController";
import {
  validatorRegister,
  validatorLogin,
} from "@/validators/authValidator";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuarios
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Error de validación.
 */
router.post("/register", validatorRegister, registerCtrl);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de usuarios
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/login", validatorLogin, loginCtrl);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Retorna una lista de usuarios.
 */
router.get("/users", getAllUsersCtrl);

export default router;