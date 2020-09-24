const exec = require('../../utilities/exec');
const state = require('../../state');

exec(`aws s3api create-bucket --bucket ${state.domain}-kops-state --region ${state.region1} --create-bucket-configuration LocationConstraint=${state.region1}`);
