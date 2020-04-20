const aws = require('@pulumi/aws');
const options = require('../../../options');

module.exports.main = new aws.ec2.Vpc(`main`, {
  cidrBlock: `10.102.0.0/16`
}, options.us_east_1);
