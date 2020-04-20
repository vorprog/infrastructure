const aws = require('@pulumi/aws');
const options = require('../options');
const vpc_networks = require('./vpc_networks');
const peering_connections = require('./peering_connections');
const nat_gateways = require('./nat_gateways');

//#region US_WEST_2
module.exports.us_west_2a = new aws.ec2.RouteTable(`us_west_2a`, {
  vpcId: vpc_networks.us_west_2.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____us_east_1.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_west_2a.id
    }
  ]
}, options.us_west_2);

module.exports.us_west_2b = new aws.ec2.RouteTable(`us_west_2b`, {
  vpcId: vpc_networks.us_west_2.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____us_east_1.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_west_2b.id
    }
  ]
}, options.us_west_2);

module.exports.us_west_2c = new aws.ec2.RouteTable(`us_west_2c`, {
  vpcId: vpc_networks.us_west_2.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____us_east_1.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_west_2____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_west_2c.id
    }
  ]
}, options.us_west_2);
//#endregion

//#region US_EAST_1
module.exports.us_east_1a = new aws.ec2.RouteTable(`us_east_1a`, {
  vpcId: vpc_networks.us_east_1.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_east_1a.id
    }
  ]
}, options.us_east_1);

module.exports.us_east_1b = new aws.ec2.RouteTable(`us_east_1b`, {
  vpcId: vpc_networks.us_east_1.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_east_1b.id
    }
  ]
}, options.us_east_1);

module.exports.us_east_1c = new aws.ec2.RouteTable(`us_east_1c`, {
  vpcId: vpc_networks.us_west_2.id,
  routes: [
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.us_east_1____ap_south_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_west_2c.id
    }
  ]
}, options.us_east_1);
//#endregion

//#region AP_SOUTH_1
module.exports.ap_south_1a = new aws.ec2.RouteTable(`ap_south_1a`, {
  vpcId: vpc_networks.ap_south_1.id,
  routes: [
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_east_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.ap_south_1a.id
    }
  ]
}, options.ap_south_1);

module.exports.ap_south_1b = new aws.ec2.RouteTable(`ap_south_1b`, {
  vpcId: vpc_networks.ap_south_1.id,
  routes: [
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_east_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.ap_south_1b.id
    }
  ]
}, options.ap_south_1);

module.exports.ap_south_1c = new aws.ec2.RouteTable(`ap_south_1c`, {
  vpcId: vpc_networks.us_west_2.id,
  routes: [
    {
      cidrBlock: vpc_networks.ap_south_1.cidrBlock,
      gatewayId: `local`
    },
    {
      cidrBlock: vpc_networks.us_west_2.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_west_2.id
    },
    {
      cidrBlock: vpc_networks.us_east_1.cidrBlock,
      vpcPeeringConnectionId: peering_connections.ap_south_1____us_east_1.id
    },
    {
      cidrBlock: `0.0.0.0/0`,
      natGatewayId: nat_gateways.us_west_2c.id
    }
  ]
}, options.ap_south_1);
//#endregion
