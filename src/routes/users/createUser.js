const mongoose = require('mongoose');
const {
  DBURL
} = require('../../config/config');

const User = require("../../db/schemas/user");
const bcrypt = require("bcrypt");

const saveUser = (request, response) => {
  const user = request.body;
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const userData = {
    ...user,
    password: hashedPassword
  };
  const userToDb = new User(userData);

  const sendResponse = user => {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(201)
      .json({
        status: 'success',
        user
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
  }

  mongoose.connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      userToDb
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

module.exports = saveUser;
