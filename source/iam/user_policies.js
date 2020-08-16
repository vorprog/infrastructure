const aws = require('@pulumi/aws');
const users = require('./users');
const roles = require('./roles');
const map = require('lodash.map');

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

module.exports.mfa = new aws.iam.Policy(`mfa`, {
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: [
          'iam:UpdateLoginProfile',
          'iam:DeleteVirtualMFADevice',
          'iam:EnableMFADevice',
          'iam:ResyncMFADevice',
          'iam:DeactivateMFADevice',
          'iam:UploadSigningCertificate',
          'iam:DeleteAccessKey',
          'iam:GetSSHPublicKey',
          'iam:UpdateAccessKey',
          'iam:DeleteSSHPublicKey',
          'iam:CreateVirtualMFADevice',
          'iam:UpdateSSHPublicKey',
          'iam:ListSigningCertificates',
          'iam:CreateAccessKey',
          'iam:CreateLoginProfile',
          'iam:ListSSHPublicKeys',
          'iam:DeleteSigningCertificate',
          'iam:UploadSSHPublicKey',
          'iam:UpdateSigningCertificate',
          'iam:GetLoginProfile',
          'iam:DeleteLoginProfile',
          'iam:ChangePassword',
          'iam:ListAccessKeys',
          'iam:ListUsers'
        ],
        Resource: [
          'arn:aws:iam::*:mfa/${aws:username}',
          'arn:aws:iam::*:user/${aws:username}'
        ]
      },
      {
        Sid: 'AllowIndividualUserToListOnlyTheirOwnMFA',
        Effect: 'Allow',
        Action: [
          'iam:ListMFADevices'
        ],
        Resource: [
          'arn:aws:iam::*:mfa/*',
          'arn:aws:iam::*:user/${aws:username}'
        ]
      },
      {
        Sid: 'AllowListActions',
        Effect: 'Allow',
        Action: [
          'iam:ListUsers',
          'iam:ListVirtualMFADevices'
        ],
        Resource: '*'
      }
    ]
  })
});

module.exports.mfa_attachment = new aws.iam.PolicyAttachment(`mfa`, {
  policyArn: this.mfa.arn,
  users: map(users)
});