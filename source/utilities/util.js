const yaml = require('js-yaml');

module.exports = {
  exec: require('./exec'),
  file: require('./file'),
  generateSecret: require('./generate_secret'),
  each: require('lodash.map'),
  concatenate: (collection, delimiter) => require('lodash.map')(collection, item => item).join(delimiter),
  first: (collection, predicate) => find(collection, predicate),
  getObjectFromYaml: yamlString => yaml.load(yamlString)
};
