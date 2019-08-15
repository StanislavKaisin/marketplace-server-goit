const startServer = require("./src/server");

const {
  port
} = require("./src/config/config");

startServer(port);
