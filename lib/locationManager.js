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
	/***
	 * this part is all wrong. The adapter should return some connection
	 * or something like that. addAdapter->returns an emitter that emits on
	 * message and sends a message. the connection should be managed behind
	 * the scenes. I imagine flow does this, or something like this, already.
	 *
	 * this is currently backwards. needs rethinking. kind of works for now.
	 */
	locMan.addAdapter = function ( conn, msgHandler, options ) {
		if ( !options ) {
			options = {
				name: "ws"
			};
		}
		locMan.adapters[ options.name ] = msgHandler;
		/* should create an adapters object factory */
		conn.on( "connection", function ( client, req ) {
			client.on( "message", function ( msg ) {
				// 'this' has to be used to pass the current connection into
				// the Device(config), called via devices.addDevice();
				msgHandler( msg.toString(), locMan.devices, this );
				client.send( "HOLY FUCK, THIS IS SHITTY DEBUGGING" );
			}, this );
			console.log( `Connection to ${req.url}` );
		}, this );
	};
	return locMan;
};

module.exports = locationManager;
