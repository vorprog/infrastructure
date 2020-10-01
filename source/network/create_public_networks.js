const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const vpc1 = exec(`aws ec2 describe-vpcs --region ${region1}`).Vpcs
const vpc2 = exec(`aws ec2 describe-vpcs --region ${region2}`).Vpcs

const subnets1 = exec(`aws ec2 describe-subnets --region ${region1}`).Subnets;
const subnets2 = exec(`aws ec2 describe-subnets --region ${region2}`).Subnets;

const internetGateway1 = exec(`aws ec2 create-internet-gateway --region ${region1}`).InternetGateway;
const internetGateway2 = exec(`aws ec2 create-internet-gateway --region ${region2}`).InternetGateway;

exec(`aws ec2 attach-internet-gateway --region ${region1} --internet-gateway-id ${internetGateway1.InternetGatewayId} --vpc-id ${vpc1.VpcId}`);
exec(`aws ec2 attach-internet-gateway --region ${region2} --internet-gateway-id ${internetGateway2.InternetGatewayId} --vpc-id ${vpc2.VpcId}`);

const publicRouteTable1 = exec(`aws ec2 create-route-table --region ${region1} --vpc-id ${vpc1.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetA1.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetB1.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --subnet-id ${publicSubnetC1.SubnetId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region1} --route-table-id ${publicRouteTable1.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway1.InternetGatewayId}`);

const publicRouteTable2 = exec(`aws ec2 create-route-table --region ${region2} --vpc-id ${vpc2.VpcId}`).RouteTable;
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetA2.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetB2.SubnetId}`);
exec(`aws ec2 associate-route-table --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --subnet-id ${publicSubnetC2.SubnetId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 10.0.0.0/8 --transit-gateway-id ${transitGateway.TransitGatewayId}`);
exec(`aws ec2 create-route --region ${region2} --route-table-id ${publicRouteTable2.RouteTableId} --destination-cidr-block 0.0.0.0/0 --internet-gateway-id ${internetGateway2.InternetGatewayId}`);
