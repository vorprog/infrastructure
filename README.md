# CLOUD INFRASTRUCTURE

## Pre-requisites

- AWS account
- Registered domain `<organization-name>`.
- AWS Route53 hosted zone for the domain.
- AWS ACM validated public certificate for the domain.
- Name Server (NS) and Start of Authority (SOA) records for the domain in AWS Route53. 
- `docker` installed.
- Local `aws-credentials.ini` file with `[cloud-infrastructure]` profile credentials with appropriate permissions.

## Commands

```./run.sh <domain name> <source node script>```

```./run.sh example.com test```

```./run.sh example.com create```

```./run.sh example.com destroy```

```./run.sh example.com global/iam/create_groups```

```./run.sh example.com global/iam/destroy_groups```
