/* eslint no-console: "off", no-unused-vars: "off" */
"use strict";
const EventEmitter = require( "events" );

function guid() {
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
		s4() + "-" + s4() + s4() + s4();

}

function s4() {
	return Math.floor( ( 1 + Math.random() ) * 0x10000 )
		.toString( 16 )
		.substring( 1 );

}
exports.module = ( config ) => {
	let location = new EventEmitter();
	if ( config ) {
		console.log( `We have a config: ${config}` );
	}
	location.add = ( loc ) => {
		if ( !loc ) {
			return new Error( "Location information is required to add a new location." );
		}
		if ( !loc.id ) {
			loc.id = guid();
		}
		location[ loc.id ] = loc;
	};
	location.remove = ( locationID ) => {
		if ( location[ locationID ] ) {
			delete location[ locationID ];
			return true;
		}
		return false;
	};
	location.registerDevice = ( device, loc ) => {
		// add device to the location
	};
	location.registerSchedule = ( sched, device ) => {
		// associate a schedule
	};
	location.registerPidController = ( pidCtlr, deviceIn, deviceOut );

	return location;
};
