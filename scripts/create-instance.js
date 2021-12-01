const actionsRunnerVersion = process.env.ACTIONS_RUNNER_VERSION;
const filename = `actions-runner-linux-arm64-${actionsRunnerVersion}.tar.gz`;

const userData = `#!/bin/bash
mkdir actions-runner
cd actions-runner
curl -o ${filename} -L https://github.com/actions/runner/releases/download/v${actionsRunnerVersion}/${filename}
tar xzf ./${filename}

./config.sh --labels linux,ARM64 --url https://github.com/vorprog --token ${process.env.RUNNER_ORG_REGISTRATION_TOKEN}
# ./bin/installdependencies.sh
# ./run.sh
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
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
