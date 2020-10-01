const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const vpc1 = exec(`aws ec2 create-vpc --region ${region1} --cidr-block 10.101.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).Vpc;
const vpc2 = exec(`aws ec2 create-vpc --region ${region2} --cidr-block 10.102.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=main}]'`).Vpc;

const privateSubnetA1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}a --cidr-block 10.101.0.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]'`).Subnet;
const privateSubnetB1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}b --cidr-block 10.101.16.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]'`).Subnet;
const privateSubnetC1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}c --cidr-block 10.101.32.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]'`).Subnet;
const publicSubnetA1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}a --cidr-block 10.101.48.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_a}]'`).Subnet;
const publicSubnetB1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}b --cidr-block 10.101.64.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_b}]'`).Subnet;
const publicSubnetC1 = exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}c --cidr-block 10.101.80.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_c}]'`).Subnet;

const privateSubnetA2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}a --cidr-block 10.102.0.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]'`).Subnet;
const privateSubnetB2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}b --cidr-block 10.102.16.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]'`).Subnet;
const privateSubnetC2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}c --cidr-block 10.102.32.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]'`).Subnet;
const publicSubnetA2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}a --cidr-block 10.102.48.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_a}]'`).Subnet;
const publicSubnetB2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}b --cidr-block 10.102.64.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_b}]'`).Subnet;
const publicSubnetC2 = exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}c --cidr-block 10.102.80.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_c}]'`).Subnet;

const transitGateway = exec(`aws ec2 create-transit-gateway --tag-specifications 'ResourceType=transit-gateway,Tags=[{Key=Name,Value=main}]'`).TransitGateway;

exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region1} --vpc-id ${vpc1.VpcId} --transit-gateway-id ${transitGateway.TransitGatewayId}
--subnet-ids "${privateSubnetA1.SubnetId} ${privateSubnetB1.SubnetId} ${privateSubnetC1.SubnetId} ${publicSubnetA1.SubnetId} ${publicSubnetB1.SubnetId} ${publicSubnetC1.SubnetId}"`);
exec(`aws ec2 create-transit-gateway-vpc-attachment --region ${region2} --vpc-id ${vpc2.VpcId} --transit-gateway-id ${transitGateway.TransitGatewayId}
--subnet-ids "${privateSubnetA2.SubnetId} ${privateSubnetB2.SubnetId} ${privateSubnetC2.SubnetId} ${publicSubnetA2.SubnetId} ${publicSubnetB2.SubnetId} ${publicSubnetC2.SubnetId}"`);
