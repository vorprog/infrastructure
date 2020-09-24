const exec = require('./exec');
const each = require('lodash.map');
const file = require('./file');

const state = {};

// Initialize State
state.awsCliVersion = exec(`aws --version`);
state.region1 = process.env.AWS_DEFAULT_REGION;
state.region2 = process.env.AWS_SECONDARY_REGION;
state.domain = process.env.DOMAIN_NAME;
state.s3StateBucketName = `${state.domain}-cloud-infrastructure-state`;

const callderIdentityResult = exec(`aws sts get-caller-identity`);
state.accountId = JSON.parse(callderIdentityResult).Account;

try {
  state.s3Bucket = exec(`aws s3api create-bucket --bucket ${state.s3StateBucketName} --region ${state.region1} --create-bucket-configuration LocationConstraint=${state.region1}`);
} catch (err) {
  if (err.stderr.toString().includes(`BucketAlreadyOwnedByYou`)) {
    console.log(`Condition: BucketAlreadyOwnedByYou, refreshing state . . .`);
    exec(`aws s3 cp s3://${state.s3StateBucketName}/state.json state.json`);
    let stateFileData = file.getJson(`./state.json`);
    each(stateFileData, property => state[property] = stateFileData[property]);
  }
  else throw err;
}

module.exports = state;

// TODO: Update state file and s3 bucket whenever state changes
// let oldState = state;
// while(true) {
//   if(oldState !== state) {
//     file.writeJson(JSON.stringify(state), `state.json`);
//     exec(`aws s3 cp state.json s3://${state.s3StateBucketName}/`);
//   }
// }
