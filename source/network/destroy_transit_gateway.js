const exec = require('../utilities/exec');
const transitGateway = require('./get_transit_gateway');

exec(`aws ec2 delete-transite-gateway --transit-gateway-id ${transitGateway.TransitGatewayId}`);
