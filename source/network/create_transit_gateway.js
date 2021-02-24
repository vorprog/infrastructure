const exec = require('../utilities/util');

exec(`aws ec2 create-transit-gateway --tag-specifications 'ResourceType=transit-gateway,Tags=[{Key=Name,Value=main}]' --query 'TransiteGateway'`);