const tape = require('tape');
const sinon = require('sinon');
const web = require('../web');
const pkg = require('../../../package.json');

const appId = 'mock-app-id';
const mockConfig = {
	appId: {
		val: appId,
	},
};

tape('Web implementation', (assert) => {
	const message = 'web message';
	const webTest = web(pkg, mockConfig);

	// mock vigour system methods
	webTest.on.echo.parent = {
		set: sinon.spy(),
	};

	// emulate an echo emit event
	webTest.on.echo.simpleEcho(message);

	// run assertions
	assert.ok(webTest.on.echo.parent.set, 'the value should be updated once');

	const firstCall = webTest.on.echo.parent.set.firstCall;
	assert.deepEqual(firstCall.args[0], { val: message }, '`val` should be set to the argument');

	assert.end();
});
