const aws = require('@pulumi/aws');

module.exports.standard_cluster = new aws.iam.Role(`standard_cluster`, {});

module.exports.standard_cluster_policy = new aws.iam.Policy(`standard_cluster`, {
  policy: JSON.stringify({
    Version: `2012-10-17`,
    Statement: [
      {
        Action: [`*`],
        Resource: [`*`],
        Effect: `Allow`
      }
    ]
  })
});

module.exports.standard_cluster_attachment = new aws.iam.PolicyAttachment(`standard_cluster`, {
  policyArn: this.standard_cluster_policy.arn,
  roles: [ this.standard_cluster ]
});