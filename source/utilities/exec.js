const childProcess = require('child_process');
const each = require('lodash.map');

const ignorableErrors = [
  `EntityAlreadyExists`,
];

module.exports = command => {
  console.log(`\nTRACE: ${new Error().stack.split(`at `)[2].replace(`Object.<anonymous>`,``).trim()}`);
  console.log(`$ ${command}`);

  const options = { stdio: 'pipe' };
  let result;

  try {
    result = childProcess.execSync(command, options).toString();
    if (result) {
      console.log(result);
      return result;
    }
  } catch (err) {
    errorMessage = err.stderr.toString();
    each(ignorableErrors, message => {
      if (!errorMessage.includes(`An error occurred (${message})`)) throw new Error(errorMessage);
    });
  }
};
