const childProcess = require('child_process');
const fs = require('fs');
const util = require('util');

const timestamp = `blaaaaaaaa`; // TODO
const logFile = `./${timestamp}.log`;

module.exports = {
  logFilename: logFile,
  execute: (command) => {
    console.log(command);
    fs.appendFileSync(logFile, command);

    const result = childProcess.execSync(command, `utf8`);
    const resultContent = result.stdout || result.stderr;
    console.log(resultContent);
    fs.appendFileSync(logFile, resultContent);

    if (result.stderr) throw new Error(result.stderr);

    return resultContent;
  },
  sleep: util.promisify(setTimeout),
  getObjectFromJsonFile: (path) => JSON.parse(fs.readFileSync(path).toString()),
  writeObjectToFile: (path, object) => fs.writeFileSync(path, JSON.stringify(object)),
};