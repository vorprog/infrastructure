const aws = require('@pulumi/aws');
const options = require('../../../options');
const subnets = require('./subnets');
const route_tables = require('./route_tables');

// A subnet can only be associated with one route table at a time.
// However, you can associate multiple subnets with the same route table. 
// https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html

module.exports.az_a_private_association = new aws.ec2.RouteTableAssociation(`az_a_private`, {
  subnetId: subnets.az_a_private.id,
  routeTableId: route_tables.az_a.id
}, options.us_east_1);

module.exports.az_a_public_association = new aws.ec2.RouteTableAssociation(`az_a_public`, {
  subnetId: subnets.az_a_public.id,
  routeTableId: route_tables.az_a.id
}, options.us_east_1);

module.exports.az_b_private_association = new aws.ec2.RouteTableAssociation(`az_b_private`, {
  subnetId: subnets.az_b_private.id,
  routeTableId: route_tables.az_b
}, options.us_east_1);

module.exports.az_b_public_association = new aws.ec2.RouteTableAssociation(`az_b_public`, {
  subnetId: subnets.az_b_public.id,
  routeTableId: route_tables.az_b
}, options.us_east_1);

module.exports.az_c_private_association = new aws.ec2.RouteTableAssociation(`az_c_private`, {
  subnetId: subnets.az_c_private.id,
  routeTableId: route_tables.az_c.id
}, options.us_east_1);

module.exports.az_c_public_association = new aws.ec2.RouteTableAssociation(`az_c_public`, {
  subnetId: subnets.az_c_public.id,
  routeTableId: route_tables.az_c.id
}, options.us_east_1);