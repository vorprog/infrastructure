const s3StateBucket = require('./s3StateBucket');
const create = require('./create');
const destroy = require('./destroy');

const main = async () => {
  await s3StateBucket.setup();

  const arguments = process.argv.slice(2);
  if (arguments[0] === `create`) create();
  if (arguments[0] === `destroy`) destroy();

  await s3StateBucket.update();
};

// Execute node process asynchronously
(async () => {
  await main();
})();
