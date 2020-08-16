const utilities = require('./utilities');
const state = require('./state');

module.exports = async () => {
  state.awsCliVersion = await utilities.exec(`aws --version`);

  state.region1 = process.env.AWS_DEFAULT_REGION || `us-west-2`;
  state.region2 = process.env.AWS_REGION_2 || `us-east-1`;
  state.region3 = process.env.AWS_REGION_3 || `ap-south-1`;
  state.organizationName = process.env.ORGANIZATION_NAME;

  const s3StateBucketName = `${state.organizationName}-cloud-infrastructure-state`
  // state.s3Bucket = await utilities.exec(`aws s3api create-bucket --bucket ${s3StateBucketName} --region ${state.region1}`);

  await utilities.writeObjectToFile(`./state.json`, state);
  // await utilities.exec(`aws s3 cp state.json s3://${s3StateBucketName}/`); // TODO
};
