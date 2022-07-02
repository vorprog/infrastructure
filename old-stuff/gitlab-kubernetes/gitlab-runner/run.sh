#!/bin/bash
# https://docs.gitlab.com/runner/register/index.html

docker run --detach --rm --it --name gitlab-runner --restart always \
     --volume /srv/gitlab-runner/config:/etc/gitlab-runner \
     --volume /var/run/docker.sock:/var/run/docker.sock \
     gitlab/gitlab-runner:latest register