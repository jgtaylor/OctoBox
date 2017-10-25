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
	locMan.on( "Error", ( err ) => {
		console.log( err );
	} );
};

locationManager.addDevice = ( device ) => {
	if ( locationManager.devices[ device.device ] ) {
		return new Error( `This device already exists. device: ${device.device}` );
	}
	locationManager.devices[ device.device ] = device;
};

locationManager.addSchedule = ( sched ) => {
	if ( !locationManager.sched.id ) {
		locationManager.sched.id = guid();
	}
	locationManager.schedules[ sched.id ] = sched;
};

locationManager.addPidCtrlr = ( pid ) => {
	if ( !locationManager.pid.id ) {
		locationManager.pid.id = guid();
	}
	if ( locationManager.pidCtlrs[ pid.id ] ) return new Error( `This PID Controller already exists. PID: ${locationManager[pid.id]}` );
	locationManager.pidCtlrs[ pid.id ] = pid;
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
