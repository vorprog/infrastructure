// the entire user data script will be generated from infrastrcture node script . . . sops files will also be in that infrastructure node script
// there will be a unique launch template and user data for each deployment
// ami resources are also creatd via node scripts in infrastructre repo . . . but how will old ones get cleaned up?

// for methods to convert environment variable json: https://newbedev.com/exporting-json-to-environment-variables
module.exports = (config) => `
#!/bin/bash

export SECRET_DATA=$(aws secretsmanager get-secret-value --secret-id ${config.secretName} --query '.SecretString')
$(jq -r 'keys[] as $k | "export \\($k)=\\(.[$k])"' file.json)

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