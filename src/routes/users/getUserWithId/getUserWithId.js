const fs = require("fs");
const path = require("path");


const getUserWithId = (request, response) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../../",
      "db",
      "users",
      "all-users.json"
    );
    let users = fs.readFileSync(filePath, "utf8", (error, data) => {
      if (error) {
        response.removeHeader('Transfer-Encoding');
        response.removeHeader('X-Powered-By');
        response
          .status(500)
          .format({
            'application/json': function () {
              response.send(JSON.stringify(error))
            },
          })
          .end();
      }
      return data;
    });
    users = JSON.parse(users);
    const idForSearch = request.params.id;
    const userToResponse = users.find(user => user.id === idForSearch);

    const resultBody = {};
    if (userToResponse) {
      status = 'success'
    } else {
      status = 'not found'
    };
    resultBody.status = status;
    resultBody.user = userToResponse || {};

    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(200)
      .format({
        'application/json': function () {
          response.send(resultBody)
        },
      })
      .end();

  } catch (error) {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(500)
      .format({
        'application/json': function () {
          response.send(JSON.stringify(error))
        },
      })
      .end();
  }
};

module.exports = getUserWithId;
