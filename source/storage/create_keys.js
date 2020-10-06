const exec = require('../utilities/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const symmetric1 = exec(`aws kms create-key --region ${region1}`).KeyMetadata;
const symmetric2 = exec(`aws kms create-key --region ${region2}`).KeyMetadata;

exec(`aws kms create-alias --region ${region1} --alias-name symmetric-secrets --target-key-id ${symmetric1.KeyId}`);
exec(`aws kms create-alias --region ${region2} --alias-name symmetric-secrets --target-key-id ${symmetric2.KeyId}`);

const asymmetric1 = exec(`aws kms create-key --region ${region1} --customer-master-key-spec RSA_4096`).KeyMetadata;
const asymmetric2 = exec(`aws kms create-key --region ${region2} --customer-master-key-spec RSA_4096`).KeyMetadata;

exec(`aws kms create-alias --region ${region1} --alias-name asymmetric-secrets --target-key-id ${asymmetric1.KeyId}`);
exec(`aws kms create-alias --region ${region2} --alias-name asymmetric-secrets --target-key-id ${asymmetric2.KeyId}`);