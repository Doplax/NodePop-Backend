import { Response } from "express";

const handleHttpError = (
  res: Response,
  message = "Something happens...",
  code = 403
): void => {
  res.status(code).send(message);
};

export default handleHttpError;