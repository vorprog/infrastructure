const aws = require('@pulumi/aws');
const options = require('../options');

module.exports.vorprog = new aws.acm.Certificate(`vorprog.com`, { 
  domainName: `vorprog.com`,
  validationMethod: `DNS`
}, options.us_west_2);
