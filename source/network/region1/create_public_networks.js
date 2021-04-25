const exec = require('../utilities/exec');
const vpc = require('./get_vpc');
const subnets = require('./get_subnets');
const transitGateway = require('../get_transit_gateway');

const internetGateway = exec(`aws ec2 create-internet-gateway 
--query InternetGateway`);

exec(`aws ec2 attach-internet-gateway
--internet-gateway-id ${internetGateway.InternetGatewayId}
--vpc-id ${vpc.VpcId}`);

const publicRouteTable = exec(`aws ec2 create-route-table
--vpc-id ${vpc.VpcId}
--query RouteTable`);

exec(`aws ec2 create-route
--route-table-id ${publicRouteTable.RouteTableId}
--destination-cidr-block 10.0.0.0/8
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 create-route
--route-table-id ${publicRouteTable.RouteTableId}
--destination-cidr-block 0.0.0.0/0
--internet-gateway-id ${internetGateway.InternetGatewayId}`);

exec(`aws ec2 associate-route-table
--route-table-id ${publicRouteTable.RouteTableId}
--subnet-id ${subnets.publicSubnetA.SubnetId}`);

exec(`aws ec2 associate-route-table
--route-table-id ${publicRouteTable.RouteTableId}
--subnet-id ${subnets.publicSubnetB.SubnetId}`);

exec(`aws ec2 associate-route-table
--route-table-id ${publicRouteTable.RouteTableId}
--subnet-id ${subnets.publicSubnetC.SubnetId}`);
