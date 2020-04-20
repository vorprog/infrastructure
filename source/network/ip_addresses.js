const aws = require('@pulumi/aws');
const options = require('../options');

module.exports.us_west_2a = new aws.ec2.Eip(`us_west_2a`, {}, options.us_west_2);
module.exports.us_west_2b = new aws.ec2.Eip(`us_west_2b`, {}, options.us_west_2);
module.exports.us_west_2c = new aws.ec2.Eip(`us_west_2c`, {}, options.us_west_2);

module.exports.us_east_1a = new aws.ec2.Eip(`us_east_1a`, {}, options.us_east_1);
module.exports.us_east_1b = new aws.ec2.Eip(`us_east_1b`, {}, options.us_east_1);
module.exports.us_east_1c = new aws.ec2.Eip(`us_east_1c`, {}, options.us_east_1);

module.exports.ap_south_1a = new aws.ec2.Eip(`ap_south_1a`, {}, options.ap_south_1);
module.exports.ap_south_1b = new aws.ec2.Eip(`ap_south_1b`, {}, options.ap_south_1);
module.exports.ap_south_1c = new aws.ec2.Eip(`ap_south_1c`, {}, options.ap_south_1);
