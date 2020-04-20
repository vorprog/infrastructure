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
  //#endregion

  ////#region REGIONAL RESOURCES
  const encryption_resources = require('./encryption');
  const network_resources = require('./network');
  const compute_resources = require('./compute');
  //#endregion
};
