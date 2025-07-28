import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateResults = (req: Request, res: Response, next: NextFunction): void => {
  try {
    validationResult(req).throw();
    return next(); // Continue to controller
  } catch (err: any) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

export default validateResults;