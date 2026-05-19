import { Request, Response, NextFunction } from "express";
import handleHttpError from "../shared/utils/errorHandler";
import { verifyToken } from "../shared/utils/handleJwt";
import User, { IUser } from "../models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: Pick<IUser, "_id" | "email">;
    }
  }
}

const extractBearerToken = (header?: string): string | null => {
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    handleHttpError(res, "ERROR_AUTHENTICATION_MISSING_TOKEN", 401);
    return;
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id).select("_id email");
    if (!user) {
      handleHttpError(res, "ERROR_USER_NOT_FOUND_FOR_TOKEN", 401);
      return;
    }
    req.user = { _id: user._id, email: user.email };
    next();
  } catch {
    handleHttpError(res, "ERROR_TOKEN_INVALID_OR_EXPIRED", 401);
  }
};

export default authMiddleware;
