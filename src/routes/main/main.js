const mainRoute = (request, response) => {
  response.removeHeader('Transfer-Encoding');
  response.removeHeader('X-Powered-By');
  response
    .status(200)
    .format({
      'html': function () {
        response.send(
          "<h1>Hello from server</h1>"
        )
      },
    })
    .end();
};

module.exports = mainRoute;
