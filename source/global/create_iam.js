const utilities = require('../utilities');
const state = require('../state');

module.exports = async () => {
  // state.mfaRequirementPolicy = utilities.execute(`aws iam create-policy --policy-name mfa_requirement --policy-document file:///root/source/global/iam/policies/mfa_requirement.json`).parseJson();
  // state.administratorPolicy = utilities.execute(`aws iam create-policy --policy-name administrators --policy-document file:///root/source/global/iam/policies/administrator.json`).parseJson();
  // state.readOnlyPolicy = utilities.execute(`aws iam create-policy --policy-name read_only --policy-document file:///root/source/global/iam/policies/read_only.json`).parseJson();

  state.administratorsGroup = utilities.execute(`aws iam create-group --group-name administrators`);
  state.administratorsMfaPolicyAttachment = utilities.execute(`aws iam put-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
  state.administratorsPolicyAttachment = utilities.execute(`aws iam put-group-policy --group-name administrators --policy-document file:///root/source/global/iam/policies/administrator.json --policy-name administrator`);

  state.developersGroup = utilities.execute(`aws iam create-group --group-name developers`);
  state.developersMfaPolicyAttachment = utilities.execute(`aws iam put-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/mfa_requirement.json --policy-name mfa_requirement`);
  state.developersReadOnlyPolicyAttachment = utilities.execute(`aws iam put-group-policy --group-name developers --policy-document file:///root/source/global/iam/policies/read_only.json --policy-name read_only`);
};
