import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface User {
  _id: string;
  [key: string]: any;
}

export const tokenSign = async (user: User): Promise<string> => {
  const sign = jwt.sign(
    {
      _id: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};

/**
 * Debes pasar el token de sesion JWT
 * @param tokenJwt - The JWT token to verify
 * @returns The decoded token or null if invalid
 */
export const verifyToken = async (tokenJwt: string): Promise<any> => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};