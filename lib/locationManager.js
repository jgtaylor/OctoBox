/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" ),
	Devices = require( "./devices.js" );

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

	locMan.addDevice = ( device ) => {
		if ( locMan.devices[ device.device ] ) {
			return new Error( `This device already exists. device: ${device.device}` );
		}
		locMan.devices[ device.device ] = device;
	};

	locMan.addSchedule = ( sched ) => {
		if ( !locMan.sched.id ) {
			locMan.sched.id = guid();
		}
		locMan.schedules[ sched.id ] = sched;
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
