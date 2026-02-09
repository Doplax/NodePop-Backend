import { Request, Response, NextFunction } from "express";
import handleHttpError from "../shared/utils/errorHandler";
import { verifyToken } from "../shared/utils/handleJwt";
import User from "./models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(
        res,
        "ERROR_AUTHENTICATION: Missing authorization header.",
        401,
      );
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    if (!token) {
      handleHttpError(res, "ERROR_TOKEN: No token provided.", 401);
      return;
    }

    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(
        res,
        "ERROR_TOKEN: The token is invalid or has expired.",
        401,
      );
      return;
    }

    const user = await User.findOne({ _id: dataToken._id });
    if (!user) {
      handleHttpError(
        res,
        "ERROR_USER: No user associated with the provided token was found.",
        404,
      );
      return;
    }
    req.user = dataToken;

    next();
  } catch (e) {
    handleHttpError(
      res,
      "ERROR_SESSION: Issue processing the session, possible server error or malformed token.",
      401,
    );
  }
};

export default authMiddleware;
