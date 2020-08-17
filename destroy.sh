#!/usr/bin/env bash

# TODO: docker pull remote image

docker run \
--name cloud-infrastructure-destroy \
--detach \
--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
--env AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
--entrypoint /bin/bash npm run destroy
cloud-infrastructure:latest # TODO: reference remote image url from docker hub
