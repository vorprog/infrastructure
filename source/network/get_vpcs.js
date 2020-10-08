const exec = require('../../utilities/exec');

module.exports = {
  region1: exec(`aws ec2 describe-vpcs --region ${process.env.AWS_DEFAULT_REGION} --filter 'Name=tag:Name,Values=main' --query 'Vpcs[0]'`),
  region2: exec(`aws ec2 describe-vpcs --region ${process.env.AWS_SECONDARY_REGION} --filter 'Name=tag:Name,Values=main' --query 'Vpcs[0]'`)
};
