const EVENT_ERROR = 'error';
const inject = require('vigour-wrapper-bridge/lib/plugin/injection');

module.exports = (pkg, config) => ({
	inject: inject(pkg.name),
	label: 'native',
	on: {
		echo: {
			simpleEcho: function (message) {
				const args = {
					appId: config.appId.val,
					message,
				};

				this.send('echo', args, (err, val) => {
					if (err) {
						this.emit(EVENT_ERROR, err);
					} else {
						this.parent.set({ val });
					}
				});
			},
		},
	},
});
