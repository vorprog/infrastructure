

const userData = `sudo docker run \\
--env REGISTRY_STORAGE=s3 \\
--env REGISTRY_STORAGE_S3_REGION=${process.env.REGISTRY_STORAGE_S3_REGION} \\
--env REGISTRY_STORAGE_S3_BUCKET=$REGISTRY_STORAGE_S3_BUCKET \\
--detach \\
--publish 80:80 \\
--name "local-docker-registry" \\
registry.hub.docker.com/library/registry:latest
`;

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestLaunchTemplateData.html
const launchTemplate = {
  InstanceType: `t2.large`,
  ImageId: `ami-09d9c897fc36713bf`, // UBUNTU_SERVER_20_04_AMI
  UserData: Buffer.from(userData).toString(`base64`),
  KeyName: `actions_runner`,
  TagSpecifications: [
    {
      ResourceType: `instance`,
      Tags: [
        {
          Key: `Name`,
          Value: `actions_runner`
        }
      ]
    }
  ],
};

exec(`aws ec2 create-launch-template
--launch-template-name actions_runner
--launch-template-data '${JSON.stringify(launchTemplate)}'`);

exec(`aws ec2 run-instances
--launch-template LaunchTemplateName=actions_runner`);
