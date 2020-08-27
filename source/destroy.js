const utilities = require('./utilities');
const state = require('./state');
const destroyIamLayer = require('./global/destroy_iam');

module.exports = async () => {
  await destroyIamLayer();
  state.s3TestBucket = utilities.execute(`aws s3api delete-bucket --bucket ${state.orgName}-test-bucket`);
};
