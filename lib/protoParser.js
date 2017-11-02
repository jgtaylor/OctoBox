"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */

var msgParser = (msg, devices) => {
	// [ "config", {} ] || [ "reading", {} ] || [ "cmd", {} ]
	if ( ! Array.isArray(msg) ) {
		return new Error("Invalid message format. msg is not an Array.");
	}
    
	switch (msg[0]) {
	case "config":
	{
		let cfg = JSON.parse(msg[1]);
		cfg.forEach((element) => {
			devices.add(element);
		});
		return true;
	}
	case "reading":
	{
		// do something with the values...
		let values = JSON.parse(msg[1]);
		values.forEach((element) => {
			devices.list(element.device).emit("reading", element);
		});
		break;
	}
	case "state":
	{
		let state = JSON.parse(msg[1]);
		devices.dev[state.device].emit("state", state);
		break;
	}
	default: {
		break;
	}
	}
};

module.exports = msgParser;