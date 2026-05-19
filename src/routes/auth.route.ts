import { Router } from "express";
import {
  loginCtrl,
  registerCtrl,
  meCtrl,
} from "../controllers/auth.controller";
import { validatorRegister, validatorLogin } from "../validators/authValidator";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

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
 * /api/auth/me:
 *   get:
 *     summary: Devuelve la información del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actual.
 *       401:
 *         description: Token inválido o ausente.
 */
router.get("/me", authMiddleware, meCtrl);

export default router;
