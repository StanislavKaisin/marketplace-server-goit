const fs = require("fs");
const path = require("path");

const operationTypes = require("../operationTypes");

'../../db/'

const takeProductsFromDb = () => {
  let result = {};
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
        result.actionProducts = operationTypes.ERROR;
        result.payload = error;
        return result;
      }
      return data;
    });
    products = JSON.parse(products);
    result.action = operationTypes.SUCCESS;
    result.payload = products;
    return result;
  } catch (error) {
    result.action = operationTypes.ERROR;
    result.payload = error;
    return result;
  }
}

module.exports = takeProductsFromDb;
