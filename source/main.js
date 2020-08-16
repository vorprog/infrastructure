const create = require('./create');
const destroy = require('./destroy');

(async () => {
  const arguments = process.argv.slice(2);
  if (arguments[0] === `create`) create();
  if (arguments[0] === `destroy`) destroy();
})();
