const exec = require('../utilities/exec');
const util = require('../utilities/util');

const appRepositories = [];

util.each(appRepositories, repoUrl => {
  exec(`curl "${repoUrl}" -o current_app`);
  exec(`unzip current_app.zip`)
  exec(`kubectl apply -f current_app/manifests/production`);
  exec(`rm -rf current_app`);
});
