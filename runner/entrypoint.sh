#!/bin/bash

nohup netcat -lk 3000 &

/gh-runner/config.sh --url https://github.com/$GH_REPOSITORY --token $GH_RUNNER_TOKEN
/gh-runner/run.sh
