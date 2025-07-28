import bcryptjs from "bcryptjs";

export const encrypt = async (passwordPlain: string): Promise<string> => {
  const salt = 10;
  const hash = await bcryptjs.hash(passwordPlain, salt);
  return hash;
};

export const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};