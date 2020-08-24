const utilities = require('./utilities');
const state = require('./state');

module.exports = {
  setup: async () => {
    state.awsCliVersion = utilities.execute(`aws --version`);
    state.region1 = process.env.AWS_DEFAULT_REGION;
    state.region2 = process.env.AWS_SECONDARY_REGION;
    state.orgName = process.env.ORGANIZATION_NAME;
    state.s3StateBucketName = `${state.orgName}-cloud-infrastructure-state`;

    try {
      state.s3Bucket = utilities.execute(`aws s3api create-bucket --bucket ${state.s3StateBucketName}`);
    } catch { 
      // Existing bucket
      utilities.execute(`aws s3 cp s3://${state.s3StateBucketName}/state.json state.json`);
      state = utilities.getObjectFromJsonFile(`./state.json`); // TODO: handle overriding of basic state meta data
    }
  },
  update: async () => {
    utilities.writeObjectToFile(`./state.json`, state);
    utilities.execute(`aws s3 cp state.json s3://${state.s3StateBucketName}/`);
  }
}
