require('./iam/create_users');
require('./iam/create_groups');

require('./network/create_transit_gateway');

process.env.AWS_DEFAULT_REGION = process.env.AWS_PRIMARY_REGION;
require('./network/region1/create_vpc');
require('./network/region1/create_subnets');
require('./network/region1/create_transit_gateway_attachment');
require('./network/region1/create_private_networks');
require('./network/region1/create_public_networks');

process.env.AWS_DEFAULT_REGION = process.env.AWS_SECONDARY_REGION;
require('./network/region2/create_vpc');
require('./network/region2/create_subnets');
require('./network/region2/create_transit_gateway_attachment');
require('./network/region2/create_private_networks');
require('./network/region2/create_public_networks');

require('./storage/create_keys');
require('./storage/create_buckets');

require('./compute/create_clusters');
require('./iam/create_cluster_admin_role');
require('./compute/create_cluster_roles');
