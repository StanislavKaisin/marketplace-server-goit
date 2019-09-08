const mongoose = require("mongoose");
const {
  DBURL
} = require("../../config/config");
const User = require("../../db/schemas/user");
const bcrypt = require('bcrypt');

const updateUser = (request, response) => {
  const updatedUserInfo = request.body;
  const idForSearch = request.params.id;
  if (updatedUserInfo.password) {
    updatedUserInfo.password = bcrypt.hashSync(updatedUserInfo.password, 10);
  }

  const sendResponse = user => {
    let responseBody = {
      status: "error",
      text: 'no such user',
      user
    }
    user ? responseBody = {
      status: "success",
      user
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
        text: 'there is no such user',
        error: error
      })
      .end();
  };

  mongoose
    .connect(DBURL, {
      useNewUrlParser: true
    })
    .then(() => {
      User.findOneAndUpdate({
            _id: idForSearch
          },
          updatedUserInfo, {
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

module.exports = updateUser;
