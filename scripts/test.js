const exec = require(`@vorprog/exec`);

exec(`aws --version`);
exec(`echo "$AWS_DEFAULT_REGION, $AWS_SECONDARY_REGION, $DOMAIN_NAME"`);
exec(`aws sts get-caller-identity`);
