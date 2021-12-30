const exec = require('@vorprog/exec');

const policyContent = {
  Version: `2012-10-17`,
  Statement: [
    {
      Effect: `Allow`,
      Action: [
        `s3:Describe*`,
        `s3:Get*`,
        `s3:List*,`,
        `s3:PutObject`,
        `s3:DeleteObject`,
        `s3:PutObjectTagging`
      ],
      Resource: [
        `arn:aws:s3:::${process.env.DATA_BUCKET_NAME}`,
        `arn:aws:s3:::${process.env.DATA_BUCKET_NAME}/*`
      ]
    },
    {
      Effect: `Allow`,
      Action: [
        `kms:Decrypt`,
        `kms:List*`,
        `kms:Get*`
      ],
      Resource: [
        `arn:aws:kms:*:*:key/${process.env.SECRET_KEY_NAME}`
      ]
    }
  ]
};

exec(`aws iam create-policy --policy-name basic-app --policy-document '${JSON.stringify(policyContent)}'`);

const assumeRolePolicyContent = {
  Version: `2012-10-17`,
  Statement: {
    Effect: `Allow`,
    Principal: {
      Service: `ec2.amazonaws.com`
    },
    Action: `sts:AssumeRole`
  }
};

exec(`aws iam create-role
--role-name basic-app
--assume-role-policy-document "${JSON.stringify(assumeRolePolicyContent)}"`);

exec(`aws iam attach-role-policy
--role-name basic-app
--policy-arn basic-app`);
