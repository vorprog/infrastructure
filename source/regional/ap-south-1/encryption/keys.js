const aws = require('@pulumi/aws');
const options = require('../../../options');

module.exports.secrets = new aws.kms.Key(`secrets`, {}, options.ap_south_1);
