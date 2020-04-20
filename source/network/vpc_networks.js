const aws = require('@pulumi/aws');
const options = require('../options');
const cidr_ranges = require('./cidr_ranges');

module.exports.us_west_2 = new aws.ec2.Vpc(`us_west_2`, {
  cidrBlock: cidr_ranges.us_west_2 + cidr_ranges.vpc,
}, options.us_west_2);

module.exports.us_east_1 = new aws.ec2.Vpc(`us_east_1`, {
  cidrBlock: cidr_ranges.us_east_1 + cidr_ranges.vpc
}, options.us_east_1);

module.exports.ap_south_1 = new aws.ec2.Vpc(`ap_south_1`, {
  cidrBlock: cidr_ranges.ap_south_1 + cidr_ranges.vpc
}, options.ap_south_1);
