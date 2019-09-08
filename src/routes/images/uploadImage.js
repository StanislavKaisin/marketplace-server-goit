const multer = require('multer');
const path = require('path');

const images = require("./images");
const uploadImage = function (request, response) {

  const TEMPORARY_IMAGE_FOLDER = path.join(__dirname);
  const upload = multer({
      dest: TEMPORARY_IMAGE_FOLDER
    })
    .single('file');

  upload(request, response, function (error) {
    if (!error) images(request, response);
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
  })
}

module.exports = uploadImage;
