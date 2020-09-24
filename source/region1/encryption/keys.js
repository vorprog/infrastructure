const exec = require('../../utilities/exec');

const kmsKey = exec(`aws kms create-key`);
exec(`aws kms create-alias --alias-name secrets --target-key-id ${kmsKey.KeyMetadata.KeyId}`);
