const utilities = require('./utilities');
const state = require('./state');

module.exports = {
  setup: async () => {
    state.awsCliVersion = await utilities.exec(`aws --version`);
    state.region1 = process.env.AWS_DEFAULT_REGION || `us-west-2`;
    state.region2 = process.env.AWS_REGION_2 || `us-east-1`;
    state.organizationName = process.env.ORGANIZATION_NAME;
    state.s3StateBucketName = `${state.organizationName}-cloud-infrastructure-state`;

    try {
      state.s3Bucket = await utilities.exec(`aws s3api create-bucket --bucket ${state.s3StateBucketName}`);
    } catch { 
      // Existing bucket
      await utilities.exec(`aws s3 cp s3://${s3StateBucketName}/state.json state.json`);
      state = utilities.getObjectFromJsonFile(`./state.json`); // TODO: handle overriding of basic state meta data
    }
  },
  update: async () => {
    await utilities.writeObjectToFile(`./state.json`, state);
    await utilities.exec(`aws s3 cp state.json s3://${state.s3StateBucketName}/`);
  }
}
