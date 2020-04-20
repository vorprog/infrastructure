const aws = require('@pulumi/aws');
const options = require('../../../options');
const vpc_networks = require('./vpc_networks');

const vpcPrefix = vpc_networks.main.id.split(`.`, 2).join(`.`);

module.exports.az_a_private = new aws.ec2.Subnet(`az_a_private`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.0.0/20`,
  availabilityZone: `us-east-1a`
}, options.us_east_1);

module.exports.az_a_public = new aws.ec2.Subnet(`az_a_public`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.16.0/20`,
  availabilityZone: `us-east-1a`
}, options.us_east_1);

module.exports.az_b_private = new aws.ec2.Subnet(`az_b_private`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.32.0/20`,
  availabilityZone: `us-east-1b`
}, options.us_east_1);

module.exports.az_b_public = new aws.ec2.Subnet(`az_b_public`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.48.0/20`,
  availabilityZone: `us-east-1b`
}, options.us_east_1);

module.exports.az_c_private = new aws.ec2.Subnet(`az_c_private`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.64.0/20`,
  availabilityZone: `us-east-1c`
}, options.us_east_1);

module.exports.az_c_public = new aws.ec2.Subnet(`az_c_public`, {
  vpcId = vpc_networks.main.id,
  cidrBlock = vpcPrefix + `.80.0/20`,
  availabilityZone: `us-east-1c`
}, options.us_east_1);
