const aws = require('@pulumi/aws');
const users = require('./users');
const roles = require('./roles');

const developers_read_only_policy = new aws.iam.Policy(roles.developers_read_only.name, {
  policy: JSON.stringify({
    Version: `2012-10-17`,
    Statement: [
      {
        Action: [`sts:AssumeRole`],
        Resource: [ roles.developers_read_only.arn ],
        Effect: `Allow`
      }
    ]
  })
});

module.exports.developers_read_only = {
  policy: developers_read_only_policy,
  attachment: new aws.iam.PolicyAttachment(roles.developers_read_only.name, {
    policyArn: developers_read_only_policy.arn,
    users: [
      users.user_1.user,
      users.user_2.user
    ]
  })
};
