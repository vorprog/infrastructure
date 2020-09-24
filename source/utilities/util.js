module.exports = {
  exec: require('./exec'),
  state: require('./state'),
  file: require('./file'),
  each: require('lodash.map'),
  first: (collection, predicate) => require('lodash.filter')(collection, predicate),
};
