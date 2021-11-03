module.exports = (config) => {
  const filename = `actions-runner-linux-arm64-${config.actionsRunnerVersion}.tar.gz`

  return `#!/bin/bash

mkdir actions-runner
cd actions-runner
curl -o ${filename} -L https://github.com/actions/runner/releases/download/v${config.actionsRunnerVersion}/${filename}
tar xzf ./${filename}

./config.sh --url https://github.com/vorprog/vorprog --token $GH_TOKEN # TODO: default to normal tags
# ./bin/installdependencies.sh
# ./run.sh
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
`;
};