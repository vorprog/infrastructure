const exec = require('../../utilities/exec');

exec(`aws iam remove-user-from-group --user-name rsnider --group-name administrators`);
exec(`aws iam delete-group-policy --group-name administrators --policy-name administrator`);
exec(`aws iam delete-group-policy --group-name administrators --policy-name mfa_requirement`);
exec(`aws iam delete-group --group-name administrators`);

exec(`aws iam remove-user-from-group --user-name mroberts --group-name developers`);
exec(`aws iam delete-group-policy --group-name developers --policy-name read_only`);
exec(`aws iam delete-group-policy --group-name developers --policy-name mfa_requirement`);
exec(`aws iam delete-group --group-name developers`);
