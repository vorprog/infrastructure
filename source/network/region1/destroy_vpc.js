const exec = require('../utilities/exec');
const vpc = require('./get_vpc');

exec(`aws ec2 delete-vpc --vpc-id ${vpc.VpcId}`);
