const startServer = require("./src/server");
const connectToDB = require("./src/modules/db/connectToDB");

const {
  port,
  DBURL
} = require("./src/config/config");

startServer(port);
connectToDB(DBURL);
