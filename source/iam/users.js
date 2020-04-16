const aws = require('@pulumi/aws');

const userResources = username => {
  return {
    user: new aws.iam.User(username, {}),
    access_key: new aws.iam.AccessKey(username, {
      user: username,
    })
  }
};

module.exports = {
  user_1: userResources(`gwashington`),
  user_2: userResources(`tjefferson`),
  user_3: userResources(`alincoln`),
};
