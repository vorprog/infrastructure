const exec = require('../../utilities/exec');

exec(`aws iam delete-user --user-name rsnider`);
exec(`aws iam delete-user --user-name mroberts`);
