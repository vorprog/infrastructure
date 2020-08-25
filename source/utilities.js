const childProcess = require('child_process');
const fs = require('fs');
const util = require('util');

const timestamp = `blaaaaaaaa`; // TODO

module.exports = {
  logFilename: `./${timestamp}.log`,
  execute: command => {
    console.log(command);
    fs.appendFileSync(`./${timestamp}.log`, command);

    const result = childProcess.execSync(command, `utf8`).toString();
    console.log(result);
    fs.appendFileSync(`./${timestamp}.log`, result);
    return result;
  },
  sleep: util.promisify(setTimeout),
  getObjectFromJsonFile: (path) => JSON.parse(fs.readFileSync(path).toString()),
  writeObjectToFile: (path, object) => fs.writeFileSync(path, JSON.stringify(object)),
};