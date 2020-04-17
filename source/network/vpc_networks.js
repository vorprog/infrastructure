const aws = require('@pulumi/aws');
const providers = require('../providers');

module.exports.us_west_2 = new aws.ec2.Vpc(`us_west_2`, {
  cidrBlock: `10.101.0.0/16`,
}, providers.us_west_2);

module.exports.us_east_1 = new aws.ec2.Vpc(`us_east_1`, {
  cidrBlock: `10.102.0.0/16`
}, providers.us_east_1);

module.exports.ap_south_1 = new aws.ec2.Vpc(`ap_south_1`, {
  cidrBlock: `10.103.0.0/16`
}, providers.ap_south_1);
