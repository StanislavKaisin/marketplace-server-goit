const express = require("express");
const router = require("./routes/router");
const morgan = require("morgan");
const errorHandler = require("./services/errorHandler");

const app = express();

app
  .use(express.json())
  .use(morgan("dev"))
  .use("/", router)
  .use(errorHandler);

const startServer = port => {
  app.listen(port, error => {
    if (error) {
      console.log(`Error at: ${error}`);
    }
    console.log(`Server running at ${port} port`);
  });
};

module.exports = startServer;
