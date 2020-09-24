const exec = require('../utilities/exec');
const each = require('lodash.map');

// TODO: should docker hub be used instead?

const applications = [ "ui", "api"]; // TODO: each application will need a repository

each(applications, applicationName => {
  exec(`aws ecr create-repository --repository-name ${applicationName}`);
});
