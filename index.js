"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const EventEmitter = require("events"),
	WebSocket = require("ws"),
	Devices = require("./lib/devices");
var wss = new WebSocket.Server( { port: 8585 });
var devices = Devices();
var clientList = [];
function registerClient(clientID) {
	return true;
}

function parseMsg(msg) {
	try {
		Array.isArray(msg);
	} catch (err) {
		throw "Error: %s", err;
	}
	switch (msg[0]) {
	case "registrationReq": {
		registerClient(msg.clientID);
		break;
	}
	case "capabilitiesList": {
		devices.add(msg);
		break;
	}
	default: {
		console.log("Bad Message - no parser.");
		break;
	}
	}

}
wss.on("connection", (ws) => {
	clientList.push(ws);
	ws.on("message", (msg) => {
		parseMsg(msg);
	});
	console.log("Client connection: %s", wss);
});

console.log(devices.list());
