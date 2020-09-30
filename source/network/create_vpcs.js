const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;;
const region2 = process.env.AWS_SECONDARY_REGION;

const vpc1 = exec(`aws ec2 create-vpc --region ${region1} --cidr-block 10.101.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).Vpc;
const vpc2 = exec(`aws ec2 create-vpc --region ${region2} --cidr-block 10.102.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).Vpc;

const privateSubnetA1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.0.0/20 --availability-zone ${region1}a --vpc-id ${vpc1.VpcId}`).Subnet;
const privateSubnetB1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.16.0/20 --availability-zone ${region1}b --vpc-id ${vpc1.VpcId}`).Subnet;
const privateSubnetC1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.32.0/20 --availability-zone ${region1}c --vpc-id ${vpc1.VpcId}`).Subnet;
const publicSubnetA1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.48.0/20 --availability-zone ${region1}a --vpc-id ${vpc1.VpcId}`).Subnet;
const publicSubnetB1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.64.0/20 --availability-zone ${region1}b --vpc-id ${vpc1.VpcId}`).Subnet;
const publicSubnetC1 = exec(`aws ec2 create-subnet --region ${region1} --cidr-block 10.101.80.0/20 --availability-zone ${region1}c --vpc-id ${vpc1.VpcId}`).Subnet;

const privateSubnetA2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.0.0/20 --availability-zone ${region2}a --vpc-id ${vpc2.VpcId}`).Subnet;
const privateSubnetB2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.16.0/20 --availability-zone ${region2}b --vpc-id ${vpc2.VpcId}`).Subnet;
const privateSubnetC2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.32.0/20 --availability-zone ${region2}c --vpc-id ${vpc2.VpcId}`).Subnet;
const publicSubnetA2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.48.0/20 --availability-zone ${region2}a --vpc-id ${vpc2.VpcId}`).Subnet;
const publicSubnetB2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.64.0/20 --availability-zone ${region2}b --vpc-id ${vpc2.VpcId}`).Subnet;
const publicSubnetC2 = exec(`aws ec2 create-subnet --region ${region2} --cidr-block 10.102.80.0/20 --availability-zone ${region2}c --vpc-id ${vpc2.VpcId}`).Subnet;

// TODO: DNS support?
const transitGateway = exec(`aws ec2 create-transit-gateway`).TransitGateway;
exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region1} --vpc-id ${vpc1.VpcId} --transit-gateway-id ${transitGateway.TransitGatewayId} \
--subnet-ids "${privateSubnetA1.SubnetId} ${privateSubnetB1.SubnetId} ${privateSubnetC1.SubnetId} ${publicSubnetA1.SubnetId} ${publicSubnetB1.SubnetId} ${publicSubnetC1.SubnetId}"`);
exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region2} --vpc-id ${vpc2.VpcId} --transit-gateway-id ${transitGateway.TransitGatewayId} \
--subnet-ids "${privateSubnetA2.SubnetId} ${privateSubnetB2.SubnetId} ${privateSubnetC2.SubnetId} ${publicSubnetA2.SubnetId} ${publicSubnetB2.SubnetId} ${publicSubnetC2.SubnetId}"`);

const elasticIpA1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);
const elasticIpB1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);
const elasticIpC1 = exec(`aws ec2 allocate-address --region ${region1} --domain vpc`);

const elasticIpA2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);
const elasticIpB2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);
const elasticIpC2 = exec(`aws ec2 allocate-address --region ${region2} --domain vpc`);

const natGatewayA1 = exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpA1.AllocationId} --subnet-id ${privateSubnetA1.SubnetId}`).NatGateway;
const natGatewayB1= exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpB1.AllocationId} --subnet-id ${privateSubnetB1.SubnetId}`).NatGateway;
const natGatewayC1 = exec(`aws ec2 create-nat-gateway --region ${region1} --allocation-id ${elasticIpC1.AllocationId} --subnet-id ${privateSubnetC1.SubnetId}`).NatGateway;

const natGatewayA2 = exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpA2.AllocationId} --subnet-id ${privateSubnetA2.SubnetId}`).NatGateway;
const natGatewayB2= exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpB2.AllocationId} --subnet-id ${privateSubnetB2.SubnetId}`).NatGateway;
const natGatewayC2 = exec(`aws ec2 create-nat-gateway --region ${region2} --allocation-id ${elasticIpC2.AllocationId} --subnet-id ${privateSubnetC2.SubnetId}`).NatGateway;

const internetGateway1 = exec(`aws ec2 create-internet-gateway --region ${region1} --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).InternetGateway;
const internetGateway2 = exec(`aws ec2 create-internet-gateway --region ${region2} --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).InternetGateway;

exec(`aws ec2 attach-internet-gateway --region ${region1} --internet-gateway-id ${internetGateway1.InternetGatewayId} --vpc-id ${vpc1.VpcId}`);
exec(`aws ec2 attach-internet-gateway --region ${region2} --internet-gateway-id ${internetGateway2.InternetGatewayId} --vpc-id ${vpc2.VpcId}`);

const publicRouteTable1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetA1.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetB1.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetC1.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway1.InternetGatewayId}`);

const publicRouteTable2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetA2.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetB2.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetC2.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 20.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway2.InternetGatewayId}`);

const privateRouteTableA1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableA1.RouteTableId} --subnet-id ${privateSubnetA1.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableA1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayA1.NatGatewayId}`);
const privateRouteTableB1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableB1.RouteTableId} --subnet-id ${privateSubnetB1.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableB1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayB1.NatGatewayId}`);
const privateRouteTableC1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${privateRouteTableC1.RouteTableId} --subnet-id ${privateSubnetC1.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${privateRouteTableC1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayC1.NatGatewayId}`);

const privateRouteTableA2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableA2.RouteTableId} --subnet-id ${privateSubnetA2.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 20.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableA2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayA2.NatGatewayId}`);
const privateRouteTableB2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableB2.RouteTableId} --subnet-id ${privateSubnetB2.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 20.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableB2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayB2.NatGatewayId}`);
const privateRouteTableC2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${privateRouteTableC2.RouteTableId} --subnet-id ${privateSubnetC2.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 20.0.0.0/0 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${privateRouteTableC2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --nat-gateway-id ${natGatewayC2.NatGatewayId}`);
