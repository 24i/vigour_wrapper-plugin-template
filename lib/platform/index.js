const env = require('vigour-env');
const pkg = require('../../package.json');
const config = require('../config');

console.log(`${pkg.name} config: ${config.serialize()}`);

if (env.isNative.val) {
	module.exports = require('./native')(pkg, config);
} else if (env.isWeb.val) {
	module.exports = require('./web')(pkg, config);
} else {
	console.warn(`this platform is not supported by ${pkg.name}`);
}
