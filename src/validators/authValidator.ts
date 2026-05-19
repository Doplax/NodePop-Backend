import { body } from "express-validator";
import validateResults from "../shared/utils/handleValidators";

const PASSWORD_MIN = 4;
const PASSWORD_MAX = 100;

export const validatorRegister = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("The email field must be a valid email address")
    .normalizeEmail(),
  body("password")
    .isString()
    .withMessage("The password must be a string")
    .isLength({ min: PASSWORD_MIN, max: PASSWORD_MAX })
    .withMessage(
      `The password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters long`,
    ),
  validateResults,
];

export const validatorLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("The email field must be a valid email address")
    .normalizeEmail(),
  body("password")
    .isString()
    .withMessage("The password must be a string")
    .notEmpty()
    .withMessage("The password is required"),
  validateResults,
];
