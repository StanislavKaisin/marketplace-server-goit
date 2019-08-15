saveFileResultTypes = require('./saveFileResultTypes');
saveUser = require('./saveUser');

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    let saveResult = null;
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      const post = JSON.parse(body);
      saveResult = saveUser(post);
      if (!saveResult || saveResult.result === saveFileResultTypes.ERROR) {
        response.writeHead(500, {
          "Content-Type": "application/json"
        });
        response.write(
          (saveResult && JSON.stringify(saveResult.data)) || "Error in files module"
        );
        response.end();
        return;
      }
      if (saveResult && saveResult.result === saveFileResultTypes.SUCCESS) {
        response.writeHead(201, {
          "Content-Type": "application/json"
        });
        const resultBody = {
          status: "success",
          user: post
        };
        response.write(JSON.stringify(resultBody));
        response.end();
      }
    });
  }
};

module.exports = signUpRoute;
