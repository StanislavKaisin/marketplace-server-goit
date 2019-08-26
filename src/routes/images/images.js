const fs = require('fs');
const path = require('path');

const images = (request, response) => {
  if (!request.file) {
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(500)
      .format({
        'application/json': function () {
          response.send('ERROR INVALID FILE TYPE')
        },
      })
      .end();
    return
  };
  const fileForRead = request.file.path;
  const fileForWrite = path.join(__dirname,
    "../../",
    "db",
    "products",
    `${request.body.id}.jpg`);
  const readFile = fs.createReadStream(fileForRead);
  const writeFile = fs.createWriteStream(fileForWrite);
  try {
    readFile.pipe(writeFile).once('close', () => {
      fs.unlink(fileForRead, () => {
        response.removeHeader('Transfer-Encoding');
        response.removeHeader('X-Powered-By');
        response
          .status(201)
          .format({
            'text': function () {
              response.send(fileForWrite)
            },
          })
          .end();
      })
    })
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
}

module.exports = images;
