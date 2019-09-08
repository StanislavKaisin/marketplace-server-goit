const mongoose = require('mongoose');
const {
  DBURL
} = require('../../config/config');

const Order = require("../../db/schemas/order");
const User = require("../../db/schemas/user");

const createOrder = (request, response) => {
  const orderData = request.body;
  const orderToDb = new Order(orderData);
  debugger;
  const sendResponse = order => {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(201)
      .json({
        status: 'success',
        order
      })
      .end();
    addOrderToUser(order);
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

  const addOrderToUser = (order) => {
    const userId = orderData.creator;
    const orderId = order.id;

    User.findOneAndUpdate({
        _id: userId
      }, {
        $addToSet: {
          orders: orderId
        }
      }, {
        useFindAndModify: false
      }, (error) => {
        if (error) console.log(error);
      })
      .then(console.log(`updated user with id ${userId}`))
  }


  mongoose.connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      orderToDb
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

module.exports = createOrder;
