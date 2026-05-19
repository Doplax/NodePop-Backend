import { body } from "express-validator";
import validateResults from "../shared/utils/handleValidators";
import { PRODUCT_TAGS } from "../models/Product.model";

const allowedTags = [...PRODUCT_TAGS];

const productValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The name field is required")
    .isString()
    .withMessage("The name must be a string")
    .isLength({ max: 120 })
    .withMessage("The name must be 120 characters or fewer"),
  body("price")
    .isFloat({ min: 0, max: 99999 })
    .withMessage("The price must be a number between 0 and 99999")
    .toFloat(),
  body("isForSale")
    .optional()
    .isBoolean()
    .withMessage("The isForSale field must be a boolean")
    .toBoolean(),
  body("tags")
    .optional()
    .customSanitizer((value: unknown): string[] => {
      if (Array.isArray(value)) return value as string[];
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return [];
    })
    .isArray({ min: 1 })
    .withMessage("The tags must be a non-empty array")
    .custom((tags: string[]) =>
      tags.every((tag) => allowedTags.includes(tag as never)),
    )
    .withMessage(`Invalid tag value. Valid values: ${allowedTags.join(", ")}`),
  validateResults,
];

export default productValidationRules;
