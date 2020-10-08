const exec = require('../utilities/exec');
const file = require('../utilities/file');
const util = require('../utilities/util');
const vpcs = require('../network/get_vpcs');
const subnets = require('../network/get_subnets');
const keys = require('../storage/get_keys');
const certificate = require('../domain/get_certificate');
const securityGroups = require('../network/get_security_groups');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;
const s3BucketUrl = `s3://${process.env.DOMAIN_NAME}-kops-state`;

exec(`kops create secret sshpublickey admin -i ~/.ssh/id_rsa.pub --name k8s-cluster.example.com --state ${s3BucketUrl}`);

// Use kops tool (as it was intended) to generate configuration data
// TODO: Convert kops command's yaml/text output to JS object
const cluster1ConfigYaml = exec(`kops create cluster
--dry-run
--name cluster1.${process.env.DOMAIN_NAME}
--cloud aws
--api-ssl-certificate ${certificate.CertificateArn}
--state=${s3BucketUrl}
--topology private
--bastion="true"
--vpc ${vpcs.region1.VpcId}
--subnets ${subnets.region1.privateSubnetA, subnets.region1.privateSubnetB, subnets.region1.privateSubnetC}
--network-cidr 10.101.0.0/16
--networking cni
--ssh-public-key ${keys.asymmetric1.PublicKey}
--ssh-access ${vpcs.region1.Cidr}
--etcd-storage-type s3
--zones ${region1}a,${region1}b,${region1}c
--node-count 3
--node-size m4.large
--node-security-groups ${securityGroups.privateNetwork1},${securityGroups.httpInternet1}
--master-zones ${region1}a,${region1}b,${region1}c
--master-count 3
--master-size m4.large
--master-security-groups ${securityGroups}
--yes`);

const cluster1Config = util.getObjectFromYaml(cluster1ConfigYaml);

// Configure AWS IAM authentication: https://aws.amazon.com/blogs/opensource/deploying-aws-iam-authenticator-kubernetes-kops/
cluster1Config.spec.authentication.aws = {}
cluster1Config.spec.authorization.rbac = {}

file.writeYaml(cluster1Config, `./cluster1Config.yaml`);
exec(`kops create cluster -f cluster1Config.yaml`);

// TODO: validate cluster status response
exec(`kops validate cluster`);

// https://github.com/kubernetes/kops/blob/master/docs/cli/kops_export.md
exec(`kops export kubecfg kubernetes-cluster.example.com --kubeconfig ./kubeconfig.yaml`);
exec(`kubectl --kubeconfig ./kubeconfig.yaml --version`);

// TODO: region 2 cluster

// TODO: remove all this because aws iam roles need to be used so users don't have to alter their credentials
// https://docs.bitnami.com/tutorials/configure-rbac-in-your-kubernetes-cluster/#use-case-1-create-user-with-limited-namespace-access
// exec(`openssl genrsa -out employee.key 2048`);
// exec(`openssl req -new -key employee.key -out employee.csr -subj "/CN=employee/O=bitnami"`);
// exec(`openssl x509 -req -in employee.csr -CA CA_LOCATION/ca.crt -CAkey CA_LOCATION/ca.key -CAcreateserial -out employee.crt -days 500`);
// exec(`kubectl config set-credentials employee --client-certificate=/home/employee/.certs/employee.crt  --client-key=/home/employee/.certs/employee.key`);
// exec(`kubectl config set-context employee-context --cluster=minikube --namespace=office --user=employee`);
// exec(`kubectl --context=employee-context get pods`);
