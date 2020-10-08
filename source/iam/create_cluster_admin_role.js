const exec = require('../utilities/exec');

const accountId = exec(`aws sts get-caller-identity --query 'Account'`);
const assumeRolePolicy = {
  Version: `2012-10-17`,
  Statement: [
    {
      Effect: `Allow`,
      Principal: {
        AWS: `arn:aws:iam::${accountId}:root`
      },
      Action: `sts:AssumeRole`,
      Condition: {}
    }
  ]
};

exec(`aws iam create-role
--role-name ClusterAdmin
--description "Kubernetes administrator role (for AWS IAM Authenticator for AWS)."
--assume-role-policy-document "${JSON.stringify(assumeRolePolicy)}"
--output text
--query 'Role.Arn'`);
