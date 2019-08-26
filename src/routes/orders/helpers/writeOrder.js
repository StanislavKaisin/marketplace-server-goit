const fs = require("fs");

const operationTypes = require("../operationTypes");

const writeOrder = (pathToSaveOrder, resultBody) => {
  return new Promise((resolve, reject) => {
    let result = {};
    fs.writeFile(pathToSaveOrder, JSON.stringify(resultBody), (err) => {
      if (err) {
        result.actionProducts = operationTypes.ERROR;
        result.payload = err;
        reject(result);
        return;
      };
      result.action = operationTypes.SUCCESS;
      result.payload = resultBody;
      resolve(result);
      return;
    });
  })
}

module.exports = writeOrder;
