const util = require('../../utilities/util');

const subnets1 = exec(`aws ec2 describe-subnets --region ${process.env.AWS_DEFAULT_REGION} --query 'Subnets'`);
const subnets2 = exec(`aws ec2 describe-subnets --region ${process.env.AWS_SECONDARY_REGION} --query 'Subnets'`);

module.exports = {
  region1 = {
    privateSubnetA: util.findByNameTag(subnets1, `private_a`),
    privateSubnetB: util.findByNameTag(subnets1, `private_b`),
    privateSubnetC: util.findByNameTag(subnets1, `private_c`),
    publicSubnetA: util.findByNameTag(subnets1, `public_a`),
    publicSubnetB: util.findByNameTag(subnets1, `public_b`),
    publicSubnetC: util.findByNameTag(subnets1, `public_c`)
  },
  region2 = {
    privateSubnetA: util.findByNameTag(subnets2, `private_a`),
    privateSubnetB: util.findByNameTag(subnets2, `private_b`),
    privateSubnetC: util.findByNameTag(subnets2, `private_c`),
    publicSubnetA: util.findByNameTag(subnets2, `public_a`),
    publicSubnetB: util.findByNameTag(subnets2, `public_b`),
    publicSubnetC: util.findByNameTag(subnets2, `public_c`)
  }
}
