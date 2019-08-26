const fs = require("fs");
const path = require("path");
const shortid = require('shortid');


const saveUser = (request, response) => {
  let users;
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "db",
      "users",
      "all-users.json"
    );
    users = fs.readFileSync(filePath, "utf8", (error, data) => {
      if (error) {
        response.removeHeader('Transfer-Encoding');
        response.removeHeader('X-Powered-By');
        response.writeHead(500, {
          "Content-Type": "application/json"
        });
        response.write(JSON.stringify(error));
        response.end();
      }
      return data;
    });

    const userId = shortid.generate();
    user = {
      id: userId,
      ...request.body
    }
    users = JSON.parse(users);
    users = [...users, user];

    fs.writeFile(filePath, JSON.stringify(users), (error) => {
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
        return;
      }
    });

    const resultBody = {};
    resultBody.status = 'success';
    resultBody.user = user;

    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(201)
      .format({
        'application/json': function () {
          response.send(resultBody)
        },
      })
      .end();

  } catch (err) {
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

}

module.exports = saveUser;
