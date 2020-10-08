const find = require('lodash.find');
const yaml = require('js-yaml');

const getNameTag = resource => find(resource.Tags, { Key: `Name` }).Value;

module.exports = {
  exec: require('./exec'),
  file: require('./file'),
  generateSecret: require('./generate_secret'),
  each: require('lodash.map'),
  concatenate: (collection, delimiter) => require('lodash.map')(collection, item => item).join(delimiter),
  filter: require('lodash.filter'),
  first: (collection, predicate) => find(collection, predicate),
  findByNameTag: (collection, name) => find(collection, item => getNameTag(item) === name),
  getObjectFromYaml: yamlString => yaml.load(yamlString)
};
