const mongoose = require("mongoose");
const {
  DBURL
} = require("../../../config/config");
const Product = require("../../../db/schemas/product");

const takeIdsFromQuery = require("./helpers/takeIdsFromQuery");

const searchProductsForIds = (request, response) => {
  const ids = takeIdsFromQuery(request);

  const sendResponse = products => {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(200)
      .json({
        status: "success",
        products
      })
      .end();
  };

  const sendError = error => {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(400)
      .json({
        status: 'error',
        text: 'there is no such products',
        error: error
      })
      .end();
  };

  mongoose
    .connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      Product.find({
          id: ids
        })
        .then(sendResponse)
        .catch(sendError);
    })
    .catch(error => {
      response.removeHeader("Transfer-Encoding");
      response.removeHeader("X-Powered-By");
      response
        .status(500)
        .json({
          status: 'error',
          text: 'Database connection error',
          error: error
        })
        .end();
      console.error("Database connection error", error);
    });
};

module.exports = searchProductsForIds;
