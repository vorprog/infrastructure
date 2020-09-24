const exec = require(`./utilities/exec`);

exec(`aws --version`);
exec(`echo $AWS_PROFILE`);
exec(`echo $AWS_DEFAULT_REGION`);
exec(`echo $AWS_SECONDARY_REGION`);
exec(`echo $DOMAIN_NAME`);
exec(`aws sts get-caller-identity`);
