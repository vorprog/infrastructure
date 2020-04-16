const aws = require('@pulumi/aws');

module.exports.developers_read_only = new aws.iam.Role(`developers_read_only`, {
  assumeRolePolicy: JSON.stringify({
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
