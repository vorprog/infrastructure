const childProcess = require('child_process');
const each = require('lodash.map');

const ignorableErrors = [
  `EntityAlreadyExists`,
];

module.exports = command => {
  console.log(`\nTRACE: ${new Error().stack.split(`at `)[2].replace(`Object.<anonymous>`, ``).trim()}`);
  command = command.replace(/\n/g, ` `); // puts command on a single line
  console.log(`$ ${command}`);

  const options = { stdio: 'pipe' };
  let result;

  try {
    result = childProcess.execSync(command, options).toString();
    if (result) return parseContent(result);
  } catch (err) {
    errorMessage = (err.stderr ? err.stderr : err).toString();
    each(ignorableErrors, message => {
      if (!errorMessage.includes(`An error occurred (${message})`)) throw new Error(errorMessage);
    });
  }
};

const parseContent = content => {
  console.log(content);
  try {
    return JSON.parse(content);
  } catch (err) {
    return content;
  }
}