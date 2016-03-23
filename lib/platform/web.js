module.exports = (pkg, config) => ({
	label: 'web',
	on: {
		echo: {
			simpleEcho: function (val) {
				this.parent.set({
					val,
				});
			},
		},
	},
});
