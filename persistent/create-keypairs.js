const exec = require('@vorprog/exec');
const fs = require('fs');

// TODO: hide exec output

const runnerKeyPair = exec(`aws ec2 create-key-pair --key-name actions_runner --query 'KeyMaterial' --output text`);

fs.writeFileSync(`/tmp/actions_runner.pem`, runnerKeyPair.KeyMaterial);

// TODO: ignore or analyze s3 cp command output https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html
exec(`aws s3 cp /tmp/actions_runner.pem s3://${process.env.S3_KEYPAIR_BUCKET_DIRECTORY}/actions_runner.pem`);
