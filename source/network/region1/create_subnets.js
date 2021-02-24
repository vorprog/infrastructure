const exec = require('../utilities/exec');
const vpc = require('./get_vpc');

const azPrefix = process.env.AWS_DEFAULT_REGION;

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}a
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.0.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]'
--query Subnet`);

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}b
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.16.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]'
--query Subnet`);

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}c
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.32.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]'
--query Subnet`);

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}a
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.48.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_a}]'
--query Subnet`);

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}b
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.64.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_b}]'
--query Subnet`);

exec(`aws ec2 create-subnet
--availability-zone ${azPrefix}c
--vpc-id ${vpc.VpcId}
--cidr-block 10.101.80.0/20
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_c}]'
--query Subnet`);
