const childProcess = require('child_process');
const fs = require('fs');
const util = require('util');

const timestamp = `blaaaaaaaa`; // TODO

const log = (content) => {
  console.log(content);
  fs.appendFileSync(`./${timestamp}.log`, content);
}

module.exports = {
  logFilename: `./${timestamp}.log`,
  execute: command => {
    log(new Error().stack.split(`at `)[2].trim()); //trace
    log(command);

    const options = { stdio: 'pipe' };
    const result = childProcess.execSync(command, options).toString();
    log(result);

    return result;
  },
  sleep: util.promisify(setTimeout),
  getObjectFromJsonFile: (path) => JSON.parse(fs.readFileSync(path).toString()),
  writeObjectToFile: (path, object) => fs.writeFileSync(path, JSON.stringify(object)),
};

// TODO: jsdoc notation for intellisense
Object.defineProperty(String.prototype, "parseJson", {
  value: function () { return JSON.parse(this); },
});