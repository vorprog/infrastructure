// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/aws
const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

module.exports = async () => {
  aws.config.profile = `vorprog`;
  aws.config.region = aws.USWest2Region;

  const callerIdentity = await aws.getCallerIdentity();
  process.env.AWS_ACCOUNT_ID = callerIdentity.accountId;

  // BASIC GLOBAL RESOURCES
  const users = require('./iam/users');
  const roles = require('./iam/roles');
  const user_policies = require('./iam/user_policies');
  const zones = require('./dns/zones');
  const records = require('./dns/records');
  const s3_buckets = require('./storage/buckets');
  const secrets_keys = require('./encryption/secrets_keys');

  // NETWORK RESOURCES
  const vpc_networks = require('./network/vpc_networks');

  // COMPUTE RESOURCES
  const clusters = require('./compute/clusters')
}
