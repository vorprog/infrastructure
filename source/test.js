const exec = require(`./utilities/exec`);

exec(`aws --version`);
exec(`echo $AWS_PROFILE, $AWS_DEFAULT_REGION, $AWS_SECONDARY_REGION, $DOMAIN_NAME`);
exec(`aws sts get-caller-identity`);
