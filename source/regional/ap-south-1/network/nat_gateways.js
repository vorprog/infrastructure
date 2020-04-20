const aws = require('@pulumi/aws');
const options = require('../../../options');
const subnets = require('./subnets');
const ip_addresses = require('./ip_addresses');

module.exports.az_a = new aws.ec2.NatGateway(`az_a`, {
  subnetId: subnets.az_a_public.id,
  allocationId: ip_addresses.nat_gateway_a.allocationId
}, options.us_east_1);

module.exports.az_b = new aws.ec2.NatGateway(`az_b`, {
  subnetId: subnets.az_b_public.id,
  allocationId: ip_addresses.nat_gateway_b.allocationId
}, options.us_east_1);

module.exports.az_c = new aws.ec2.NatGateway(`az_c`, {
  subnetId: subnets.az_c_public.id,
  allocationId: ip_addresses.nat_gateway_c.allocationId
}, options.us_east_1);
