const fs = require('fs');
const yaml = require('js-yaml');

module.exports = {
  writeJson: (data, path) => fs.writeFileSync(path, JSON.stringify(data)),
  getJson: (path) => JSON.parse(fs.readFileSync(path).toString()),
  writeYaml: (data, path) => fs.writeFileSync(path, yaml.dump(data)),
  getYaml: (path) => yaml.load(fs.readFileSync(path).toString())
};
