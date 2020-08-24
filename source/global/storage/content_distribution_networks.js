const aws = require('@pulumi/aws');
const buckets = require('./buckets')

const s3OriginId = `myS3Origin`;

module.exports.main = new aws.cloudfront.Distribution(`main`, {
  defaultCacheBehavior: {
    allowedMethods: [
      `DELETE`,
      `GET`,
      `HEAD`,
      `OPTIONS`,
      `PATCH`,
      `POST`,
      `PUT`,
    ],
    cachedMethods: [
      `GET`,
      `HEAD`,
    ],
    forwardedValues: {
      cookies: {
        forward: `none`,
      },
      queryString: false,
    },
    targetOriginId: s3OriginId,
    viewerProtocolPolicy: `allow-all`,
  },
  enabled: true,
  origins: [{
    domainName: buckets.cdn.bucketRegionalDomainName,
    originId: s3OriginId
  }],
  restrictions: {
    geoRestriction: {
      locations: [
        `US`, // United States
        `CA`, // Canada
        `GB`, // Great Britain / United Kingdom
        `DE`, // Germany
        `FR`, // France
        `IN` // India
      ],
      restrictionType: `whitelist`,
    },
  },
  viewerCertificate: {
    cloudfrontDefaultCertificate: true,
  }
});
