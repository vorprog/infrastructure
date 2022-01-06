import * as fs from "fs"
import * as exec from "@vorprog/exec"

fs.writeFileSync(`${__dirname}/user-data`, `#!/bin/bash
sudo docker run \\
--env GITHUB_ORG=${process.env.GITHUB_ORG} \\
--env RUNNER_ORG_REGISTRATION_TOKEN=${process.env.RUNNER_ORG_REGISTRATION_TOKEN} \\
--detach \\
--publish 80:3000 \\
--name "actions-runner" \\
ghcr.io/vorprog/actions-runner:${process.env.ACTIONS_RUNNER_VERSION}
`);

const infrastructureSubnet = exec(`aws ec2 describe-subnets --filter 'Name=tag:Name,Values=infrastructure' --query 'Subnets[0]'`)
const awsAccountId = exec(`aws sts get-caller-identity --query Account --output text`);

exec(`aws ec2 run-instances
--subnet-id ${infrastructureSubnet.SubnetId}
--security-groups "private"
--image-id arn:aws:imagebuilder:us-west-2:${awsAccountId}:image/actions-runner/2.285.0/1
--user-data file://${__dirname}/user-data
--iam-instance-profile Name=actions-runner
--key-name actions-runner
--instance-type t2.large
--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=actions-runner}]'`);
