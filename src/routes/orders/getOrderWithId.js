const mongoose = require("mongoose");
const { DBURL } = require("../../config/config");
const Order = require("../../db/schemas/order");

const getOrderWithId = (request, response) => {
  const idForSearch = request.params.id;

  const sendResponse = order => {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(200)
      .json({
        status: "success",
        order
      })
      .end();
  };

  const sendError = error => {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(400)
      .json({
        status: "error",
        text: "there is no such order",
        error: error
      })
      .end();
  };

  mongoose
    .connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      Order.find({
        _id: idForSearch
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
          status: "error",
          text: "Database connection error",
          error: error
        })
        .end();
      console.error("Database connection error", error);
    });
};

module.exports = getOrderWithId;
