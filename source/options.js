const providers = require('./providers');

// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/pulumi/#CustomResourceOptions

/** @type { import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.us_west_2 = {
  provider: providers.us_west_2
};

/** @type { import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.us_east_1 = {
  provider: providers.us_east_1
};

/** @type { import('@pulumi/pulumi').CustomResourceOptions } */
module.exports.ap_south_1 = {
  provider: providers.ap_south_1
};
