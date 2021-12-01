# CLOUD INFRASTRUCTURE

A set of node scripts that utilize the [AWS CLI](https://aws.amazon.com/cli/) with other tools to help create/destroy cloud resources and deploy applications. Instead of storing state, scripts identify resources based on name conventions.

## Pre-requisites

AKA: Things that are not really disposable/ephemeral and so less sensical to automate this way.

- AWS account
- Registered domain name
- AWS Route53 hosted zone for the domain
- AWS ACM validated public certificate for the domain
- Name Server (NS) and Start of Authority (SOA) records for the domain in AWS Route53 
- Docker

## Get started

```docker build --tag cloud-infrastructure```

```
docker run \
--env DOMAIN_NAME=example-route53-domain.com \
--env AWS_SECRET_KEY_ID=????????? \
--env AWS_SECRET_ACCESS_KEY=?????? \
--env AWS_DEFAULT_REGION=us-west-2 \
--env AWS_SECONDARY_REGION=us-east-1 \
--tty \
--interactive \
cloud-infrastructure \
node scripts/test.js
```

## Goals

1. Design highly scalable infrastructure utilizing basic (cheap) AWS resources like S3 and AutoScaling Groups.
2. Provide a simpler method to terraform/cloudformation that doesn't rely on persistent state.
3. Put the concept of infrastructure as code (IAC) to full use by designing a way to destroy and re-create resources on a schedule
4. Save extra money by having ephemeral cloud resources that are created/destroyed on a schedule.
5. Provide a tool that is lightweight but easier to work with than a bunch of bash scripts.

## Notes

- An analysis of (Global Ping Statistics)[https://wondernetwork.com/pings] found that AWS's US West 2 (Oregon) combined with US East 1 (Virginia) are essentially the best pair of regions to have low latency across the globe. They are also the most affordable. Mumbai was an affordable alternative region but actually had worse latency to much of Asia and Eastern Europe than select US regions did.

- AWS Resource Types for tagging: "capacity-reservation"|"client-vpn-endpoint"|"customer-gateway"|"carrier-gateway"|"dedicated-host"|"dhcp-options"|"egress-only-internet-gateway"|"elastic-ip"|"elastic-gpu"|"export-image-task"|"export-instance-task"|"fleet"|"fpga-image"|"host-reservation"|"image"|"import-image-task"|"import-snapshot-task"|"instance"|"instance-event-window"|"internet-gateway"|"ipv4pool-ec2"|"ipv6pool-ec2"|"key-pair"|"launch-template"|"local-gateway"|"local-gateway-route-table"|"local-gateway-virtual-interface"|"local-gateway-virtual-interface-group"|"local-gateway-route-table-vpc-association"|"local-gateway-route-table-virtual-interface-group-association"|"natgateway"|"network-acl"|"network-interface"|"network-insights-analysis"|"network-insights-path"|"placement-group"|"prefix-list"|"replace-root-volume-task"|"reserved-instances"|"route-table"|"security-group"|"security-group-rule"|"snapshot"|"spot-fleet-request"|"spot-instances-request"|"subnet"|"traffic-mirror-filter"|"traffic-mirror-session"|"traffic-mirror-target"|"transit-gateway"|"transit-gateway-attachment"|"transit-gateway-connect-peer"|"transit-gateway-multicast-domain"|"transit-gateway-route-table"|"volume"|"vpc"|"vpc-endpoint"|"vpc-endpoint-service"|"vpc-peering-connection"|"vpn-connection"|"vpn-gateway"|"vpc-flow-log"
