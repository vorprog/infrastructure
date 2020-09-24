#!/usr/bin/env bash
set -x

docker build --quiet --tag cloud-infrastructure:latest .

docker run \
--volume $(pwd)/aws-credentials.ini:/root/.aws/credentials \
--env DOMAIN_NAME=$1 \
--env AWS_PROFILE=cloud-infrastructure \
--env AWS_DEFAULT_REGION=us-west-2 \
--env AWS_SECONDARY_REGION=us-east-1 \
--tty \
--interactive \
cloud-infrastructure \
node source/$2
