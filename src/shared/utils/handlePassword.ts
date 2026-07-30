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

// Hash de un valor que nunca se usa como contraseña real. Sirve para gastar el
// mismo tiempo de CPU cuando el email no existe que cuando sí existe, de forma
// que no se pueda deducir qué cuentas están registradas midiendo la respuesta.
const DUMMY_HASH = bcrypt.hashSync(
  "placeholder-for-timing-safety",
  SALT_ROUNDS,
);

export const fakeCompare = async (password: string): Promise<void> => {
  await bcrypt.compare(password, DUMMY_HASH);
};
