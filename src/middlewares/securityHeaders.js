// Establece el encabezado de respuesta "X-Content-Type-Options" en "nosniff".
// Esto ayuda a proteger tu aplicación web contra ataques de sniffing de tipo MIME.

module.exports = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
};
