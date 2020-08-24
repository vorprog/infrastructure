const aws = require('@pulumi/aws');
const options = require('../options');

module.exports.vorprog_pulumi_state_files = new aws.s3.Bucket(`vorprog_pulumi_state_files`, {
  region: aws.USWest2Region.toString()
}, options.us_west_2);

module.exports.vorprog_cdn = new aws.s3.Bucket(`vorprog_cdn`, {
  region: aws.USWest2Region.toString()
}, options.us_west_2);

module.exports.vorprog_kubernetes_cluster_configs = new aws.s3.Bucket(`vorprog_kubernetes_cluster_configs`, {
  region: aws.USWest2Region.toString()
}, options.us_west_2);
