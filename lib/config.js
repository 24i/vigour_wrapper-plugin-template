const pkg = require('../package.json');
const Config = require('vigour-config');
const config = new Config();

module.exports = config[pkg.name];
