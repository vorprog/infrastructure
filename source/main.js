const s3StateBucket = require('./s3StateBucket');
const create = require('./create');
const destroy = require('./destroy');

(async () => {
  s3StateBucket.setup();

  const arguments = process.argv.slice(2);
  if (arguments[0] === `create`) create();
  if (arguments[0] === `destroy`) destroy();

  s3StateBucket.update();
})();
