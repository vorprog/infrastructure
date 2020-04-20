const aws = require('@pulumi/aws');

module.exports.vorprog = new aws.route53.Zone(`vorprog.com`, {});

module.exports.internal_vorprog = new aws.route53.Zone(`internal.vorprog.com`, {});
