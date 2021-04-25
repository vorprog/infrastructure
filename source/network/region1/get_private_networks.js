const exec = require('../utilities/exec');

const elasticIpA = exec(`aws ec2 describe-address --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_a}]'`);
const elasticIpB = exec(`aws ec2 describe-address --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_b}]'`);
const elasticIpC = exec(`aws ec2 describe-address --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=private_c}]'`);

const natGatewayA = exec(`aws ec2 describe-nat-gateway --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_a}]' --query NatGateway`);
const natGatewayB = exec(`aws ec2 describe-nat-gateway --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_b}]' --query NatGateway`);
const natGatewayC = exec(`aws ec2 describe-nat-gateway --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=private_c}]' --query NatGateway`);

const routeTableA = exec(`aws ec2 create-route-table --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=private_a}]' --query RouteTable`);
const routeTableB = exec(`aws ec2 create-route-table --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=private_b}]' --query RouteTable`);
const routeTableC = exec(`aws ec2 create-route-table --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=private_c}]' --query RouteTable`);

module.exports = {
  elasticIpAddress: {
    a: elasticIpA,
    b: elasticIpB,
    c: elasticIpC
  },
  natGateway: {
    a: natGatewayA,
    b: natGatewayB,
    c: natGatewayC
  },
  routeTable: {
    a: routeTableA,
    b: routeTableB,
    c: routeTableC
  }
};
