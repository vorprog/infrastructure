# CLOUD INFRASTRUCTURE

A set of node scripts that utilize the [AWS CLI](https://aws.amazon.com/cli/) with other tools to help build standard cloud resources, kubernetes infrastructure, and deploy specified applications to clusters.

## Pre-requisites

- AWS account
- Registered domain name
- AWS Route53 hosted zone for the domain
- AWS ACM validated public certificate for the domain
- Name Server (NS) and Start of Authority (SOA) records for the domain in AWS Route53 
- `docker` installed

## Commands

Cloud resources can be managed through the `run.sh` script. This script also builds the docker image.

Command format: ```./run.sh <domain name> <source node script>```

Run AWS connectivity test script: ```./run.sh example.com test```

Run all create/destroy scripts in order: 
```./run.sh example.com create```
```./run.sh example.com destroy```

Run specific create/destroy scripts:
```./run.sh example.com iam/create_groups```
```./run.sh example.com iam/destroy_groups```

## Goals

1. Create a more explicit alternative to terraform and AWS cloudformation
2. Design a standard minimal infrastructure for basic kubernetes applications to serve from
3. Put the concept of infrastructure as code (IAC) to full use by designing a way to destroy and re-create resources on a schedule
4. Save money by having ephemeral cloud resources

## Notes

- An analysis of (Global Ping Statistics)[https://wondernetwork.com/pings] found that AWS's US West 2 (Oregon) combined with US East 1 (Virginia) are essentially the best pair of regions to have low latency across the globe. They are also the most affordable. Mumbai was an affordable alternative region but actually had worse latency to much of Asia and Eastern Europe than select US regions did.

- AWS Resource Types for tagging: "capacity-reservation"|"client-vpn-endpoint"|"customer-gateway"|"carrier-gateway"|"dedicated-host"|"dhcp-options"|"egress-only-internet-gateway"|"elastic-ip"|"elastic-gpu"|"export-image-task"|"export-instance-task"|"fleet"|"fpga-image"|"host-reservation"|"image"|"import-image-task"|"import-snapshot-task"|"instance"|"instance-event-window"|"internet-gateway"|"ipv4pool-ec2"|"ipv6pool-ec2"|"key-pair"|"launch-template"|"local-gateway"|"local-gateway-route-table"|"local-gateway-virtual-interface"|"local-gateway-virtual-interface-group"|"local-gateway-route-table-vpc-association"|"local-gateway-route-table-virtual-interface-group-association"|"natgateway"|"network-acl"|"network-interface"|"network-insights-analysis"|"network-insights-path"|"placement-group"|"prefix-list"|"replace-root-volume-task"|"reserved-instances"|"route-table"|"security-group"|"security-group-rule"|"snapshot"|"spot-fleet-request"|"spot-instances-request"|"subnet"|"traffic-mirror-filter"|"traffic-mirror-session"|"traffic-mirror-target"|"transit-gateway"|"transit-gateway-attachment"|"transit-gateway-connect-peer"|"transit-gateway-multicast-domain"|"transit-gateway-route-table"|"volume"|"vpc"|"vpc-endpoint"|"vpc-endpoint-service"|"vpc-peering-connection"|"vpn-connection"|"vpn-gateway"|"vpc-flow-log"
