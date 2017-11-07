"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
const EventEmitter = require( "events" ),
	guid = require( "./guid.js" );

module.exports = ( devConfig ) => {
	let device = new EventEmitter();
	if ( !devConfig.device ) {
		device.device = guid();
	}

	Object.keys( devConfig )
		.forEach( ( key ) => {
			device[ key ] = devConfig[ key ];
		} );
	// DEBUG STUFF HERE
	device.enabled = () => {

	};
	device.send = ( msg ) => {
		if ( device.conn.readyState !== 1 ) {
			return new Error( "There is no connection to send the message: ", device, msg );
		}
		// should have a module for packing up commands, verify, etc.
		if ( Array.isArray( msg ) && msg.length === 2 ) {
			if ( msg[ 0 ] === "cmd" || msg[ 0 ] === "config" ) {
				return device.conn.send( JSON.stringify( msg ) );
			}
			// could check for lots of validation, correct device, etc.
			return new Error( "Invlid packet type: ", msg[ 0 ] );
		} else {
			return new Error( "Invalid message format: ", msg );
		}
	};

	device.on( "reading", ( msg ) => {
		console.log( {
			[ device.device ]: msg
		} );
	} );
	return device;
};
