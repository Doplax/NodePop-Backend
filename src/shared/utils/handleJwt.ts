import jwt from "jsonwebtoken";
import { IUser } from "../../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

export const tokenSign = async (user: IUser): Promise<string> => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  return token;
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
