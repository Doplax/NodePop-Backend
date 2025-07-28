import express from "express";
const router = express.Router();
import {
  contactMe,
} from "@/controllers/emailController";
//const { validateCreate } = require("../validators/users");

// POST
router.post("/contactMe", contactMe);

export default router;