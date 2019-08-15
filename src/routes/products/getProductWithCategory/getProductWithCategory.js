const fs = require("fs");
const path = require("path");

const takeCategoryFromQuery = require("./takeCategoryFromQuery");
const takeProductsToResponseWithCategory = require("./takeProductsToResponseWithCategory");

const searchProductsForIds = (request, response) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../../",
      "db",
      "products",
      "all-products.json"
    );
    let products = fs.readFileSync(filePath, "utf8", (error, data) => {
      if (error) {
        response.writeHead(500, {
          "Content-Type": "application/json"
        });
        response.write(JSON.stringify(error));
        response.end();
      }
      return data;
    });
    products = JSON.parse(products);

    const category = takeCategoryFromQuery(request);

    let productsToResponse = [];
    productsToResponse = takeProductsToResponseWithCategory(category, products);

    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    const resultBody = {};
    if (productsToResponse.length) {
      status = "success";
    } else {
      status = "no products";
    }
    resultBody.status = status;
    resultBody.products = productsToResponse;
    response.write(JSON.stringify(resultBody));
    response.end();
  } catch (error) {
    response.writeHead(500, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(error));
    response.end();
  }
};

module.exports = searchProductsForIds;
