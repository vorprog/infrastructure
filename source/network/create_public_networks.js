const exec = require('../utilities/exec');
const vpcs = require('./get_vpcs');
const subnets = require('./get_subnets');
const transitGateway = require('./get_transit_gateway');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const internetGateway1 = exec(`aws ec2 create-internet-gateway --region ${region1} --query 'InternetGateway'`);
const internetGateway2 = exec(`aws ec2 create-internet-gateway --region ${region2} --query 'InternetGateway'`);

exec(`aws ec2 attach-internet-gateway --region ${region1} --internet-gateway-id ${internetGateway1.InternetGatewayId} --vpc-id ${vpcs.region1.VpcId}`);
exec(`aws ec2 attach-internet-gateway --region ${region2} --internet-gateway-id ${internetGateway2.InternetGatewayId} --vpc-id ${vpcs.region2.VpcId}`);

const publicRouteTable1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId} --query 'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${subnets.region1.publicSubnetA.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${subnets.region1.publicSubnetB.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${subnets.region1.publicSubnetC.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway1.InternetGatewayId}`);

const publicRouteTable2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId} --query 'RouteTable'`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${subnets.region2.publicSubnetA.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${subnets.region2.publicSubnetB.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${subnets.region2.publicSubnetC.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway2.InternetGatewayId}`);
