const mongoose = require("mongoose");
const {
  DBURL
} = require("../../config/config");
const Product = require("../../db/schemas/product");


const updateProduct = (request, response) => {
  const updatedProductInfo = request.body;
  const idForSearch = request.params.id;

  const sendResponse = product => {
    let responseBody = {
      status: "error",
      text: 'no such product',
      product
    }
    product ? responseBody = {
      status: "success",
      product
    } : responseBody;
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(200)
      .json(responseBody)
      .end();
  };

  const sendError = error => {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(400)
      .json({
        status: 'error',
        text: 'there is no such product',
        error: error
      })
      .end();
  };

  mongoose
    .connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      Product.findOneAndUpdate({
            id: idForSearch
          },
          updatedProductInfo, {
            new: true
          }
        )
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

module.exports = updateProduct;
