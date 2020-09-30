const exec = require('../utilities/exec');

const kopsStateBucket = exec(`aws s3api create-bucket --bucket ${process.env.DOMAIN_NAME}-kops-state
--region ${process.env.AWS_DEFAULT_REGION} --create-bucket-configuration LocationConstraint=${process.env.AWS_DEFAULT_REGION}`);

const vpcId = "bla"; // TODO
const vpcCidr = "bla"; // TODO
const subnets = "a,b,c"; // TODO
const networkCidr = "blaaa"; // TODO
const zones = "us-west-1a,us-west-1b,us-west-1c"; // TODO
const sslCertificateArn = "<ssl certificate arn>"; // TODO
const securityGroups = "sg-a,sg-b,sg-c"; // TODO

// TODO: --master-security-groups ?
// TODO: --network-cidr ?

const cluster = exec(`kops create cluster k8s-clusters.${process.env.DOMAIN_NAME}
--cloud aws
--api-ssl-certificate ${sslCertificateArn}
--state=s3://${process.env.DOMAIN_NAME}-kops-state-1234
--topology private
--bastion="true"
--vpc ${vpcId}
--subnets ${subnets}
--network-cidr ${networkCidr}
--networking cni
--ssh-access ${vpcCidr}
--etcd-storage-type s3
--zones ${zones}
--node-count 3
--node-size m4.large
--node-security-groups ${securityGroups}
--master-zones ${zones}
--master-count 3
--master-size m4.large
--master-security-groups ${securityGroups}
--yes`);
