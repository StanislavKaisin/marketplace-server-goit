const fs = require("fs");
const path = require("path");

const saveUser = user => {
  let saveFileResult = {};
  const fileName = `${user.username}.json`;
  const userData = {
    [user.username]: user
  };
  const dirPath = path.join(__dirname, "../../", "db", "users");
  const filePath = path.join(dirPath, fileName);
  try {
    if (!fs.existsSync(dirPath)) {
      saveFileResult.result = saveFileResultTypes.ERROR;
      saveFileResult.data = "Wrong path!";
      return;
    }
    fs.writeFile(filePath, JSON.stringify(userData), function (error) {
      if (error) {
        saveFileResult.result = saveFileResultTypes.ERROR;
        saveFileResult.data = error;
      }
    });
    saveFileResult.result = saveFileResultTypes.SUCCESS;
    saveFileResult.data = userData;

  } catch (err) {
    saveFileResult.result = saveFileResultTypes.ERROR;
    saveFileResult.data = err;
  }
  return saveFileResult;
};

module.exports = saveUser;
