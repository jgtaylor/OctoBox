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
	locMan.addAdapter = (conn, msgHandler) => {
		conn.on("connection", (client, req) => {
			// parse req ; get /devices/
			client.on("message", (msg) => {
				msgHandler(msg, locMan.devices);
			});
			locMan.clients.push(client);
			console.log(`Connection to ${req.url}`);
		});
	};
	return locMan;
};

module.exports = locationManager;
