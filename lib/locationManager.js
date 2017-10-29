/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" ),
	Devices = require( "./devices.js" ),
	Zones = require( "./zones.js" ),
	Scheds = require( "./scheds.js" ),
	guid = require( "./guid.js" );

let locationManager = ( z ) => {
	const locMan = new EventEmitter();
	locMan.name = ( z.name !== "undefined" ) ? z.name : "default";
	locMan.id = guid();
	locMan.devices = Devices();
	locMan.schedules = Scheds();
	locMan.pidCtlrs = {};
	locMan.zones = Zones();
	locMan.on( "Error", ( err ) => {
		console.log( err );
	} );

	locMan.addPidCtrlr = ( pid ) => {
		if ( !locMan.pid.id ) {
			locMan.pid.id = guid();
		}
		if ( locMan.pidCtlrs[ pid.id ] ) return new Error( `This PID Controller already exists. PID: ${locMan[pid.id]}` );
		locMan.pidCtlrs[ pid.id ] = pid;
	};

	return locMan;
};

module.exports = locationManager;
