const aws = require('@pulumi/aws');
const options = require('../options');
const route_tables = require('./route_tables');
const subnets = require('./subnets');

//#region US_WEST_2
module.exports.us_west_2a_private = new aws.ec2.RouteTableAssociation(`us_west_2a_private`, {
  subnetId: subnets.us_west_2a_private.id,
  routeTableId: route_tables.us_west_2a.id
}, options.us_west_2);

module.exports.us_west_2a_public = new aws.ec2.RouteTableAssociation(`us_west_2a_public`, {
  subnetId: subnets.us_west_2a_public.id,
  routeTableId: route_tables.us_west_2a.id
}, options.us_west_2);

module.exports.us_west_2b_private = new aws.ec2.RouteTableAssociation(`us_west_2b_private`, {
  subnetId: subnets.us_west_2b_private.id,
  routeTableId: route_tables.us_west_2b.id
}, options.us_west_2);

module.exports.us_west_2b_public = new aws.ec2.RouteTableAssociation(`us_west_2b_public`, {
  subnetId: subnets.us_west_2b_public.id,
  routeTableId: route_tables.us_west_2b.id
}, options.us_west_2);

module.exports.us_west_2c_private = new aws.ec2.RouteTableAssociation(`us_west_2c_private`, {
  subnetId: subnets.us_west_2c_private.id,
  routeTableId: route_tables.us_west_2c.id
}, options.us_west_2);

module.exports.us_west_2c_public = new aws.ec2.RouteTableAssociation(`us_west_2c_public`, {
  subnetId: subnets.us_west_2c_public.id,
  routeTableId: route_tables.us_west_2c.id
}, options.us_west_2);
//#endregion

//#region US_EAST_1
module.exports.us_east_1a_private = new aws.ec2.RouteTableAssociation(`us_east_1a_private`, {
  subnetId: subnets.us_east_1a_private.id,
  routeTableId: route_tables.us_east_1a.id
}, options.us_east_1);

module.exports.us_east_1a_public = new aws.ec2.RouteTableAssociation(`us_east_1a_public`, {
  subnetId: subnets.us_east_1a_public.id,
  routeTableId: route_tables.us_east_1a.id
}, options.us_east_1);

module.exports.us_east_1b_private = new aws.ec2.RouteTableAssociation(`us_east_1b_private`, {
  subnetId: subnets.us_east_1b_private.id,
  routeTableId: route_tables.us_east_1b.id
}, options.us_east_1);

module.exports.us_east_1b_public = new aws.ec2.RouteTableAssociation(`us_east_1b_public`, {
  subnetId: subnets.us_east_1b_public.id,
  routeTableId: route_tables.us_east_1b.id
}, options.us_east_1);

module.exports.us_east_1c_private = new aws.ec2.RouteTableAssociation(`us_east_1c_private`, {
  subnetId: subnets.us_east_1c_private.id,
  routeTableId: route_tables.us_east_1c.id
}, options.us_east_1);

module.exports.us_east_1c_public = new aws.ec2.RouteTableAssociation(`us_east_1c_public`, {
  subnetId: subnets.us_east_1c_public.id,
  routeTableId: route_tables.us_east_1c.id
}, options.us_east_1);
//#endregion

//#region AP_SOUTH_1
module.exports.ap_south_1a_private = new aws.ec2.RouteTableAssociation(`ap_south_1a_private`, {
  subnetId: subnets.ap_south_1a_private.id,
  routeTableId: route_tables.ap_south_1a.id
}, options.ap_south_1);

module.exports.ap_south_1a_public = new aws.ec2.RouteTableAssociation(`ap_south_1a_public`, {
  subnetId: subnets.ap_south_1a_public.id,
  routeTableId: route_tables.ap_south_1a.id
}, options.ap_south_1);

module.exports.ap_south_1b_private = new aws.ec2.RouteTableAssociation(`ap_south_1b_private`, {
  subnetId: subnets.ap_south_1b_private.id,
  routeTableId: route_tables.ap_south_1b.id
}, options.ap_south_1);

module.exports.ap_south_1b_public = new aws.ec2.RouteTableAssociation(`ap_south_1b_public`, {
  subnetId: subnets.ap_south_1b_public.id,
  routeTableId: route_tables.ap_south_1b.id
}, options.ap_south_1);

module.exports.ap_south_1c_private = new aws.ec2.RouteTableAssociation(`ap_south_1c_private`, {
  subnetId: subnets.ap_south_1c_private.id,
  routeTableId: route_tables.ap_south_1c.id
}, options.ap_south_1);

module.exports.ap_south_1c_public = new aws.ec2.RouteTableAssociation(`ap_south_1c_public`, {
  subnetId: subnets.ap_south_1c_public.id,
  routeTableId: route_tables.ap_south_1c.id
}, options.ap_south_1);
//#endregion