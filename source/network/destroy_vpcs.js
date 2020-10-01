const exec = require('../utilities/exec');
const transitGateway = require('./getters/transit_gateway');
const subnetsRegion1 = require('./getters/subnets_region1');
const subnetsRegion2 = require('./getters/subnets_region2');
const vpc1 = require('./getters/vpc_region1');
const vpc2 = require('./getters/vpc_region2');

exec(`aws ec2 delete-transite-gateway --transit-gateway-id ${transitGateway.TransitGatewayId}`)

exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.privateSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.privateSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.privateSubnetC.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.publicSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.publicSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_DEFAULT_REGION} --subnet-id ${subnetsRegion1.publicSubnetC.SubnetId}`);

exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.privateSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.privateSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.privateSubnetC.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.publicSubnetA.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.publicSubnetB.SubnetId}`);
exec(`aws ec2 delete-subnet --region ${process.env.AWS_SECONDARY_REGION} --subnet-id ${subnetsRegion2.publicSubnetC.SubnetId}`);

exec(`aws ec2 delete-vpc --region ${process.env.AWS_DEFAULT_REGION} --vpc-id ${vpc1.VpcId}`);
exec(`aws ec2 delete-vpc --region ${process.env.AWS_SECONDARY_REGION} --vpc-id ${vpc2.VpcId}`);
