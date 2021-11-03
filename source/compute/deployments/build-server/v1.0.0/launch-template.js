const userDataTemplate = require('../user-data-template');
const userData = userDataTemplate({ actionsRunnerVersion: `2.8.3`})

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestLaunchTemplateData.html
module.exports = {
  "NetworkInterfaces": [
    {
      "AssociatePublicIpAddress": true,
      "DeviceIndex": 0,
      "Ipv6AddressCount": 1,
      "SubnetId": "subnet-7b16de0c"
    }
  ],
  "ImageId": "ami-?????????????????????????????????????",
  "InstanceType": "t2.small",
  "TagSpecifications": [
    {
      "ResourceType": "instance",
      "Tags": [
        {
          "Key": "purpose",
          "Value": "webserver"
        }
      ]
    }
  ]
}