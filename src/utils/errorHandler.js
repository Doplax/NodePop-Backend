const handleHttpError = (res, message = "Something happens...", code = 403) => {
  res.status(code);
  res.send(message);
};

module.exports = handleHttpError;
