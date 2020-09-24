const childProcess = require('child_process');
const fs = require('fs');
const map = require('lodash.map');

const timestamp = `blaaaaaaaa`; // TODO

const log = (content) => {
  console.log(content);
  fs.appendFileSync(`./${timestamp}.log`, content);
}

const ignorableErrors = [
  // TODO: clarify common error messages for already existing resources
  `already exists`
];

module.exports = command => {
  log(`${new Error().stack.split(`at `)[2].trim()}$ ${command}`); //trace

  const options = { stdio: 'pipe' };
  let result;

  try {
    result = childProcess.execSync(command, options).toString();
  } catch (err) {
    errorMessage = err.stderr.toString();
    map(ignorableErrors, message => {
      if(errorMessage.includes(message)) log(errorMessage);
      else throw new Error(errorMessage);
    });
  }

  log(result);
  return result;
};
