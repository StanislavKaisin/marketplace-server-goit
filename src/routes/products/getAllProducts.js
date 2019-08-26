const fs = require("fs");
const path = require("path");

const productsRoute = (request, response) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "db",
      "products",
      "all-products.json"
    );
    const products = fs.readFileSync(filePath, "utf8", (error, data) => {
      if (error) {
        response.removeHeader('Transfer-Encoding');
        response.removeHeader('X-Powered-By');
        response
          .status(500)
          .format({
            'application/json': function () {
              response.send(JSON.stringify(error))
            },
          })
          .end();
      }
      return data;
    });

    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(200)
      .format({
        'application/json': function () {
          response.send(products)
        },
      })
      .end();
  } catch (error) {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(500)
      .format({
        'application/json': function () {
          response.send(JSON.stringify(error))
        },
      })
      .end();
  }
};

module.exports = productsRoute;
