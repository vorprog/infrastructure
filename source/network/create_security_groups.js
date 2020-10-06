const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

exec(`aws ec2 create-security-group --region ${region1} --group-name private-network --description private-network`);
exec(`aws ec2 authorize-security-group-ingress --region ${region1} --group-name private-network
--ip-permissions IpProtocol=tcp,FromPort=0,ToPort=65535,IpRanges='[{CidrIp=10.0.0.0/8}]'`);

exec(`aws ec2 create-security-group --region ${region1} --group-name http-internet --description http-internet`);
exec(`aws ec2 authorize-security-group-ingress --region ${region1} --group-name http-internet
--ip-permissions IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges='[{CidrIp=0.0.0.0/0}]'`);
exec(`aws ec2 authorize-security-group-ingress --region ${region1} --group-name http-internet
--ip-permissions IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges='[{CidrIp=0.0.0.0/0}]'`);

exec(`aws ec2 create-security-group --region ${region2} --group-name private-network --description private-network`);
exec(`aws ec2 authorize-security-group-ingress --region ${region2} --group-name private-network
--ip-permissions IpProtocol=tcp,FromPort=0,ToPort=65535,IpRanges='[{CidrIp=10.0.0.0/8}]'`);

exec(`aws ec2 create-security-group --region ${region2} --group-name http-internet --description http-internet`);
exec(`aws ec2 authorize-security-group-ingress --region ${region2} --group-name http-internet
--ip-permissions IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges='[{CidrIp=0.0.0.0/0}]'`);
exec(`aws ec2 authorize-security-group-ingress --region ${region2} --group-name http-internet
--ip-permissions IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges='[{CidrIp=0.0.0.0/0}]'`);