const childProcess = require('child_process');
const fs = require('fs');
const util = require('util');
const state = require('./state');

const exec = util.promisify(childProcess.exec);
const appendToFile = util.promisify(fs.appendFile);

const timestamp = `blaaaaaaaa`; // TODO
const logFile = `./${timestamp}.log`;

module.exports = {
    execute: async (command) => {
      console.log(command);
      await appendToFile(logFile, command);

      const result = await exec(command);
      const resultContent = result.stdout || result.stderr;
      console.log(resultContent);
      await appendToFile(logFile, resultContent);

      if(result.stderr) throw new Error(result.stderr);

      return resultContent;
    },
    sleep: util.promisify(setTimeout),
    writeFile: util.promisify(fs.writeFile),
    readFile: util.promisify(fs.readFile),
    deleteFile: util.promisify(fs.unlink),
    getObjectFromJsonFile: async (path) => JSON.parse(await this.readFile(path).toString()),
    writeObjectToFile: async (path, object) => await this.writeFile(path, JSON.stringify(object)),
};