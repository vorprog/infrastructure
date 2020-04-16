const aws = require('@pulumi/aws');
const zones = require('./zones');

module.exports.vorprog = new aws.route53.Record(`vorprog_mx`, {
  zoneId: zones.vorprog.zoneId,
  type: aws.route53.RecordTypes.MX
});
