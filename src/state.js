const fs = require("fs");

function save(filePath, content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(filePath, contentString);
}

function load(filePath) {
  const fileBuffer = fs.readFileSync(filePath, "utf-8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}

module.exports = {
  save,
  load,
};
