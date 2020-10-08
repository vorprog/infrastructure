const exec = require('../utilities/exec');
const vpcs = require('./get_vpcs');
const subnets = require('./get_subnets');
const transitGateway = require('./get_transit_gateway');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const elasticIpA1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);
const elasticIpB1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);
const elasticIpC1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);

const elasticIpA2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);
const elasticIpB2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);
const elasticIpC2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);

const natGatewayA1 = exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpA1.AllocationId}
--subnet-id ${subnets.region1.privateSubnetA.SubnetId} --query 'NatGateway'`);
const natGatewayB1 = exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpB1.AllocationId}
--subnet-id ${subnets.region1.privateSubnetB.SubnetId} --query 'NatGateway'`);
const natGatewayC1 = exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpC1.AllocationId}
--subnet-id ${subnets.region1.privateSubnetC.SubnetId} --query 'NatGateway'`);

const natGatewayA2 = exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpA2.AllocationId}
--subnet-id ${subnets.region2.privateSubnetA.SubnetId} --query 'NatGateway'`);
const natGatewayB2 = exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpB2.AllocationId}
--subnet-id ${subnets.region2.privateSubnetB.SubnetId} --query 'NatGateway'`);
const natGatewayC2 = exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpC2.AllocationId}
--subnet-id ${subnets.region2.privateSubnetC.SubnetId} --query 'NatGateway'`);

const privateRouteTableA1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpcs.region1.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableA1.RouteTableId} --subnet-id ${subnets.region1.privateSubnetA.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableA1.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableA1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayA1.NatGatewayId}`);

const privateRouteTableB1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpcs.region1.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableB1.RouteTableId} --subnet-id ${subnets.region1.privateSubnetB.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableB1.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableB1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayB1.NatGatewayId}`);

const privateRouteTableC1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpcs.region1.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableC1.RouteTableId} --subnet-id ${subnets.region1.privateSubnetC.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableC1.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableC1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayC1.NatGatewayId}`);

const privateRouteTableA2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpcs.region2.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableA2.RouteTableId} --subnet-id ${subnets.region2.privateSubnetA.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableA2.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableA2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayA2.NatGatewayId}`);

const privateRouteTableB2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpcs.region2.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableB2.RouteTableId} --subnet-id ${subnets.region2.privateSubnetB.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableB2.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableB2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayB2.NatGatewayId}`);

const privateRouteTableC2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpcs.region2.VpcId} --query'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableC2.RouteTableId} --subnet-id ${subnets.region2.privateSubnetC.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableC2.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableC2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayC2.NatGatewayId}`);
