const fs = require("fs");
const path = require("path");

const operationTypes = require("../operationTypes");

const ifFolderExists = folderPath => {
  let result = {};
  try {
    //   const folderPath = path.join(
    //     __dirname,
    //     "../../",
    //     "db",
    //     "users",
    //     folderName
    //   );
    if (!fs.existsSync(folderPath)) {
      result.actionFolder = operationTypes.FOLDER_IS_NOT_EXISTS;
      result.payloadFolder = folderPath;
      return result;
    }
    result.actionFolder = operationTypes.SUCCESS;
    result.payloadFolder = folderPath;
    return result;
  } catch (error) {
    result.actionFolder = operationTypes.ERROR;
    result.payloadFolder = error;
    return result;
  }
}

module.exports = ifFolderExists;
