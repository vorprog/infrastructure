const exec = require('../utilities/exec');
const file = require('../utilities/file');

const accountId = exec(`aws sts get-caller-identity`).Account;

const adminRoleMapping = `clusterID: cluster1.${process.env.DOMAIN_NAME}
server:
  mapRoles:
  - roleARN: arn:aws:iam::${accountId}:role/KubernetesAdmin
    username: kubernetes-admin
    groups:
    - system:masters`;

const awsRoleConfig = {
  apiVersion: `v1`,
  kind: `ConfigMap`,
  metadata: {
    namespace: `kube-system`,
    name: `aws-iam-authenticator`,
    labels: {
      "k8s-app": `aws-iam-authenticator`
    }
  },
  data: {
    "config.yaml": adminRoleMapping
  }
};

file.writeYaml(awsRoleConfig, `./awsConfigMap.yaml`);
exec(`kubectl apply -f awsConfigMap.yaml`);
