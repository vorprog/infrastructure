const utilities = require('./utilities');
const state = require('./state');

module.exports = async () => {
  state.s3TestBucket = await utilities.exec(`aws s3api delete-bucket --bucket ${state.organizationName}-test-bucket`);
};
