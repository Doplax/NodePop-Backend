const bcryptjs = require("bcryptjs");

const encrypt = async (passwordPlain) => {
  const salt = 10;
  const hash = await bcryptjs.hash(passwordPlain, salt);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
