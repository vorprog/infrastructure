const aws = require('@pulumi/aws');

aws.config.region = aws.USWest2Region;
module.exports.us_west_2 = new aws.ec2.Vpc(`us_west_2`, {
  cidrBlock: `10.101.0.0/16`
});

aws.config.region = aws.USEast1Region;
module.exports.us_east_1 = new aws.ec2.Vpc(`us_east_1`, {
  cidrBlock: `10.102.0.0/16`
});

aws.config.region = aws.APSouth1Region;
module.exports.ap_south_1 = new aws.ec2.Vpc(`ap_south_1`, {
  cidrBlock: `10.103.0.0/16`
});
