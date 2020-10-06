const exec = require('../utilities/exec');

const symmetric1 = exec(`aws kms describe-keys --region ${process.env.AWS_DEFAULT_REGION} --filter 'Alias=symmetric-secrets'`).KmsKeys[0];
const symmetric2 = exec(`aws kms describe-keys --region ${process.env.AWS_SECONDARY_REGION} --filter 'Alias=symmetric-secrets'`).KmsKeys[0];

const asymmetric1 = exec(`aws kms describe-keys --region ${process.env.AWS_DEFAULT_REGION} --filter 'Alias=symmetric-secrets'`).KmsKeys[0];
const asymmetric2 = exec(`aws kms describe-keys --region ${process.env.AWS_SECONDARY_REGION} --filter 'Alias=symmetric-secrets'`).KmsKeys[0];

asymmetric1.PublicKey = exec(`aws kms get-public-key --key-id ${symmetric1.KeyId} --output text --query PublicKey | base64 --decode`);
asymmetric2.PublicKey = exec(`aws kms get-public-key --key-id ${symmetric2.KeyId} --output text --query PublicKey | base64 --decode`);

module.exports = {
  symmetric1: symmetric1,
  symmetric2: symmetric2,
  asymmetric1: symmetric1,
  asymmetric2: symmetric2
};
