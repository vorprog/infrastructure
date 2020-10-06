const util = require('../utilities/util');

const buckets = exec(`aws s3api describe-buckets --region ${process.env.AWS_DEFAULT_REGION}`).Buckets;
const cluster1KopsState = util.first(buckets, { BucketName: `${process.env.DOMAIN_NAME}-cluster1-kops-state`})
const cluster2KopsState = util.first(buckets, { BucketName: `${process.env.DOMAIN_NAME}-cluster2-kops-state`})

module.exports = {
  cluster1KopsState: cluster1KopsState,
  clustert2KopsState: cluster1KopsState
};
