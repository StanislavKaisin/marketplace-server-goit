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
        response.writeHead(500, {
          "Content-Type": "application/json"
        });
        response.write(JSON.stringify(error));
        response.end();
      }
      return data;
    });

    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(products);
    response.end();

  } catch (error) {
    response.writeHead(500, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(error));
    response.end();
  }
};

module.exports = productsRoute;
