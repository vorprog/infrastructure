const exec = require('../../utilities/exec');

module.exports = exec(`aws ec2 describe-vpcs --filter 'Name=tag:Name,Values=main' --query 'Vpcs[0]'`);
