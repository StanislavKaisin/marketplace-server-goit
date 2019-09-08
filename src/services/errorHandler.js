const errorHandler = (error, request, response, next) => {
  console.error(error.stack);
  response.removeHeader('Transfer-Encoding');
  response.removeHeader('X-Powered-By');
  response
    .status(500)
    .format({
      'application/json': function () {
        response.send(error)
      },
    })
    .end();
}

module.exports = errorHandler;
