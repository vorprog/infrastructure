const util = require('../utilities/util');
const vpcs = require('./get_vpcs');
const subnets = require('./get_subnets');

const transitGateway = exec(`aws ec2 create-transit-gateway --tag-specifications 'ResourceType=transit-gateway,Tags=[{Key=Name,Value=main}]' --query 'TransiteGateway'`);

const region1SubnetList = util.concatenate(subnets.region1, ' ');
const region2SubnetList = util.concatenate(subnets.region2, ' ');

exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region1} --vpc-id ${vpcs.region1.VpcId}
--transit-gateway-id ${transitGateway.TransitGatewayId} --subnet-ids "${region1SubnetList}"`);

exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region2} --vpc-id ${vpcs.region2.VpcId}
--transit-gateway-id ${transitGateway.TransitGatewayId} --subnet-ids "${region2SubnetList}"`);
