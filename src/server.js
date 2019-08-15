// const http = require("http");
const https = require("https");
const router = require("./routes/router");
const url = require("url");
const fs = require("fs");
const path = require("path");

const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url);

  let func = null;

  switch (true) {
    case parsedUrl.search &&
    parsedUrl.query.includes("ids") &&
    parsedUrl.pathname.includes("products"):
      func = router.getProductWithIds;
      break;

    case parsedUrl.search && parsedUrl.query.includes("category"):
      func = router.getProductWithCategory;
      break;

    case parsedUrl.pathname.includes("products") &&
    parsedUrl.pathname.length > 10:
      func = router.getOneProductWithId;
      break;

    case parsedUrl.pathname === "/products":
      func = router[parsedUrl.pathname];
      break;

    case parsedUrl.pathname === "/signup":
      func = router[parsedUrl.pathname];
      break;

    case parsedUrl.pathname.length > 1:
      func = router.pageNotFound;
      break;

    default:
      func = router.default;
      break;
  }

  func(request, response);
};

const httpsServerOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "/config/https/key-20190813-225534.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "/config/https/cert-20190813-225534.crt")
  )
};
const httpsServer = https.createServer(httpsServerOptions, requestHandler);

const startServer = port => {
  httpsServer.listen(port, error => {
    if (error) {
      console.log(`Error at: ${error}`);
    }
    console.log(`Server running at ${port} port`);
  });
};
module.exports = startServer;
