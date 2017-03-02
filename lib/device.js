const EventEmitter = require("events");
function guid() {
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
		s4() + "-" + s4() + s4() + s4();

}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);

}

module.exports = (devConfig) => {
	let device = new EventEmitter();
	if (!devConfig.deviceID) {
		device.deviceID = guid();
	}
	// only needed during development.
	switch (devConfig.deviceType) {
	case "button": {
		/*
		define a device method, like, on/off/toggle, init,  - it's a native
		implementation (/sys/class/gpio/gpioXX/...), so no modules are
		needed.
		*/
		break;
	}
	case "dimmer": {
		/*
		define device method for dimmer, init/up/down/increment/set/get, etc.
		also a native implementation on the platform so no modules needed.
		*/
		break;
	}
	case "virtual": {
		/*
		there should be some module loaded, or defined somehow. the module should
		use a standard api - so, something like: cmds: ["x", "y"], describe the
		return, and probably other stuff as well. if it's i2c or spi, the commands
		should be described so that a device.read() is backed by something like:
		read: i2cObject.sendCmd('0x43'), or whatever the i2c command is.
		*/
		break;
	}
	default: {
		break;
	}
	}
	Object.keys(devConfig).forEach((key) => {
		device[key] = devConfig[key];
	});
	return device;
};
