// ./middlewares/sessionConfig.ts
const create = require("connect-mongo");

export const getSessionConfig = () => {
  return {
    name: "nodeapp-session",
    secret: "as98987asd98ashiujkasas768tasdgyy",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
    store: create({ mongoUrl: process.env.MONGODB_URI }),
  };
};
