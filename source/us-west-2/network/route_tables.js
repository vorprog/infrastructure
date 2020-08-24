const aws = require('@pulumi/aws');
const options = require('../../../options');
const vpc_networks = require('./vpc_networks');
const us_east_1_vpc_networks = require('../../us-east-1/network/vpc_networks');
const ap_south_1_vpc_networks = require('../../ap-south-1/network/vpc_networks');
const peering_connections = require('./peering_connections');
const nat_gateways = require('./nat_gateways');

/**
 * @typedef {Object} RouteTableRoute
 * @property {String} cidrBlock
 * @property {?String} gatewayId
 * @property {?String} natGatewayId
 * @property {?String} vpcPeeringConnectionId
 */

/** @type { RouteTableRoute[]  } */
const defaultVpcRoutes = [
  {
    cidrBlock: vpc_networks.main.cidrBlock,
    gatewayId: `local`
  },
  {
    cidrBlock: us_east_1_vpc_networks.main.cidrBlock,
    vpcPeeringConnectionId: peering_connections.main____us_east_1_main.id
  },
  {
    cidrBlock: ap_south_1_vpc_networks.main.cidrBlock,
    vpcPeeringConnectionId: peering_connections.main____ap_south_1_main.id
  },
];

module.exports.az_a = new aws.ec2.RouteTable(`az_a`, {
  vpcId: vpc_networks.main.id,
  routes: defaultVpcRoutes.concat([
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.az_a.id
    }
  ])
}, options.us_west_2);

module.exports.az_b = new aws.ec2.RouteTable(`az_b`, {
  vpcId: vpc_networks.main.id,
  routes: defaultVpcRoutes.concat([
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.az_b.id
    }
  ])
}, options.us_west_2);

module.exports.az_c = new aws.ec2.RouteTable(`az_c`, {
  vpcId: vpc_networks.main.id,
  routes: defaultVpcRoutes.concat([
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.az_c.id
    }
  ])
}, options.us_west_2);
