const main = async () => {
  const aws = require('@pulumi/aws');

  //#region GLOBAL RESOURCES
  const users = require('./iam/users');
  const roles = require('./iam/roles');
  const user_policies = require('./iam/user_policies');
  const zones = require('./dns/zones');
  const records = require('./dns/records');
  const s3_buckets = require('./storage/buckets');
  const content_distribution_networks = require('./storage/content_distribution_networks');
  //#endregion

  //#region REGIONAL RESOURCES
  const encryption_resources = require('./encryption');
  const network_resources = require('./network');
  const compute_resources = require('./compute');
  //#endregion
};

main();
