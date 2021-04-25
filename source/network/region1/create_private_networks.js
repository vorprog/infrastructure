const exec = require('../utilities/exec');
const vpc = require('./get_vpc');
const subnets = require('./get_subnets');
const transitGateway = require('./get_transit_gateway');

const elasticIpA = exec(`aws ec2 allocate-address
--domain vpc
--tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_a}]'`);

const elasticIpB = exec(`aws ec2 allocate-address
--domain vpc
--tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_b}]'`);

const elasticIpC = exec(`aws ec2 allocate-address
--domain vpc
--tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_c}]'`);

const natGatewayA = exec(`aws ec2 create-nat-gateway 
--allocation-id ${elasticIpA.AllocationId}
--subnet-id ${subnets.privateSubnetA.SubnetId}
--tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_a}]'
--query NatGateway`);

const natGatewayB = exec(`aws ec2 create-nat-gateway
--allocation-id ${elasticIpB.AllocationId}
--subnet-id ${subnets.privateSubnetB.SubnetId}
--tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_b}]'
--query NatGateway`);

const natGatewayC = exec(`aws ec2 create-nat-gateway
--allocation-id ${elasticIpC.AllocationId}
--subnet-id ${subnets.privateSubnetC.SubnetId}
--tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_c}]'
--query NatGateway`);

const privateRouteTableA = exec(`aws ec2 create-route-table 
--vpc-id ${vpc.VpcId}
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]'
--query RouteTable`);

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
--nat-gateway-id ${natGatewayA.NatGatewayId}`);

const privateRouteTableB = exec(`aws ec2 create-route-table 
--vpc-id ${vpc.VpcId}
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]'
--query RouteTable`);

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
--nat-gateway-id ${natGatewayB.NatGatewayId}`);

const privateRouteTableC = exec(`aws ec2 create-route-table
--vpc-id ${vpc.VpcId}
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]'
--query RouteTable`);

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
--nat-gateway-id ${natGatewayC.NatGatewayId}`);
