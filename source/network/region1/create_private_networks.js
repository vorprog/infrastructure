const exec = require('../utilities/exec');
const vpc = require('./get_vpc');
const subnets = require('./get_subnets');
const transitGateway = require('./get_transit_gateway');

const elasticIpA1 = exec(`aws ec2 allocate-address --domain vpc`);
const elasticIpB1 = exec(`aws ec2 allocate-address --domain vpc`);
const elasticIpC1 = exec(`aws ec2 allocate-address --domain vpc`);

const natGatewayA1 = exec(`aws ec2 create-nat-gateway 
--allocation-id ${elasticIpA1.AllocationId}
--subnet-id ${subnets.privateSubnetA.SubnetId} 
--query NatGateway`);

const natGatewayB1 = exec(`aws ec2 create-nat-gateway
--allocation-id ${elasticIpB1.AllocationId}
--subnet-id ${subnets.privateSubnetB.SubnetId}
--query NatGateway`);

const natGatewayC1 = exec(`aws ec2 create-nat-gateway
--allocation-id ${elasticIpC1.AllocationId}
--subnet-id ${subnets.privateSubnetC.SubnetId}
--query NatGateway`);

const privateRouteTableA = exec(`aws ec2 create-route-table --vpc-id ${vpc.VpcId} --query RouteTable`);

exec(`aws ec2 associate-route-table
--route-table-id ${privateRouteTableA.RouteTableId}
--subnet-id ${subnets.privateSubnetA.SubnetId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableA.RouteTableId}
--destination-cidr-block 10.0.0.0/8
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableA.RouteTableId}
--destination-cidr-block 0.0.0.0/0
--nat-gateway-id ${natGatewayA1.NatGatewayId}`);

const privateRouteTableB = exec(`aws ec2 create-route-table --vpc-id ${vpc.VpcId} --query RouteTable`);

exec(`aws ec2 associate-route-table
--route-table-id ${privateRouteTableB.RouteTableId}
--subnet-id ${subnets.privateSubnetB.SubnetId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableB.RouteTableId}
--destination-cidr-block 10.0.0.0/8
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableB.RouteTableId}
--destination-cidr-block 0.0.0.0/0
--nat-gateway-id ${natGatewayB1.NatGatewayId}`);

const privateRouteTableC = exec(`aws ec2 create-route-table --vpc-id ${vpc.VpcId} --query RouteTable`);

exec(`aws ec2 associate-route-table
--route-table-id ${privateRouteTableC.RouteTableId}
--subnet-id ${subnets.privateSubnetC.SubnetId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableC.RouteTableId}
--destination-cidr-block 10.0.0.0/8
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 create-route 
--route-table-id ${privateRouteTableC.RouteTableId}
--destination-cidr-block 0.0.0.0/0
--nat-gateway-id ${natGatewayC1.NatGatewayId}`);
