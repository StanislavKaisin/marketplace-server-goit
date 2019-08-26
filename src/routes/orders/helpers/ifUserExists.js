const fs = require("fs");
const path = require("path");

/*
const operationTypes = require("./operationTypes");

const ifUserFolderExists = userId => {
  '../../db/users/'
  let result = {};
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "db",
      "users",
      'all-users.json'
    );
    if (!fs.existsSync(filePath)) {
      result.action = operationTypes.FOLDER_IS_NOT_EXISTS;
      result.payload = "Folder is not exist";
      return result;
    }
    result.action = operationTypes.SUCCESS;
    result.payload = filePath;
    return result;
  } catch (error) {
    result.action = operationTypes.ERROR;
    result.payload = error;
    return result;
  }
}

*/
module.exports = ifUserFolderExists;
