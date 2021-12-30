const policyContent = {
  Version: `2012-10-17`,
  Statement: [
    {
      Effect: `Allow`,
      Action: [
        `iam:UpdateLoginProfile`,
        `iam:DeleteVirtualMFADevice`,
        `iam:EnableMFADevice`,
        `iam:ResyncMFADevice`,
        `iam:DeactivateMFADevice`,
        `iam:UploadSigningCertificate`,
        `iam:DeleteAccessKey`,
        `iam:GetSSHPublicKey`,
        `iam:UpdateAccessKey`,
        `iam:DeleteSSHPublicKey`,
        `iam:CreateVirtualMFADevice`,
        `iam:UpdateSSHPublicKey`,
        `iam:ListSigningCertificates`,
        `iam:CreateAccessKey`,
        `iam:CreateLoginProfile`,
        `iam:ListSSHPublicKeys`,
        `iam:DeleteSigningCertificate`,
        `iam:UploadSSHPublicKey`,
        `iam:UpdateSigningCertificate`,
        `iam:GetLoginProfile`,
        `iam:DeleteLoginProfile`,
        `iam:ChangePassword`,
        `iam:ListAccessKeys`,
        `iam:ListUsers`
      ],
      Resource: [
        "arn:aws:iam::*:mfa/${aws:username}",
        "arn:aws:iam::*:user/${aws:username}"
      ]
    },
    {
      Sid: `AllowIndividualUserToListOnlyTheirOwnMFA`,
      Effect: `Allow`,
      Action: [
        `iam:ListMFADevices`
      ],
      Resource: [
        `arn:aws:iam::*:mfa/*`,
        "arn:aws:iam::*:user/${aws:username}"
      ]
    },
    {
      Sid: `AllowListActions`,
      Effect: `Allow`,
      Action: [
        `iam:ListUsers`,
        `iam:ListVirtualMFADevices`
      ],
      Resource: `*`
    }
  ]
};

exec(`aws iam create-policy --policy-name app-ec2-node --policy-document '${JSON.stringify(policyContent)}'`);
