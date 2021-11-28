const exec = require('@vorprog/exec');
// TODO: add delay between commands

const transitGateway = exec(`aws ec2 create-transit-gateway
--tag-specifications 'ResourceType=transit-gateway,Tags=[{Key=Name,Value=main}]'
--query 'TransitGateway'`);

const vpc = exec(`aws ec2 create-vpc
--cidr-block 10.255.0.0/16
--tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=actions_runner}]'
--query 'Vpc'`);

const subnet = exec(`aws ec2 create-subnet
--availability-zone ${process.env.AWS_DEFAULT_REGION}a
--vpc-id ${vpc.VpcId}
--cidr-block 10.255.0.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=actions_runner}]'
--query 'Subnet'`);

exec(`aws ec2 create-transit-gateway-vpc-attachment
--transit-gateway-id ${transitGateway.TransitGatewayId}
--vpc-id ${vpc.VpcId}
--subnet-ids "${subnet.SubnetId}"
--tag-specifications 'ResourceType=transit-gateway-attachment,Tags=[{Key=Name,Value=actions_runner}]'`);

const elasticIp = exec(`aws ec2 allocate-address
--domain vpc
--tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=actions_runner}]'
--query 'Address'`);

const natGateway = exec(`aws ec2 create-nat-gateway 
--allocation-id ${elasticIp.AllocationId}
--subnet-id ${subnet.SubnetId}
--tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=actions_runner}]'
--query 'NatGateway'`);

const routeTable = exec(`aws ec2 create-route-table 
--vpc-id ${vpc.VpcId}
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=actions_runner}]'
--query 'RouteTable'`);

exec(`aws ec2 associate-route-table
--route-table-id ${routeTable.RouteTableId}
--subnet-id ${subnet.SubnetId}`);

exec(`aws ec2 create-route 
--route-table-id ${routeTable.RouteTableId}
--destination-cidr-block 10.0.0.0/8
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 create-route 
--route-table-id ${routeTable.RouteTableId}
--destination-cidr-block 0.0.0.0/0
--nat-gateway-id ${natGateway.NatGatewayId}`);
