const aws = require('@pulumi/aws');
const providers = require('../providers');
const vpc_networks = require('./vpc_networks');

module.exports.init = async () => {
  module.exports.us_west_2 = await aws.ec2.getRouteTables({
    vpcId: vpc_networks.us_west_2.id
  }, providers.us_west_2);

  module.exports.us_east_1 = await aws.ec2.getRouteTables({
    vpcId: vpc_networks.us_east_1.id
  }, providers.us_east_1);

  module.exports.ap_south_1 = await aws.ec2.getRouteTables({
    vpcId: vpc_networks.ap_south_1.id
  }, providers.ap_south_1);
};
