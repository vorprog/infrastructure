const exec = require('../utilities/exec');
const util = require('../utilities/util');

const securityGroups1 = exec(`aws ec2 describe-security-groups --region ${process.env.AWS_DEFAULT_REGION}`).SecurityGroups;
const securityGroups2 = exec(`aws ec2 describe-security-groups --region ${process.env.AWS_SECONDARY_REGION}`).SecurityGroups;

const privateNetwork1 = util.first(securityGroups1, { GroupName: `private-network`});
const privateNetwork2 = util.first(securityGroups1, { GroupName: `private-network`});

const httpInternet1 = util.first(securityGroups1, { GroupName: `http-internet`});
const httpInternet2 = util.first(securityGroups1, { GroupName: `http-internet`});

module.exports = {
  privateNetwork1: privateNetwork1,
  privateNetwork2: privateNetwork2,
  httpInternet1: httpInternet1,
  httpInternet2: httpInternet2
};