const exec = require('../../utilities/exec');

module.exports = exec(`aws ec2 describe-transit-gateways --query 'TransitGateways'`)[0];
