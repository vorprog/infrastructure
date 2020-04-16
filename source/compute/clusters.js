const aws = require('@pulumi/aws');
const cluster_roles = require('../iam/cluster_roles');

module.exports.us_west_2 = new aws.eks.Cluster(`us_west_2`, {
  roleArn: cluster_roles.standard_cluster.arn
});
