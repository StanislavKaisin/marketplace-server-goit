const fs = require("fs");
const path = require("path");

const takeIdsFromQuery = require("./takeIdsFromQuery");
const takeProductsToResponse = require("../helpers/takeProductsToResponse");

const searchProductsForIds = (request, response) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../../",
      "db",
      "products",
      "all-products.json"
    );
    debugger;
    let products = fs.readFileSync(filePath, "utf8", (error, data) => {
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
    products = JSON.parse(products);

    const ids = takeIdsFromQuery(request);

    let productsToResponse = [];
    productsToResponse = takeProductsToResponse(ids, products);

    const resultBody = {};
    if (productsToResponse.length) {
      status = 'success'
    } else {
      status = 'no products'
    };
    resultBody.status = status;
    resultBody.products = productsToResponse;

    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(200)
      .format({
        'application/json': function () {
          response.send(resultBody)
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

module.exports = searchProductsForIds;
