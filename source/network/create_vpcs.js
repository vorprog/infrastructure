const exec = require('../utilities/exec');

const region1Vpc = exec(`aws ec2 create-vpc --cidr-block 10.101.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`);
const region1SubnetA = exec(`aws ec2 create-subnet --cidr-block 10.101.0.0/20 --availability-zone a --vpc-id ${region1Vpc.VpcId}`);
const region1SubnetB = exec(`aws ec2 create-subnet --cidr-block 10.101.16.0/20 --availability-zone b --vpc-id ${region1Vpc.VpcId}`);
const region1SubnetC = exec(`aws ec2 create-subnet --cidr-block 10.101.32.0/20 --availability-zone c --vpc-id ${region1Vpc.VpcId}`);
const region1PublicSubnetA = exec(`aws ec2 create-subnet --cidr-block 10.101.48.0/20 --availability-zone a --vpc-id ${region1Vpc.VpcId}`);
const region1PublicSubnetB = exec(`aws ec2 create-subnet --cidr-block 10.101.64.0/20 --availability-zone b --vpc-id ${region1Vpc.VpcId}`);
const region1PublicSubnetC = exec(`aws ec2 create-subnet --cidr-block 10.101.80.0/20 --availability-zone c --vpc-id ${region1Vpc.VpcId}`);

const region2Vpc = exec(`aws ec2 create-vpc --cidr-block 10.102.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]' --region ${process.env.AWS_SECONDARY_REGION}`);
const region2SubnetA = exec(`aws ec2 create-subnet --cidr-block 10.102.0.0/20 --availability-zone a --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
const region2SubnetB = exec(`aws ec2 create-subnet --cidr-block 10.102.16.0/20 --availability-zone b --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
const region2SubnetC = exec(`aws ec2 create-subnet --cidr-block 10.102.32.0/20 --availability-zone c --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
const region2PublicSubnetA = exec(`aws ec2 create-subnet --cidr-block 10.102.48.0/20 --availability-zone a --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
const region2PublicSubnetB = exec(`aws ec2 create-subnet --cidr-block 10.102.64.0/20 --availability-zone b --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
const region2PublicSubnetC = exec(`aws ec2 create-subnet --cidr-block 10.102.80.0/20 --availability-zone c --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);

// TODO: DNS support?
const transitGateway = exec(`aws ec2 create-transit-gateway`);
exec(`aws ec2 create-transit-gateway-vpc-attachment --vpc-id ${region1Vpc.VpcId}
--transit-gateway-id ${transitGateway.TransitGatewayId}
--subnet-ids "${region1SubnetA.SubnetId}" ${region1SubnetB.SubnetId}" ${region1SubnetC.SubnetId}"`);
exec(`aws ec2 create-transit-gateway-vpc-attachment --vpc-id ${region2Vpc.VpcId}
--transit-gateway-id ${transitGateway.TransitGatewayId}
--subnet-ids "${region2SubnetA.SubnetId}" ${region2SubnetB.SubnetId}" ${region2SubnetC.SubnetId}"`);

const region1SubnetAElasticIp = exec(`aws ec2 allocate-address --domain vpc`);
const region1SubnetANatGateway = exec(`aws ec2 create-nat-gateway --allocation-id ${region1SubnetAElasticIp.AllocationId} --subnet-id ${region1SubnetA}`);
const region1SubnetAElasticIp = exec(`aws ec2 allocate-address --domain vpc`);
const region1SubnetANatGateway = exec(`aws ec2 create-nat-gateway --allocation-id ${region1SubnetAElasticIp.AllocationId} --subnet-id ${region1SubnetA}`);
const region1InternetGateway = exec(`aws ec2 create-internet-gateway --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`);
exec(`aws ec2 attach-internet-gateway --internet-gateway-id ${region1InternetGateway.InternetGatewayId} --vpc-id ${region1Vpc.VpcId}`);

const region2InternetGateway = exec(`aws ec2 create-internet-gateway --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]' --region ${process.env.AWS_SECONDARY_REGION}`);
exec(`aws ec2 attach-internet-gateway --internet-gateway-id ${region2InternetGateway.InternetGatewayId} --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);

// TODO: add local routes?
const region1RouteTable = exec(`aws ec2 create-route-table --vpc-id ${region1Vpc.VpcId}`);
exec(`aws ec2 create-route --route-table-id ${region1RouteTable.RouteTableId} --destination-cidr-block 0.0.0.0/0
--internet-gateway-id ${region1InternetGateway.InternetGatewayId}`);
exec(`aws ec2 create-route --route-table-id ${region1RouteTable.RouteTableId} --destination-cidr-block 10.102.0.0/16
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

exec(`aws ec2 associate-route-table --route-table-id <value> --subnet-id <value>`);

const region1PublicRouteTable = exec(`aws ec2 create-route-table --vpc-id ${region1Vpc.VpcId}`);
exec(`aws ec2 create-route --route-table-id ${region1RouteTable.RouteTableId} --destination-cidr-block 0.0.0.0/0
--internet-gateway-id ${region1InternetGateway.InternetGatewayId}`);
exec(`aws ec2 create-route --route-table-id ${region1RouteTable.RouteTableId} --destination-cidr-block 10.102.0.0/16
--transit-gateway-id ${transitGateway.TransitGatewayId}`);

const region2RouteTable = exec(`aws ec2 create-route-table --vpc-id ${region2Vpc.VpcId} --region ${process.env.AWS_SECONDARY_REGION}`);
exec(`aws ec2 create-route --route-table-id ${region2RouteTable.RouteTableId} --destination-cidr-block 0.0.0.0/0
--internet-gateway-id ${region1InternetGateway.InternetGatewayId} --region ${process.env.AWS_SECONDARY_REGION}`);
exec(`aws ec2 create-route --route-table-id ${region2RouteTable.RouteTableId} --destination-cidr-block 10.101.0.0/16
--transit-gateway-id ${transitGateway.TransitGatewayId} --region ${process.env.AWS_SECONDARY_REGION}`);

const region2PublicRouteTable = exec(`aws ec2 create-route-table --vpc-id ${region2Vpc.VpcId}`);
exec(`aws ec2 create-route --route-table-id ${region2RouteTable.RouteTableId} --destination-cidr-block 0.0.0.0/0
--internet-gateway-id ${region2InternetGateway.InternetGatewayId}`);
exec(`aws ec2 create-route --route-table-id ${region2RouteTable.RouteTableId} --destination-cidr-block 10.102.0.0/16
--transit-gateway-id ${transitGateway.TransitGatewayId}`);
