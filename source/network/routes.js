const map = require('lodash.map');
const aws = require('@pulumi/aws');
const providers = require('../providers');
const vpc_networks = require('./vpc_networks');
const route_tables = require('./route_tables');
const peering_connections = require('./peering_connections');

module.exports.us_west_2____us_east_1 = map(route_tables.us_west_2.ids, routeTableId =>
  new aws.ec2.Route(`us_west_2____us_east_1`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.us_east_1.cidrBlock,
    vpcPeeringConnectionId: peering_connections.us_west_2____us_east_1.id
  }, providers.us_west_2));

module.exports.us_east_1____us_west_2 = map(route_tables.us_east_1.ids, routeTableId =>
  new aws.ec2.Route(`us_east_1____us_west_2`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.us_west_2.cidrBlock,
    vpcPeeringConnectionId: peering_connections.us_east_1____us_west_2.id
  }, providers.us_east_1));

module.exports.us_west_2____ap_south_1 = map(route_tables.us_west_2.ids, routeTableId =>
  new aws.ec2.Route(`us_west_2____ap_south_1`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.ap_south_1.cidrBlock,
    vpcPeeringConnectionId: peering_connections.us_west_2____ap_south_1.id
  }, providers.us_west_2));

module.exports.ap_south_1____us_west_2 = map(route_tables.ap_south_1.ids, routeTableId =>
  new aws.ec2.Route(`ap_south_1____us_west_2`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.us_west_2.cidrBlock,
    vpcPeeringConnectionId: peering_connections.ap_south_1____us_west_2.id
  }, providers.ap_south_1));

module.exports.us_east_1____ap_south_1 = map(route_tables.us_east_1.ids, routeTableId =>
  new aws.ec2.Route(`us_east_1____ap_south_1`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.ap_south_1.cidrBlock,
    vpcPeeringConnectionId: peering_connections.us_east_1____ap_south_1.id
  }, providers.us_east_1));

module.exports.ap_south_1____us_east_1 = map(route_tables.ap_south_1.ids, routeTableId =>
  new aws.ec2.Route(`ap_south_1____us_east_1`, {
    routeTableId: routeTableId,
    destinationCidrBlock: vpc_networks.us_east_1.cidrBlock,
    vpcPeeringConnectionId: peering_connections.ap_south_1____us_east_1.id
  }, providers.ap_south_1));
