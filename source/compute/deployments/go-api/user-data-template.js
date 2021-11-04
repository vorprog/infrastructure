module.exports = (config) => `
#!/bin/bash

aws s3 cp ${config.sopsS3Url} ./sops
sops exec-env sops/config.yaml

sudo docker run \\
  --log-driver=fluentd \\
  --log-opt fluentd-address=$FLUENTD_HOST \\
  --log-opt fluentd-sub-second-precision=true \\
  --log-opt tag="docker.{{.ImageName}}.{{.ImageID}}.{{.ID}}" \\
  --env APP_ENVIRONMENT_CONFIGURATION=$APP_ENVIRONMENT_CONFIGURATION \\
  --env APP_SERVER_PORT=$APP_SERVER_PORT \\
  --publish $HOST_PORT:$APP_SERVER_PORT \\
  --restart always \\
  --rm \\
  --detach \\
  --name go-api \\
  go-api:${config.dockerImageTag}
`;
