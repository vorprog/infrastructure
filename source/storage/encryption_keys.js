const exec = require('../utilities/exec');
const state = require('../utilities/state');

const kmsKeyRegion1 = exec(`aws kms create-key`);
exec(`aws kms create-alias --alias-name secrets --target-key-id ${kmsKey.KeyMetadata.KeyId}`);

const kmsKeyRegion2 = exec(`aws kms create-key --region ${state.region2}`);
exec(`aws kms create-alias --alias-name secrets --target-key-id ${kmsKey.KeyMetadata.KeyId} --region ${state.region2}`);
