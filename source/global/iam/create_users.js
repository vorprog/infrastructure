const exec = require('../../utilities/exec');
const generateSecret = require('../../utilities/generate_secret');

exec(`aws iam create-user --user-name rsnider`);
exec(`aws iam create-login-profile --user-name rsnider --password ${generateSecret()} --password-reset-required`);

exec(`aws iam create-user --user-name mroberts`);
exec(`aws iam create-login-profile --user-name mroberts --password ${generateSecret()} --password-reset-required`);

