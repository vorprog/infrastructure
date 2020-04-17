const aws = require('@pulumi/aws');
const providers = require('../providers');

module.exports.secrets_us_east_1 = new aws.kms.Key(`secrets_us_east_1`, {}, providers.us_east_1);
module.exports.secrets_us_west_2 = new aws.kms.Key(`secrets_us_west_2`, {}, providers.us_west_2);
module.exports.secrets_ap_south_1 = new aws.kms.Key(`secrets_ap_south_1`, {}, providers.ap_south_1);
