const exec = require('../utilities/exec');
const state = require('../utilities/state');

exec(`aws create-vpc --cidr-block 10.102.0.0/16 --region ${state.region2}`);
