const userDataTemplate = require('../user-data-template');
const userData = userDataTemplate({ sopsS3Url: `s3://vorprog-secrets/go-api/prod`, dockerImageTag: `1.2.5` });

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestLaunchTemplateData.html
module.exports = {
  NetworkInterfaces: [
    {
      AssociatePublicIpAddress: true,
      DeviceIndex: 0,
      Ipv6AddressCount: 1,
      SubnetId: `subnet-7b16de0c`
    }
  ],
  ImageId: `ami-8c1be5f6`,
  InstanceType: `t2.small`,
  TagSpecifications: [
    {
      ResourceType: `instance`,
      Tags: [
        {
          Key: `purpose`,
          Value: `webserver`
        }
      ]
    }
  ],
  UserData: Buffer.from(userData).toString(`base64`)
};
