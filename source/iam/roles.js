const aws = require('@pulumi/aws');

module.exports.developers_read_only = new aws.iam.Role(`developers_read_only`, {});

module.exports.developers_read_only_policy = new aws.iam.Policy(`developers_read_only`, {
  policy: JSON.stringify({
    Version: `2012-10-17`,
    Statement: [
      {
        Action: [`ec2:Describe*`],
        Resource: [`*`],
        Effect: `Allow`
      }
    ]
  })
});

module.exports.developers_read_only_attachment = new aws.iam.PolicyAttachment(`developers_read_only`, {
  policyArn: this.developers_read_only_policy.arn,
  roles: [ this.developers_read_only ]
});
