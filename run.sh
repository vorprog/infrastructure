#!/usr/bin/env bash

echo -n CLOUD_INFRASTRUCTURE_ACCESS_KEY_ID: 
read -s CLOUD_INFRASTRUCTURE_ACCESS_KEY_ID
echo

echo -n CLOUD_INFRASTRUCTURE_SECRET_ACCESS_KEY: 
read -s CLOUD_INFRASTRUCTURE_SECRET_ACCESS_KEY
echo

docker run \
--env AWS_ACCESS_KEY_ID=$CLOUD_INFRASTRUCTURE_ACCESS_KEY_ID \
--env AWS_SECRET_ACCESS_KEY=$CLOUD_INFRASTRUCTURE_SECRET_ACCESS_KEY \
--env ORGANIZATION_NAME=vorprog \
--env AWS_DEFAULT_REGION=us-west-2 \
--env AWS_SECONDARY_REGION=us-east-1 \
--interactive \
--tty \
--entrypoint /bin/bash node source/main.js $1
cloud-infrastructure:latest # TODO: reference remote image url from docker hub
