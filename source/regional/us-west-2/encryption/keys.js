const aws = require('@pulumi/aws');
const options = require('../../../options');

module.exports.secrets = new aws.kms.Key(`secrets`, {}, options.us_west_2);
