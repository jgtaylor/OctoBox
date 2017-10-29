/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" ),
	Devices = require( "./devices.js" ),
	Zone = require( "./zone.js" ),
	Sched = require( "./sched.js" );

let locationManager = ( z ) => {
	const locMan = new EventEmitter();
	locMan.name = ( z.name !== "undefined" ) ? z.name : "default";
	locMan.id = guid();
	locMan.devices = Devices();
	locMan.schedules = {};
	locMan.pidCtlrs = {};
	locMan.zones = {};
	locMan.on( "Error", ( err ) => {
		console.log( err );
	} );

	locMan.addSchedule = ( sched ) => {
		if ( !locMan.sched[ sched.id ] ) {
			sched.id = guid();
			locMan.schedules[ sched.id ] = sched;
		}
	};

	locMan.addZone = ( z ) => {
		let zoneID = guid();
		locMan.zones[ zoneID ] = Zone( z );
		locMan.emit( "zone", `Zone: ${zoneID} added` );
	};

	locMan.addPidCtrlr = ( pid ) => {
		if ( !locMan.pid.id ) {
			locMan.pid.id = guid();
		}
		if ( locMan.pidCtlrs[ pid.id ] ) return new Error( `This PID Controller already exists. PID: ${locMan[pid.id]}` );
		locMan.pidCtlrs[ pid.id ] = pid;
	};

	return locMan;
};

function guid() {
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
		s4() + "-" + s4() + s4() + s4();

}

function s4() {
	return Math.floor( ( 1 + Math.random() ) * 0x10000 )
		.toString( 16 )
		.substring( 1 );

}

module.exports = locationManager;
