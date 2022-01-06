const exec = require('@vorprog/exec');

const region1 = process.env.AWS_DEFAULT_REGION;
const region2 = process.env.AWS_SECONDARY_REGION;

const symmetric1 = exec(`aws kms create-key --region ${region1} --query 'KeyMetadata'`)
const symmetric2 = exec(`aws kms create-key --region ${region2} --query 'KeyMetadata'`)

exec(`aws kms create-alias --region ${region1} --alias-name symmetric --target-key-id ${symmetric1.KeyId}`);
exec(`aws kms create-alias --region ${region2} --alias-name symmetric --target-key-id ${symmetric2.KeyId}`);

const asymmetric1 = exec(`aws kms create-key --region ${region1} --customer-master-key-spec RSA_4096 --query 'KeyMetadata'`)
const asymmetric2 = exec(`aws kms create-key --region ${region2} --customer-master-key-spec RSA_4096 --query 'KeyMetadata'`)

exec(`aws kms create-alias --region ${region1} --alias-name asymmetric --target-key-id ${asymmetric1.KeyId}`);
exec(`aws kms create-alias --region ${region2} --alias-name asymmetric --target-key-id ${asymmetric2.KeyId}`);
