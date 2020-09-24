// https://github.com/kubernetes/kops/blob/master/docs/manifests_and_customizing_via_api.md#exporting-a-cluster

// kops create -f $NAME.yaml
// kops create secret --name $NAME sshpublickey admin -i ~/.ssh/id_rsa.pub
// kops update cluster $NAME --yes
// kops rolling-update cluster $NAME --yes

const domain = `example.com`;
const s3Bucket = `s3://vorprog-state-store/k8s.${domain}`;
const region = `us-west-2`;
const vpcId = `vpc-6335dd1a`;
const ami = `kope.io/k8s-1.6-debian-jessie-amd64-hvm-ebs-2017-05-02`;

const cluster = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `Cluster`,
  metadata: {
    name: `k8s.${domain}`
  },
  spec: {
    api: {
      loadBalancer: {
        type: `Public`
      }
    },
    authorization: {
      alwaysAllow: {}
    },
    channel: `stable`,
    cloudProvider: `aws`,
    configBase: s3Bucket,
    etcdClusters: [
      {
        etcdMembers: [
          {
            instanceGroup: `master-${region}a`,
            name: `a`
          },
          {
            instanceGroup: `master-${region}b`,
            name: `b`
          },
          {
            instanceGroup: `master-${region}c`,
            name: `c`
          }
        ],
        name: `main`
      },
      {
        etcdMembers: [
          {
            instanceGroup: `master-${region}a`,
            name: `a`
          },
          {
            instanceGroup: `master-${region}b`,
            name: `b`
          },
          {
            instanceGroup: `master-${region}c`,
            name: `c`
          }
        ],
        name: `events`
      }
    ],
    kubernetesApiAccess: [
      `0.0.0.0/0`
    ],
    kubernetesVersion: `1.6.6`,
    masterPublicName: `api.k8s.${domain}`,
    networkCIDR: `172.20.0.0/16`,
    networkID: vpcId,
    networking: {
      weave: {}
    },
    nonMasqueradeCIDR: `100.64.0.0/10`,
    sshAccess: [
      `0.0.0.0/0`
    ],
    subnets: [
      {
        cidr: `172.20.32.0/19`,
        name: `${region}a`,
        type: `Private`,
        zone: `${region}a`
      },
      {
        cidr: `172.20.64.0/19`,
        name: `${region}b`,
        type: `Private`,
        zone: `${region}b`
      },
      {
        cidr: `172.20.96.0/19`,
        name: `${region}c`,
        type: `Private`,
        zone: `${region}c`
      },
      {
        cidr: `172.20.0.0/22`,
        name: `utility-${region}a`,
        type: `Utility`,
        zone: `${region}a`
      },
      {
        cidr: `172.20.4.0/22`,
        name: `utility-${region}b`,
        type: `Utility`,
        zone: `${region}b`
      },
      {
        cidr: `172.20.8.0/22`,
        name: `utility-${region}c`,
        type: `Utility`,
        zone: `${region}c`
      }
    ],
    topology: {
      bastion: {
        bastionPublicName: `bastion.k8s.${domain}`
      },
      dns: {
        type: `Public`
      },
      masters: `private`,
      nodes: `private`
    }
  }
};

const bastionInstanceGroup = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `InstanceGroup`,
  metadata: {
    labels: {
      'kops.k8s.io/cluster': `k8s.${domain}`
    },
    name: `bastions`
  },
  spec: {
    image: ami,
    machineType: `t2.micro`,
    maxSize: 1,
    minSize: 1,
    role: `Bastion`,
    subnets: [
      `utility-${region}a`,
      `utility-${region}b`,
      `utility-${region}c`
    ]
  }
};

const masterGroup1 = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `InstanceGroup`,
  metadata: {
    labels: {
      'kops.k8s.io/cluster': `k8s.${domain}`
    },
    name: `master-${region}a`
  },
  spec: {
    image: ami,
    machineType: `m4.large`,
    maxSize: 1,
    minSize: 1,
    role: `Master`,
    subnets: [
      `${region}a`
    ]
  }
};

const masterGroup2 = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `InstanceGroup`,
  metadata: {
    labels: {
      'kops.k8s.io/cluster': `k8s.${domain}`
    },
    name: `master-${region}b`
  },
  spec: {
    image: ami,
    machineType: `m4.large`,
    maxSize: 1,
    minSize: 1,
    role: `Master`,
    subnets: [
      `${region}b`
    ]
  }
};

const masterGroup3 = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `InstanceGroup`,
  metadata: {
    labels: {
      'kops.k8s.io/cluster': `k8s.${domain}`
    },
    name: `master-${region}c`
  },
  spec: {
    image: ami,
    machineType: `m4.large`,
    maxSize: 1,
    minSize: 1,
    role: `Master`,
    subnets: [
      `${region}c`
    ]
  }
};

const nodesGroup = {
  apiVersion: `kops.k8s.io/v1alpha2`,
  kind: `InstanceGroup`,
  metadata: {
    labels: {
      'kops.k8s.io/cluster': `k8s.${domain}`
    },
    name: `nodes`
  },
  spec: {
    image: ami,
    machineType: `m4.xlarge`,
    maxSize: 3,
    minSize: 3,
    role: `Node`,
    subnets: [
      `${region}a`,
      `${region}b`,
      `${region}c`
    ]
  }
};
