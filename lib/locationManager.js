/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" ),
	Devices = require( "./devices.js" ),
	Zones = require( "./zones.js" ),
	Scheds = require( "./scheds.js" ),
	guid = require( "./guid.js" );
// need to include pidControllers.js eventually

let locationManager = ( z ) => {
	const locMan = new EventEmitter();
	locMan.devices = Devices();
	locMan.schedules = Scheds();
	locMan.pidCtlrs = {};
	locMan.zones = Zones();
	locMan.adapters = {};
	locMan.clients = [];

	locMan.toJSON = () => {
		let _loc = {
			devices: [],
			schedules: [],
			zones: [],
			pidCtlrs: []
		};

		// Devices
		locMan.devices.list()
			.forEach( ( d ) => {
				_loc.devices.push( locMan.devices.get( d )
					.toJSON() );
			} );
		locMan.schedules.list()
			.forEach( ( s ) => {
				_loc.schedules.push( locMan.schedules.get( s )
					.toJSON() );
			} );
		locMan.zones.list()
			.forEach( ( z ) => {
				_loc.zones.push( locMan.zones.get( z )
					.toJSON() );
			} );
		// TODO: add the PID Controllers here...
		return _loc;
	};
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
			}, this );
			console.log( `Connection to ${req.url}` );
		}, this );
	};
	return locMan;
};

module.exports = locationManager;