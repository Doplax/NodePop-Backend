import validateResults from "../shared/utils/handleValidators";

const { check } = require("express-validator");

export const validatorRegister = [
  check("email") // Define a validation chain for the "email" field.
    .trim() // Removes whitespace from both ends of the string.
    .isEmail() // Checks if the input is a valid email address.
    .withMessage("The email field must be a valid email address") // Custom error message if the email is not valid.
    .normalizeEmail(), // Canonicalizes the email address.
  check("password") // Define a validation chain for the "password" field.
    .trim() // Removes whitespace from both ends of the string.
    .isLength({ min: 4 }) // Checks if the password is at least 6 characters long.
    .withMessage("The password must be at least 4 characters long"),
  (req: any, res: any, next: any) => {
    return validateResults(req, res, next);
  }, // Custom error message if the password is too short.     // Custom error message if the password is not considered "strong".
];

export const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req: any, res: any, next: any) => {
    return validateResults(req, res, next);
  },
];
