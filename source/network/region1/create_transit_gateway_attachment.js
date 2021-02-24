const util = require('../utilities/util');
const vpc = require('./get_vpc');
const subnets = require('./get_subnets');

const subnetList = util.concatenate(subnets, ' ');

exec(`aws ec2 create-transit-gateway-vpc-attachment
--vpc-id ${vpc.VpcId}
--transit-gateway-id ${transitGateway.TransitGatewayId}
--subnet-ids "${subnetList}"`);