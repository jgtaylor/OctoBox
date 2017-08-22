"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const EventEmitter = require("events"),
	WebSocket = require("ws"),
	Devices = require("./lib/devices");
var wss = new WebSocket.Server( { port: 8585 });
var devices = Devices();
var clientList;
function registerClient(clientID) {
	return true;
}
function fSearch (obj, re) {
	let found = false;
	switch (typeof obj) {
	case "string": {
		// console.log("Found string... %s", obj);
		let tRe = new RegExp(re, "i");
		if (tRe.exec(obj)) {
			console.log("Found %s in %s", re, obj);
			found = true;
		}
		// console.log("%s not found.", re);
		break;
	}
	case "object": {
		if (Array.isArray(obj)) {
			// console.log("Found array %j", obj);
			if (obj.includes(re)) found = true;
			break;
			// console.log("%s not found", re);
		} else if (obj !== null) {
			// console.log("Found object %j", obj);
			Object.keys(obj).forEach( (el) => {
				if (fSearch(obj[el], re)) found = true;
			});
		}
	}
	}
	return found;
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
	clientList += ws;
	ws.on("message", (msg) => {
		parseMsg(msg);
	});
	console.log("Client connection: %s", wss);
});

console.log(devices.list());
