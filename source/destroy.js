const utilities = require('./utilities');
const state = require('./state');

module.exports = async () => {
  state.s3TestBucket = await utilities.execute(`aws s3api delete-bucket --bucket ${state.orgName}-test-bucket`);
};
