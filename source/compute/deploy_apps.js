const exec = require('../utilities/exec');
const util = require('../utilities/util');

const appRepositories = []; // TODO

util.each(appRepositories, repoUrl => {
  // Download production manifests directory
  exec(`git clone ${repoUrl} --single-branch --branch master --no-checkout source/iam --depth 1 current_app_repo`);
  exec(`git sparse-checkout init --cone`); // to fetch only root files
  exec(`git sparse-checkout set manifests/production`);

  // Decrypt and apply secrets
  const secretFiles = exec(`ls current_app_repo/manifests/production/secrets`).split(`\n`);
  util.each(secretFiles, secretFile => {
    exec(`sops --decrypt current_app_repo/manifests/production/secrets/${secretFile} | kubectl apply --filename -`);
  });
  exec(`rm -rf current_app_repo/manifests/production/secrets`);
  
  // Apply all other app resources
  exec(`kubectl apply --filename current_app_repo/manifests/production`);
  exec(`rm -rf current_app_repo`);
});
