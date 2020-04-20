const aws = require('@pulumi/aws');
const options = require('../options');
const cidr_ranges = require('./cidr_ranges');
const vpc_networks = require('./vpc_networks');

//#region US_WEST_2
module.exports.us_west_2a_private = new aws.ec2.Subnet(`us_west_2a_private`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet1,
  availabilityZone: `us-west-2a`
}, options.us_west_2);

module.exports.us_west_2b_private = new aws.ec2.Subnet(`us_west_2b_private`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet2,
  availabilityZone: `us-west-2b`
}, options.us_west_2);

module.exports.us_west_2c_private = new aws.ec2.Subnet(`us_west_2c_private`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet3,
  availabilityZone: `us-west-2c`
}, options.us_west_2);

module.exports.us_west_2a_public = new aws.ec2.Subnet(`us_west_2a_public`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet4,
  availabilityZone: `us-west-2a`
}, options.us_west_2);

module.exports.us_west_2b_public = new aws.ec2.Subnet(`us_west_2b_public`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet5,
  availabilityZone: `us-west-2b`
}, options.us_west_2);

module.exports.us_west_2c_public = new aws.ec2.Subnet(`us_west_2c_public`, {
  vpcId = vpc_networks.us_west_2,
  cidrBlock = cidr_ranges.us_west_2 + cidr_ranges.subnet6,
  availabilityZone: `us-west-2c`
}, options.us_west_2);
//#endregion

//#region US_EAST_1
module.exports.us_east_1a_private = new aws.ec2.Subnet(`us_east_1a_private`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet1,
  availabilityZone: `us-east-1a`
}, options.us_east_1);

module.exports.us_east_1b_private = new aws.ec2.Subnet(`us_east_1b_private`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet2,
  availabilityZone: `us-east-1b`
}, options.us_east_1);

module.exports.us_east_1c_private = new aws.ec2.Subnet(`us_east_1c_private`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet3,
  availabilityZone: `us-east-1c`
}, options.us_east_1);

module.exports.us_east_1a_public = new aws.ec2.Subnet(`us_east_1a_public`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet4,
  availabilityZone: `us-east-1a`
}, options.us_east_1);

module.exports.us_east_1b_public = new aws.ec2.Subnet(`us_east_1b_public`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet5,
  availabilityZone: `us-east-1b`
}, options.us_east_1);

module.exports.us_east_1c_public = new aws.ec2.Subnet(`us_east_1c_public`, {
  vpcId = vpc_networks.us_east_1,
  cidrBlock = cidr_ranges.us_east_1 + cidr_ranges.subnet6,
  availabilityZone: `us-east-1c`
}, options.us_east_1);
//#endregion

//#region AP_SOUTH_1
module.exports.ap_south_1a_private = new aws.ec2.Subnet(`ap_south_1a_private`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet1,
  availabilityZone: `ap-south-1a`
}, options.ap_south_1);

module.exports.ap_south_1b_private = new aws.ec2.Subnet(`ap_south_1b_private`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet2,
  availabilityZone: `ap-south-1b`
}, options.ap_south_1);

module.exports.ap_south_1c_private = new aws.ec2.Subnet(`ap_south_1c_private`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet3,
  availabilityZone: `ap-south-1c`
}, options.ap_south_1);

module.exports.ap_south_1a_public = new aws.ec2.Subnet(`ap_south_1a_public`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet4,
  availabilityZone: `ap-south-1a`
}, options.ap_south_1);

module.exports.ap_south_1b_public = new aws.ec2.Subnet(`ap_south_1b_public`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet5,
  availabilityZone: `ap-south-1b`
}, options.ap_south_1);

module.exports.ap_south_1c_public = new aws.ec2.Subnet(`ap_south_1c_public`, {
  vpcId = vpc_networks.ap_south_1,
  cidrBlock = cidr_ranges.ap_south_1 + cidr_ranges.subnet6,
  availabilityZone: `ap-south-1c`
}, options.ap_south_1);
//#endregion
