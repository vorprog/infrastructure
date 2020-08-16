const utilities = require('./utilities');
const state = require('./state');

module.exports = async () => {
  await utilities.exec(`aws --version`);

  const s3StateBucketName = `${process.env.ORGANIZATION_NAME}-cloud-infrastructure-state`
  await utilities.exec(`aws s3 cp s3://${s3StateBucketName}/state.json state.json`);
  state = utilities.getObjectFromJsonFile(`./state.json`);

  await utilities.exec(`aws s3api delete-bucket --bucket ${s3StateBucketName} --region ${state.region1}`);

  await utilities.writeObjectToFile(`./state.json`, state);
  await utilities.exec(`aws s3 cp state.json s3://${s3StateBucketName}/`);
};