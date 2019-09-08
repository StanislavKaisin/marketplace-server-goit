const mongoose = require('mongoose');
const {
  DBURL
} = require('../../config/config');

const Product = require("../../db/schemas/product");

const createProduct = (request, response) => {
  const productData = request.body;
  const productToDb = new Product(productData);

  const sendResponse = product => {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(201)
      .json({
        status: 'success',
        product
      })
      .end();
  };

  const sendError = (error) => {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(500)
      .json({
        status: 'error',
        error: error
      })
      .end();
  };

  mongoose.connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      productToDb
        .save()
        .then(sendResponse)
        .catch(sendError);
    })
    .catch((error) => {
      response.removeHeader('Transfer-Encoding');
      response.removeHeader('X-Powered-By');
      response
        .status(500)
        .json({
          status: 'error',
          text: 'Database connection error',
          error: error
        })
        .end();
      console.error('Database connection error', error)
    })
};

module.exports = createProduct;
