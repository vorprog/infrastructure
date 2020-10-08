const exec = require('../utilities/exec');
const subnets = require('./get_subnets')

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.privateSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.privateSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.privateSubnetC.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.publicSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.publicSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region1} --subnet-id ${subnets.region1.publicSubnetC.SubnetId}`);

exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.privateSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.privateSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.privateSubnetC.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.publicSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.publicSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${region2} --subnet-id ${subnets.region2.publicSubnetC.SubnetId}`);
