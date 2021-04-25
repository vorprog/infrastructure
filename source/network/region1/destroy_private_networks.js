const exec = require('../utilities/exec');
const subnets = require('./get_subnets')

exec(`aws ec2 delete-subnet --subnet-id ${subnets.privateSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --subnet-id ${subnets.privateSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --subnet-id ${subnets.privateSubnetC.SubnetId}`);
exec(`aws ec2 delete-subnet --subnet-id ${subnets.publicSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --subnet-id ${subnets.publicSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --subnet-id ${subnets.publicSubnetC.SubnetId}`);
