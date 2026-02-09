import validateResults from "../shared/utils/handleValidators";

const { body } = require("express-validator");

const productValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The name field is required")
    .isString()
    .withMessage("The name must be a string"),
  body("price")
    .isNumeric()
    .withMessage("The price must be a number")
    .custom((value: any) => value >= 0)
    .withMessage("The minimum price value is 0")
    .custom((value: any) => value <= 99999)
    .withMessage("The maximum price value is 99999"),
  body("isForSale")
    .optional()
    .isBoolean()
    .withMessage("The isForSale field must be a boolean"),
  body("photo").optional().isString().withMessage("The photo must be a string"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("The tags must be an array")
    .custom((tags: any) =>
      tags.every((tag: string) =>
        ["Laptop", "Tablet", "Smartphone", "Desktop"].includes(tag),
      ),
    )
    .withMessage(
      "Invalid tag value. Valid values are: Laptop, Tablet, Smartphone, Desktop",
    ),
  (req: any, res: any, next: any) => {
    return validateResults(req, res, next);
  },
];

export default productValidationRules;
