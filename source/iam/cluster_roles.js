const aws = require('@pulumi/aws');

module.exports.standard_cluster = new aws.iam.Role(`standard_cluster`, {
  assumeRolePolicy: JSON.stringify({
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
