const Plugin = require('vigour-wrapper-bridge/lib/plugin');
const config = require('./config');
const _platform = require('./platform');

module.exports = new Plugin({
	inject: {
		_platform,
	},
	appId: config.appId.val,
	val: false,
	define: {
		echo: function (value) {
			this._platform.emit('echo', value);
		},
	},
});
