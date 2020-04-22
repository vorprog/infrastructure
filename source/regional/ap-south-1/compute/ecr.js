const aws = require('@pulumi/aws');
const options = require('../../../options');

module.exports.main = new aws.ecr.Repository(`main`, {
  imageScanningConfiguration: {
    scanOnPush: true
  },
}, options.ap_south_1);
