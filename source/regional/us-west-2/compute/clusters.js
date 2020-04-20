const aws = require('@pulumi/aws');
const options = require('../../options');
const cluster_roles = require('../../iam/cluster_roles');

module.exports.main = new aws.eks.Cluster(`main`, {
  roleArn: cluster_roles.standard_cluster.arn
}, options.us_west_2);
