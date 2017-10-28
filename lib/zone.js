"use strict";
const EventEmitter = require( "events" );

module.exports = ( z ) => {
	let zone = new EventEmitter();

	Object.keys( z )
		.forEach( ( key ) => {
			zone[ key ] = z[ key ];
		} );
	return zone;
};
