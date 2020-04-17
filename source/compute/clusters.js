const aws = require('@pulumi/aws');
const providers = require('../providers');
const cluster_roles = require('../iam/cluster_roles');

module.exports.us_west_2 = new aws.eks.Cluster(`us_west_2`, {
  roleArn: cluster_roles.standard_cluster.arn
}, providers.us_west_2);

module.exports.us_east_1 = new aws.eks.Cluster(`us_east_1`, {
  roleArn: cluster_roles.standard_cluster.arn
}, providers.us_east_1);

module.exports.ap_south_1 = new aws.eks.Cluster(`ap_south_1`, {
  roleArn: cluster_roles.standard_cluster.arn
}, providers.ap_south_1);
