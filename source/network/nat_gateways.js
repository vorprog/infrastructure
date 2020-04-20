const aws = require('@pulumi/aws');
const options = require('../options');
const subnets = require('./subnets');
const ip_addresses = require('./ip_addresses');

//#region US_WEST_2
module.exports.us_west_2a = new aws.ec2.NatGateway(`us_west_2a`, {
  subnetId: subnets.us_west_2a_public.id,
  allocationId: ip_addresses.us_west_2a.allocationId
}, options.us_west_2);

module.exports.us_west_2b = new aws.ec2.NatGateway(`us_west_2b`, {
  subnetId: subnets.us_west_2b_public.id,
  allocationId: ip_addresses.us_west_2b.allocationId
}, options.us_west_2);

module.exports.us_west_2c = new aws.ec2.NatGateway(`us_west_2c`, {
  subnetId: subnets.us_west_2c_public.id,
  allocationId: ip_addresses.us_west_2c.allocationId
}, options.us_west_2);
//#endregion

//#region US_EAST_1
module.exports.us_east_1a = new aws.ec2.NatGateway(`us_east_1a`, {
  subnetId: subnets.us_east_1a_public.id,
  allocationId: ip_addresses.us_east_1a.allocationId
}, options.us_east_1);

module.exports.us_east_1b = new aws.ec2.NatGateway(`us_east_1b`, {
  subnetId: subnets.us_east_1b_public.id,
  allocationId: ip_addresses.us_east_1b.allocationId
}, options.us_east_1);

module.exports.us_east_1c = new aws.ec2.NatGateway(`us_east_1c`, {
  subnetId: subnets.us_east_1c_public.id,
  allocationId: ip_addresses.us_east_1c.allocationId
}, options.us_east_1);
//#endregion

//#region AP_SOUTH_1
module.exports.ap_south_1a = new aws.ec2.NatGateway(`ap_south_1a`, {
  subnetId: subnets.ap_south_1a_public.id,
  allocationId: ip_addresses.ap_south_1a.allocationId
}, options.ap_south_1);

module.exports.ap_south_1b = new aws.ec2.NatGateway(`ap_south_1b`, {
  subnetId: subnets.ap_south_1b_public.id,
  allocationId: ip_addresses.ap_south_1b.allocationId
}, options.ap_south_1);

module.exports.ap_south_1c = new aws.ec2.NatGateway(`ap_south_1c`, {
  subnetId: subnets.ap_south_1c_public.id,
  allocationId: ip_addresses.ap_south_1c.allocationId
}, options.ap_south_1);
//#endregion
