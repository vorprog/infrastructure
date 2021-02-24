const util = require('../../utilities/util');

const subnets = exec(`aws ec2 describe-subnets --query Subnets`);

module.exports = {
  privateSubnetA: util.findByNameTag(subnets, `private_a`),
  privateSubnetB: util.findByNameTag(subnets, `private_b`),
  privateSubnetC: util.findByNameTag(subnets, `private_c`),
  publicSubnetA: util.findByNameTag(subnets, `public_a`),
  publicSubnetB: util.findByNameTag(subnets, `public_b`),
  publicSubnetC: util.findByNameTag(subnets, `public_c`)
};
