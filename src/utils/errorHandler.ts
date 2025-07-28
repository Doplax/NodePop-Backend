import { Response } from "express";

const handleHttpError = (res: Response, message: string = "Something happens...", code: number = 403): void => {
  res.status(code);
  res.send(message);
};

export default handleHttpError;