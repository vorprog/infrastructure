const aws = require('@pulumi/aws');

module.exports.user_1 = new aws.iam.User(`gwashington`, {});
module.exports.user_2 = new aws.iam.User(`tjefferson`, {});
module.exports.user_3 = new aws.iam.User(`alincoln`, {});
