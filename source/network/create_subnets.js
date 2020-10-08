const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}a --cidr-block 10.101.0.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}b --cidr-block 10.101.16.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}c --cidr-block 10.101.32.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}a --cidr-block 10.101.48.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_a}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}b --cidr-block 10.101.64.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_b}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region1} --availability-zone ${region1}c --cidr-block 10.101.80.0/20
--vpc-id ${vpc1.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_c}]' --query Subnet`);

exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}a --cidr-block 10.102.0.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_a}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}b --cidr-block 10.102.16.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_b}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}c --cidr-block 10.102.32.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private_c}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}a --cidr-block 10.102.48.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_a}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}b --cidr-block 10.102.64.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_b}]' --query Subnet`);
exec(`aws ec2 create-subnet --region ${region2} --availability-zone ${region2}c --cidr-block 10.102.80.0/20
--vpc-id ${vpc2.VpcId} --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public_c}]' --query Subnet`);
