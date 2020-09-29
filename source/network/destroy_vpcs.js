const exec = require('../utilities/exec');

const region1Vpcs = exec(`aws ec2 describe-vpcs --filter 'Name=tag:Name,Values=main'`).Vpcs;
exec(`aws ec2 delete-vpc --vpc-id ${region1Vpcs[0].VpcId}`);

const region2Vpcs = exec(`aws ec2 describe-vpcs --filter 'Name=tag:Name,Values=main' --region ${process.env.AWS_SECONDARY_REGION}`).Vpcs;
exec(`aws ec2 delete-vpc --vpc-id ${region2Vpcs[0].VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
