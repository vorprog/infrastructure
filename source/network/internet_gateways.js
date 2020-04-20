const aws = require('@pulumi/aws');
const options = require('../options');
const vpc_networks = require('./vpc_networks');

module.exports.us_west_2 = new aws.ec2.InternetGateway(`us_west_2`, {
  vpcId: vpc_networks.us_west_2
}, options.us_west_2);

module.exports.us_east_1 = new aws.ec2.InternetGateway(`us_east_1`, {
  vpcId: vpc_networks.us_east_1
}, options.us_east_1);

module.exports.ap_south_1 = new aws.ec2.InternetGateway(`ap_south_1`, {
  vpcId: vpc_networks.ap_south_1
}, options.ap_south_1);
