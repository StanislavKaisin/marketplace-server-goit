const pageNotFound = (request, response) => {
  response.removeHeader('Transfer-Encoding');
  response.removeHeader('X-Powered-By');
  response
    .status(404)
    .format({
      'html': function () {
        response.send(
          "<h1>Page not found</h1>"
        )
      },
    })
    .end();
};

module.exports = pageNotFound;
