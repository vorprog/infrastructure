const exec = require('../utilities/exec');
const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

exec(`aws s3api create-bucket --region ${region1} --bucket ${process.env.DOMAIN_NAME}-cluster1-kops-state --create-bucket-configuration LocationConstraint=${region1}`);
exec(`aws s3api create-bucket --region ${region2}  --bucket ${process.env.DOMAIN_NAME}-cluster2-kops-state --create-bucket-configuration LocationConstraint=${region2}`);
