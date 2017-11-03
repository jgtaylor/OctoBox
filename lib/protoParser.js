"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */

module.exports = (message, devices) => {
	// [ "config", {} ] || [ "reading", {} ] || [ "cmd", {} ]
	// if ( ! Array.isArray(msg) ) {
	// 	return new Error("Invalid message format. msg is not an Array.");
	// }
	let msg = JSON.parse(message);
	switch (msg[0]) {
	case "config":
	{
		let cfg = msg[1];
		cfg.forEach((element) => {
			devices.add(element);
		});
		return true;
		break;
	}
	case "reading":
	{
		// do something with the values...
		let values = msg[1];
		values.forEach((element) => {
			devices.list(element.device).emit("reading", element);
		});
		return true;
		break;
	}
	case "state":
	{
		let state = msg[1];
		devices.dev[state.device].emit("state", state);
		return true;
		break;
	}
	default: {
		return false;
		break;
	}
	}
};