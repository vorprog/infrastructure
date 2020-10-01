const exec = require('../../utilities/exec');

module.exports = exec(`aws ec2 describe-vpcs --region ${process.env.AWS_DEFAULT_REGION} --filter 'Name=tag:Name,Values=main'`).Vpcs[0];
