#!/usr/bin/env bash

docker run \
--volume aws-credentials.ini:/root/.aws/credentials \
--env ORGANIZATION_NAME=vorprog \
--env AWS_DEFAULT_REGION=us-west-2 \
--env AWS_SECONDARY_REGION=us-east-1 \
--tty \
cloud-infrastructure # TODO: reference remote image url from docker hub
