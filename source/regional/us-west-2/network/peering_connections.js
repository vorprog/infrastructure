const aws = require('@pulumi/aws');
const options = require('../../../options');
const vpc_networks = require('./vpc_networks');
const us_east_1_vpc_networks = require('../../us-east-1/network/vpc_networks');
const ap_south_1_vpc_networks = require('../../ap-south-1/network/vpc_networks');

module.exports.main____us_east_1_main = new aws.ec2.VpcPeeringConnection(`main____us_east_1_main`, {
  vpcId: vpc_networks.main.id,
  peerRegion: aws.USEast1Region.toString(),
  peerVpcId: us_east_1_vpc_networks.main.id,
  autoAccept: true,
}, options.us_west_2);

module.exports.main____ap_south_1_main = new aws.ec2.VpcPeeringConnection(`main____ap_south_1_main`, {
  vpcId: vpc_networks.main.id,
  peerRegion: aws.APSouth1Region.toString(),
  peerVpcId: ap_south_1_vpc_networks.main.id,
  autoAccept: true,
}, options.us_west_2);
