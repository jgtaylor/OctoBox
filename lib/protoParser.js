"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */

module.exports = (message, devices, conn) => {
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
			element.conn = conn;
			devices.add(element);
		});
		return true;
	}
	case "reading":
	{
		// do something with the values...
		let reading = msg[1];
		devices.get(reading.device).emit("reading", reading.value);
		return true;
	}
	case "state":
	{
		let state = msg[1];
		devices.get(state.device).emit("state", state);
		return true;
	}
	default: {
		return false;
	}
	}
};