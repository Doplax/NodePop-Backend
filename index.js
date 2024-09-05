require("dotenv").config();

const app = require("./app.js");
const http = require("node:http");
////const debug = require("debug")("nodeapp:server");

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
const server = http.createServer(app);

server.listen(PORT);

