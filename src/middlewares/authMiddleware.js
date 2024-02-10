const handleHttpError = require("../utils/errorHandler.js");
const { verifyToken } = require("../utils/handleJwt.js");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "ERROR_AUTHENTICATION: Missing authorization header.", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "ERROR_TOKEN: The token is invalid or has expired.", 401);
      return;
    }

    const user = await User.findOne({ _id: dataToken._id });
    if (!user) {
      handleHttpError(res, "ERROR_USER: No user associated with the provided token was found.", 404);
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "ERROR_SESSION: Issue processing the session, possible server error or malformed token.", 401);
  }
};

module.exports = authMiddleware;
