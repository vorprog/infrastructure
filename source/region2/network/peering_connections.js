const aws = require('@pulumi/aws');
const options = require('../../../options');
const vpc_networks = require('./vpc_networks');
const us_west_2_vpc_networks = require('../../us-west-2/network/vpc_networks');
const ap_south_1_vpc_networks = require('../../ap-south-1/network/vpc_networks');

module.exports.main____us_west_2_main = new aws.ec2.VpcPeeringConnection(`main____us_west_2_main`, {
  vpcId: vpc_networks.main.id,
  peerRegion: aws.USWest2Region.toString(),
  peerVpcId: us_west_2_vpc_networks.main.id,
  autoAccept: true,
}, options.us_east_1);

module.exports.main____ap_south_1_main = new aws.ec2.VpcPeeringConnection(`main____ap_south_1_main`, {
  vpcId: vpc_networks.main.id,
  peerRegion: aws.APSouth1Region.toString(),
  peerVpcId: ap_south_1_vpc_networks.main.id,
  autoAccept: true,
}, options.us_east_1);
