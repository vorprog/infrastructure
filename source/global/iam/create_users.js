const exec = require('../../utilities/exec');

exec(`aws iam create-user --name rsnider`);
exec(`aws iam create-user --name mroberts`);
