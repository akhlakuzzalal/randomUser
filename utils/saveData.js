const fs = require("fs");

const saveDataOnFile = (data) => {
  fs.writeFileSync("./public/fakeUserData.json", JSON.stringify(data));
};

module.exports = saveDataOnFile;
