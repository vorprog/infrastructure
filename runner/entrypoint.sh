#!/bin/bash

nohup netcat -lk 3000 &

# /actions-runner/config.sh --url https://github.com/$GH_REPOSITORY --token $GH_RUNNER_TOKEN
./config.sh --labels linux,ARM64 --url https://github.com/$GITHUB_ORG --token $RUNNER_ORG_REGISTRATION_TOKEN

# /actions-runner/svc.sh start
# /actions-runner/svc.sh status
/actions-runner/run.sh
