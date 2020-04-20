// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/aws
const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

module.exports = async () => {
  const providers = require('./providers');
  aws.config.profile = providers.defaultProfile;
  aws.config.region = providers.defaultRegion;

  const callerIdentity = await aws.getCallerIdentity();
  process.env.AWS_ACCOUNT_ID = callerIdentity.accountId;

  //#region GLOBAL RESOURCES
  const users = require('./iam/users');
  const roles = require('./iam/roles');
  const user_policies = require('./iam/user_policies');
  const zones = require('./dns/zones');
  const records = require('./dns/records');
  const s3_buckets = require('./storage/buckets');
  const secrets_keys = require('./encryption/secrets_keys');
  //#endregion

  //#region NETWORK RESOURCES
  const vpc_networks = require('./network/vpc_networks');
  const peering_connection = require('./network/peering_connections');

  // TODO: Unlikely this will work because async retrieval
  const subnets = require('./network/subnets');
  await subnets.init();

  //#endregion

  //#region COMPUTE RESOURCES
  const clusters = require('./compute/clusters');
  //#endregion
};
