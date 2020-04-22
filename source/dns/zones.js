const aws = require('@pulumi/aws');
const options = require('../options');

module.exports.vorprog = new aws.route53.Zone(`vorprog.com`, {}, options.us_west_2);

module.exports.internal_vorprog = new aws.route53.Zone(`internal.vorprog.com`, {}, options.us_west_2);
