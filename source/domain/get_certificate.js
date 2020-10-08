const exec = require('../utilities/exec');
const util = require('../utilities/util');

const certificates = exec(`aws acm list-certificates --query 'CertificateSummaryList'`);
const domainCertificate = util.first(certificates, { DomainName: process.env.DOMAIN_NAME });

module.exports = domainCertificate;
