module.exports.us_west_2_vpc_networks = require('./regional/us-west-2/network/vpc_networks');
module.exports.us_east_1_vpc_networks = require('./regional/us-east-1/network/vpc_networks');
module.exports.ap_south_1_vpc_networks = require('./regional/ap-south-1/network/vpc_networks');

module.exports.us_west_2_peering_connections = require('./regional/us-west-2/network/peering_connections');
module.exports.us_east_1_peering_connections = require('./regional/us-east-1/network/peering_connections');
module.exports.ap_south_1_peering_connections = require('./regional/ap-south-1/network/peering_connections');

// TODO: subnets calculate cidr from vpc cidr so a "wait" step may be needed here
module.exports.us_west_2_subnets = require('./regional/us-west-2/network/subnets');
module.exports.us_east_1_subnets = require('./regional/us-east-1/network/subnets');
module.exports.ap_south_1_subnets = require('./regional/ap-south-1/network/subnets');

module.exports.us_west_2_ip_addresses = require('./regional/us-west-2/network/ip_addresses');
module.exports.us_east_1_ip_addresses = require('./regional/us-east-1/network/ip_addresses');
module.exports.ap_south_1_ip_addresses = require('./regional/ap-south-1/network/ip_addresses');

module.exports.us_west_2_internet_gateways = require('./regional/us-west-2/network/internet_gateways');
module.exports.us_east_1_internet_gateways = require('./regional/us-east-1/network/internet_gateways');
module.exports.ap_south_1_internet_gateways = require('./regional/ap-south-1/network/internet_gateways');

module.exports.us_west_2_nat_gateways = require('./regional/us-west-2/network/nat_gateways');
module.exports.us_east_1_nat_gateways = require('./regional/us-east-1/network/nat_gateways');
module.exports.ap_south_1_nat_gateways = require('./regional/ap-south-1/network/nat_gateways');

module.exports.us_west_2_route_tables = require('./regional/us-west-2/network/route_tables');
module.exports.us_east_1_route_tables = require('./regional/us-east-1/network/route_tables');
module.exports.ap_south_1_route_tables = require('./regional/ap-south-1/network/route_tables');

module.exports.us_west_2_route_table_associations = require('./regional/us-west-2/network/route_table_associations');
module.exports.us_east_1_route_table_associations = require('./regional/us-east-1/network/route_table_associations');
module.exports.ap_south_1_route_table_associations = require('./regional/ap-south-1/network/route_table_associations');
