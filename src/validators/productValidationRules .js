//const { check } = require("express-validator");
//const productValidationRules = [
//  check("name")
//    .trim()
//    .notEmpty()
//    .withMessage("The name field is required")
//    .isString()
//    .withMessage("The name must be a string"),
//  check("price")
//    .isNumeric()
//    .withMessage("The price must be a number")
//    .custom((value) => value >= 0)
//    .withMessage("The minimum price value is 0")
//    .custom((value) => value <= 99999)
//    .withMessage("The maximum price value is 99999"),
//  check("isForSale")
//    .optional()
//    .isBoolean()
//    .withMessage("The isForSale field must be a boolean")
//    .default(true),
//  check("photo").optional().isString().withMessage("The photo must be a string"),
//  check("tags")
//    .optional()
//    .isArray()
//    .withMessage("The tags must be an array")
//    .custom((tags) =>
//      tags.every((tag) =>
//        ["Laptop", "Tablet", "Smartphone", "Desktop"].includes(tag)
//      )
//    )
//    .withMessage(
//      "Invalid tag value. Valid values are: Laptop, Tablet, Smartphone, Desktop"
//    ),
//];
