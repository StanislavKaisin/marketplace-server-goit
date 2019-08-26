const fs = require("fs");

const operationTypes = require("../operationTypes");

const createFolder = (path) => {
  let result = {};
  try {
    fs.mkdirSync(path);
    result.actionCreateFolder = operationTypes.SUCCESS;
    result.payloadCreateFolder = path;
    return result;
  } catch (error) {
    result.actionCreateFolder = operationTypes.ERROR;
    result.payloadCreateFolder = error;
    return result;
  }
};

module.exports = createFolder;
