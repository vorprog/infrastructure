const aws = require('@pulumi/aws');
const options = require('../../../options');

module.exports.nat_gateway_a = new aws.ec2.Eip(`nat_gateway_a`, {}, options.ap_south_1);
module.exports.nat_gateway_b = new aws.ec2.Eip(`nat_gateway_b`, {}, options.ap_south_1);
module.exports.nat_gateway_c = new aws.ec2.Eip(`nat_gateway_c`, {}, options.ap_south_1);
