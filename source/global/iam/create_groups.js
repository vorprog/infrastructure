const exec = require('../../utilities/exec');

exec(`aws iam create-group --group-name administrators`);
exec(`aws iam put-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
exec(`aws iam put-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/administrator.json --policy-name administrator`);
exec(`aws iam add-user-to-group --group-name administrators --user-name rsnider`);

exec(`aws iam create-group --group-name developers`);
exec(`aws iam put-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
exec(`aws iam put-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/read_only.json --policy-name read_only`);
exec(`aws iam add-user-to-group --group-name developers --user-name mroberts`);
