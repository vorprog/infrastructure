#!/bin/bash

##### INSTALL DOCKER #####
bash <(curl --silent https://richardsnider.github.io/install/docker.sh)

###### INSTALL SELF HOSTED GITHUB ACTIONS RUNNER #####
mkdir actions-runner
cd actions-runner

export ACTIONS_RUNNER_VERSION=2.280.3 # TODO: retrieve latest version from github api
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/v$ACTIONS_RUNNER_VERSION/actions-runner-linux-arm64-$ACTIONS_RUNNER_VERSION.tar.gz 
tar xzf ./actions-runner.tar.gz
sudo ./bin/install-dependencies.sh

##### CONFIGURE AND START SELF HOST GITHUB ACTIONS RUNNER #####
export INSTANCE_ID=$(curl http://169.254.169.254/latest/meta-data/instance-id)
export ACTIONS_RUNNER_TOKEN=$(aws ec2 describe-tags --filters "Name=resource-id,Values=$INSTANCE_ID" "Name=Value,Values=ACTIONS_RUNNER_TOKEN")
sudo ./config.sh --url https://github.com/vorprog/infrastructure --token $ACTIONS_RUNNER_TOKEN

sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
