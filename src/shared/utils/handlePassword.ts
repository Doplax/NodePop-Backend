import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encrypt = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

export const compare = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
