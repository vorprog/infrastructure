const exec = require('../../utilities/exec');

exec(`aws create-vpc --cidr-block 10.101.0.0/16`);
