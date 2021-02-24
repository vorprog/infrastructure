const exec = require('../utilities/exec');
const util = require('../utilities/util');

const securityGroups = exec(`aws ec2 describe-security-groups --query 'SecurityGroups'`);

const privateNetwork = util.first(securityGroups, { GroupName: `private-network`});

const httpInternet = util.first(securityGroups, { GroupName: `http-internet`});

module.exports = {
  privateNetwork1: privateNetwork,
  httpInternet1: httpInternet,
};