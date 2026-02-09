import { Response } from "express";

const handleHttpError = (
  res: Response,
  message: string,
  code: number = 500,
): void => {
  res.status(code).json({
    success: false,
    error: message,
  });
};

export default handleHttpError;
