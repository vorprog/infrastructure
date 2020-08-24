const s3State = require('./s3State');
const create = require('./create');
const destroy = require('./destroy');

const main = async () => {
  await s3State.setup();

  const arguments = process.argv.slice(2);
  if (arguments[0] === `create`) create();
  if (arguments[0] === `destroy`) destroy();

  await s3State.update();
};

// Execute node process asynchronously
(async () => {
  await main();
})();
