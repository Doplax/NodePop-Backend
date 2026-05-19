import { Response } from "express";

export interface ErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

const handleHttpError = (
  res: Response,
  message: string,
  code: number = 500,
  details?: unknown,
): void => {
  const payload: ErrorResponse = { success: false, error: message };
  if (details !== undefined) payload.details = details;
  res.status(code).json(payload);
};

export default handleHttpError;
