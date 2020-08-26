const utilities = require('./utilities');
const state = require('./state');

module.exports = async () => {
  state.s3TestBucket = utilities.execute(`aws s3api create-bucket --bucket ${state.orgName}-test-bucket --region ${state.region1} --create-bucket-configuration LocationConstraint=${state.region1}`);
};
