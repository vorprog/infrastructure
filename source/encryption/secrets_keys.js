const aws = require('@pulumi/aws');

module.exports.secrets_us_east_1 = new aws.kms.Key(`secrets_us_east_1`, {});
module.exports.secrets_us_west_2 = new aws.kms.Key(`secrets_us_west_2`, {});
module.exports.secrets_ap_south_1 = new aws.kms.Key(`secrets_ap_south_1`, {});
