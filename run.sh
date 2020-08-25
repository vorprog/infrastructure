#!/usr/bin/env bash

SCRIPT_PATH=`pwd`

docker run \
--volume $SCRIPT_PATH/aws-credentials.ini:/root/.aws/credentials \
--env ORGANIZATION_NAME=vorprog \
--env AWS_PROFILE=cloud-infrastructure \
--env AWS_DEFAULT_REGION=us-west-2 \
--env AWS_SECONDARY_REGION=us-east-1 \
--tty \
--interactive \
cloud-infrastructure /bin/bash # TODO: reference remote image url from docker hub
