const utilities = require('./utilities');
const state = require('./state');
const map = require('lodash.map');

const refreshState = () => {
  console.log(`Condition: BucketAlreadyOwnedByYou, refreshing state . . .`);
  utilities.execute(`aws s3 cp s3://${state.s3StateBucketName}/state.json state.json`);
  let stateFileData = utilities.getObjectFromJsonFile(`./state.json`);
  map(stateFileData, property => state[property] = stateFileData[property]);
}

module.exports = {
  setup: async () => {
    state.awsCliVersion = utilities.execute(`aws --version`);
    state.region1 = process.env.AWS_DEFAULT_REGION;
    state.region2 = process.env.AWS_SECONDARY_REGION;
    state.orgName = process.env.ORGANIZATION_NAME;
    state.s3StateBucketName = `${state.orgName}-cloud-infrastructure-state`;

    try {
      state.s3Bucket = utilities.execute(`aws s3api create-bucket --bucket ${state.s3StateBucketName} --region ${state.region1} --create-bucket-configuration LocationConstraint=${state.region1}`);
    } catch (err) {
      if (err.stderr.toString().includes(`BucketAlreadyOwnedByYou`)) refreshState();
      else throw err;
    }
  },
  update: async () => {
    utilities.writeObjectToFile(`./state.json`, state);
    utilities.execute(`aws s3 cp state.json s3://${state.s3StateBucketName}/`);
  }
}
