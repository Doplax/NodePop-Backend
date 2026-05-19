import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "24h";

if (!JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET environment variable is required in production.",
    );
  }
  console.warn(
    "⚠️ JWT_SECRET is not set. Using an insecure development fallback. " +
      "Set JWT_SECRET in your .env file before deploying.",
  );
}

const SECRET = JWT_SECRET || "insecure-dev-only-secret";

export interface AuthTokenPayload extends JwtPayload {
  _id: string;
  email: string;
}

export const tokenSign = async (user: IUser): Promise<string> => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
    },
    SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
};

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, SECRET);
  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }
  return decoded as AuthTokenPayload;
};
