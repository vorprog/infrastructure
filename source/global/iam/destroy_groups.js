const exec = require('../../utilities/exec');

exec(`aws iam unassign-group --name rsnider --group-name administrators`);
exec(`aws iam delete-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/administrator.json --policy-name administrator`);
exec(`aws iam delete-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
exec(`aws iam delete-group --group-name administrators`);

exec(`aws iam unassign-group --name mroberts --group-name developers`);
exec(`aws iam delete-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/read_only.json --policy-name read_only`);
exec(`aws iam delete-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
exec(`aws iam delete-group --group-name developers`);
