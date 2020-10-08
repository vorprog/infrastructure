const exec = require('../../utilities/exec');

const region1Vpcs = exec(`aws ec2 describe-vpcs --region ${process.env.AWS_DEFAULT_REGION} --filter 'Name=tag:Name,Values=main' --query 'Vpcs'`);
const region2Vpcs = exec(`aws ec2 describe-vpcs --region ${process.env.AWS_SECONDARY_REGION} --filter 'Name=tag:Name,Values=main' --query 'Vpcs'`);

module.exports = {
  region1: region1Vpcs[0],
  region2: region2Vpcs[0]
}