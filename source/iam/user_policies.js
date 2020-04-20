const aws = require('@pulumi/aws');
const users = require('./users');
const roles = require('./roles');

const assumeRolePolicyJson = (roleArn) => JSON.stringify({
  Version: `2012-10-17`,
  Statement: [
    {
      Action: [`sts:AssumeRole`],
      Resource: [ roleArn ],
      Effect: `Allow`
    }
  ]
});

module.exports.assume_developers_read_only = new aws.iam.Policy(`assume_developers_read_only`, {
  policy: assumeRolePolicyJson(roles.developers_read_only.arn)
});

module.exports.developers_read_only_attachment = new aws.iam.PolicyAttachment(`developers_read_only`, {
    policyArn: this.assume_developers_read_only.arn,
    users: [
      users.user_1,
      users.user_2
    ]
});
