require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const app = require("./app.js");
const http = require("node:http");
// const debug = require("debug")("nodeapp:server"); // Comentado, se puede usar para depuración si es necesario

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
