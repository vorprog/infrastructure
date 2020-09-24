const fs = require('fs');

module.exports = {
  writeJson: (data, path) => fs.writeFileSync(path, JSON.stringify(data)),
  getJson: (path) => JSON.parse(fs.readFileSync(path).toString())
};
