const aws = require('@pulumi/aws');
const options = require('../../options');
const vpc_networks = require('./vpc_networks');

module.exports.main = new aws.ec2.InternetGateway(`main`, {
  vpcId: vpc_networks.main
}, options.us_east_1);
