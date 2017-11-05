/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" ),
	Devices = require( "./devices.js" ),
	Zones = require( "./zones.js" ),
	Scheds = require( "./scheds.js" ),
	guid = require( "./guid.js" );

let locationManager = ( z ) => {
	const locMan = new EventEmitter();
	locMan.devices = Devices();
	locMan.schedules = Scheds();
	locMan.pidCtlrs = {};
	locMan.zones = Zones();
	locMan.adapters = {};
	locMan.clients = [];
	locMan.addAdapter = function(conn, msgHandler, options) {
		if (!options) {
			options = { name: "ws" };
		}
		locMan.adapters[options.name] = msgHandler;
		/* should create an adapters object factory */
		conn.on("connection", function(client, req) {
			locMan.clients.push(client);
			let idx = locMan.clients.indexOf(client);
			client.on("message", function(msg) {
				msgHandler(msg.toString(), locMan.devices, this);
				client.send("HOLY FUCK THIS IS SHITTY DEBUGGING");
			}, this);
			console.log(`Connection to ${req.url}`);
		}, this);
	};
	return locMan;
};

module.exports = locationManager;
