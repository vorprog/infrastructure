const exec = require('../utilities/exec');
const vpcs = require('./get_vpcs');

exec(`aws ec2 delete-vpc --region ${process.env.AWS_DEFAULT_REGION} --vpc-id ${vpcs.region1.VpcId}`);
exec(`aws ec2 delete-vpc --region ${process.env.AWS_SECONDARY_REGION} --vpc-id ${vpcs.region2.VpcId}`);
