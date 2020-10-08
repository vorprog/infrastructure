const exec = require('../utilities/exec');

exec(`aws s3api create-bucket --region ${process.env.AWS_DEFAULT_REGION} --bucket ${process.env.DOMAIN_NAME}-kops-state 
--create-bucket-configuration LocationConstraint=${process.env.AWS_DEFAULT_REGION} --query 'Bucket'`);

const encryptionConfiguration = JSON.stringify({
  Rules: [
    {
      ApplyServerSideEncryptionByDefault:
      {
        SSEAlgorithm: `AES256`
      }
    }
  ]
});

exec(`aws s3api put-bucket-encryption --bucket ${process.env.DOMAIN_NAME}-kops-state
--server-side-encryption-configuration '${encryptionConfiguration}'`);
