const aws = require('@pulumi/aws');

const defaultProfile = `vorprog`;

module.exports.defaultProfile = defaultProfile;
module.exports.defaultRegion = aws.USWest2Region;

module.exports.us_west_2 = new aws.Provider(`us_west_2`, {
  profile: defaultProfile,
  region: aws.USWest2Region,
});

module.exports.us_east_1 = new aws.Provider(`us_east_1`, {
  profile: defaultProfile,
  region: aws.USEast1Region,
});

module.exports.ap_south_1 = new aws.Provider(`ap_south_1`, {
  profile: defaultProfile,
  region: aws.APSouth1Region,
});
