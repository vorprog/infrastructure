const aws = require('@pulumi/aws');
const options = require('../options');
const vpc_networks = require('./vpc_networks');

module.exports.us_west_2____us_east_1 = new aws.ec2.VpcPeeringConnection(`us_west_2____us_east_1`, {
  vpcId: vpc_networks.us_west_2.id,
  peerRegion: aws.USEast1Region,
  peerVpcId: vpc_networks.us_east_1.id,
  autoAccept: true,
}, options.us_west_2);

module.exports.us_east_1____us_west_2 = new aws.ec2.VpcPeeringConnectionAccepter("us_east_1____us_west_2", {
  autoAccept: true,
  vpcPeeringConnectionId: this.us_west_2_to_us_east_1.id,
}, options.us_east_1);

module.exports.us_west_2____ap_south_1 = new aws.ec2.VpcPeeringConnection(`us_west_2____ap_south_1`, {
  vpcId: vpc_networks.us_west_2.id,
  peerRegion: aws.APSouth1Region,
  peerVpcId: vpc_networks.ap_south_1.id,
  autoAccept: true,
}, options.us_west_2);

module.exports.ap_south_1____us_west_2 = new aws.ec2.VpcPeeringConnectionAccepter("ap_south_1____us_west_2", {
  autoAccept: true,
  vpcPeeringConnectionId: this.us_west_2_to_ap_south_1.id,
}, options.ap_south_1);

module.exports.us_east_1____ap_south_1 = new aws.ec2.VpcPeeringConnection(`us_east_1____ap_south_1`, {
  vpcId: vpc_networks.us_east_1.id,
  peerRegion: aws.APSouth1Region,
  peerVpcId: vpc_networks.ap_south_1.id,
  autoAccept: true,
}, options.us_east_1);

module.exports.ap_south_1____us_east_1 = new aws.ec2.VpcPeeringConnectionAccepter("ap_south_1____us_east_1", {
  autoAccept: true,
  vpcPeeringConnectionId: this.us_east_1_to_ap_south_1.id,
}, options.ap_south_1);
