const exec = require('@vorprog/exec');
// TODO: add delay between commands

const nameTag = `actions_runner`;

const routeTable = exec(`aws ec2 describe-route-tables --filter 'Name=tag:Name,Values=${nameTag}' --query 'RouteTables[0]'`);
exec(`aws ec2 disassociate-route-table --association-id ${routeTable.Associations[0].RouteTableAssociationId}`);
exec(`aws ec2 delete-route --route-table-id ${routeTable.RouteTableId} --destination-cidr-block 0.0.0.0/0`);
exec(`aws ec2 delete-route --route-table-id ${routeTable.RouteTableId} --destination-cidr-block 10.0.0.0/8`);
exec(`aws ec2 delete-route-table --route-table-id ${routeTable.RouteTableId}`);

const natGateway = exec(`aws ec2 describe-nat-gateways --filter 'Name=tag:Name,Values=${nameTag}' --query 'NatGateways[0]'`);
exec(`aws ec2 delete-nat-gateway --nat-gateway-id ${natGateway.NatGatewayId}`);

const elasticIp = exec(`aws ec2 describe-addresses --filter 'Name=tag:Name,Values=${nameTag}' --query 'Addresses[0]'`)
exec(`aws ec2 release-address --allocation-id ${elasticIp.AllocationId}`);

const tgwVpcAttachment = exec(`aws ec2 describe-transit-gateway-vpc-attachments --filter 'Name=tag:Name,Values=${nameTag}' --query 'TransitGatewaysVpcAttachments[0]'`)
exec(`aws ec2 delete-transit-gateway-vpc-attachment --transit-gateway-attachment-id ${tgwVpcAttachment.TransitGatewayAttachmentId}`);

const subnet = exec(`aws ec2 describe-subnets --filter 'Name=tag:Name,Values=${nameTag}' --query 'Subnets[0]'`);
exec(`aws ec2 delete-subnet --subnet-id ${subnet.SubnetId}`);

const vpc = exec(`aws ec2 describe-vpcs --filter 'Name=tag:Name,Values=${nameTag}' --query 'Vpcs[0]'`);
exec(`aws ec2 delete-vpc --vpc-id ${vpc.VpcId}`);

const transitGateway = exec(`aws ec2 describe-transit-gateways --filter 'Name=tag:Name,Values=main' --query 'TransitGateways[0]'`);
exec(`aws ec2 delete-transit-gateway --transit-gateway-id ${transitGateway.TransitGatewayId}`);
