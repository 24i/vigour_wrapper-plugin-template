const tape = require('tape');
const sinon = require('sinon');
const native = require('../native');
const pkg = require('../../../package.json');

const appId = 'mock-app-id';
const mockConfig = {
	appId: {
		val: appId,
	},
};

tape('Native bridging', (assert) => {
	const message = 'hello';
	const nativeTest = native(pkg, mockConfig);

	// mock vigour system methods
	nativeTest.on.echo.send = sinon.spy();

	// emulate an echo emit event
	nativeTest.on.echo.simpleEcho(message);

	// run assertions
	assert.ok(nativeTest.on.echo.send.calledOnce, 'the native method should only be called once');

	const firstCall = nativeTest.on.echo.send.firstCall;
	assert.equal(firstCall.args[0], 'echo', 'the `echo` method should be called');
	assert.deepEqual(firstCall.args[1], { appId, message }, 'the app ID and message should be passed');

	assert.end();
});

tape('Native error handling', (assert) => {
	const error = 'an error';
	const nativeTest = native(pkg, mockConfig);

	// mock vigour system methods
	nativeTest.on.echo.send = sinon.stub().callsArgWith(2, error);
	nativeTest.on.echo.emit = sinon.spy();

	// emulate an echo emit event
	nativeTest.on.echo.simpleEcho('message');

	// run assertions
	assert.ok(nativeTest.on.echo.emit.calledOnce, 'a single event should be emitted');

	const firstCall = nativeTest.on.echo.emit.firstCall;
	assert.equal(firstCall.args[0], 'error', 'an error event should be emitted');

	assert.deepEqual(firstCall.args[1], error, 'the native error message should be passed');

	assert.end();
});

tape('Native result handling', (assert) => {
	const message = 'native message';
	const nativeTest = native(pkg, mockConfig);

	// mock vigour system methods
	nativeTest.on.echo.send = sinon.stub().callsArgWith(2, null, message);
	nativeTest.on.echo.parent = {
		set: sinon.spy(),
	};

	// emulate an echo emit event
	nativeTest.on.echo.simpleEcho(message);

	// run assertions
	assert.ok(nativeTest.on.echo.parent.set, 'the value should be updated once');

	const firstCall = nativeTest.on.echo.parent.set.firstCall;
	assert.deepEqual(firstCall.args[0], { val: message }, '`val` should be set to the value returned by the native code');

	assert.end();
});
