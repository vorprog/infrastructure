const aws = require('@pulumi/aws');

// defaults
aws.config.profile = `vorprog`;
aws.config.region = aws.USWest2Region;

module.exports.us_west_2_provider = new aws.Provider(`us_west_2`, {
  region: aws.USWest2Region,
});

/** @type { import('@pulumi/pulumi').InvokeOptions | import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.us_west_2 = { provider: this.us_west_2_provider };

module.exports.us_east_1_provider = new aws.Provider(`us_east_1`, {
  region: aws.USEast1Region,
});

/** @type { import('@pulumi/pulumi').InvokeOptions | import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.us_east_1 = { provider: this.us_west_2_provider };

module.exports.ap_south_1_provider = new aws.Provider(`ap_south_1`, {
  region: aws.APSouth1Region,
});

/** @type { import('@pulumi/pulumi').InvokeOptions | import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.ap_south_1 = { provider: this.us_west_2_provider };
