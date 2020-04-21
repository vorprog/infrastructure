const aws = require('@pulumi/aws');

module.exports.pulumi_config = new aws.s3.Bucket(`pulumi_config`, {
  region: aws.USWest2Region.toString()
});

module.exports.cdn = new aws.s3.Bucket(`cdn`, {
  region: aws.USWest2Region.toString()
});

module.exports.vorprog_kubernetes_cluster_us_west_2 = new aws.s3.Bucket(`vorprog_kubernetes_cluster_us_west_2`, {
  region: aws.USWest2Region.toString()
});
