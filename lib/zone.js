"use strict";
const EventEmitter = require( "events" );

module.exports = ( z ) => {
	let zone = new EventEmitter();

	Object.keys( z )
		.forEach( ( key ) => {
			zone[ key ] = z[ key ];
		} );
	zone.toJSON = () => {
		let _zone = {};
		Object.keys( zone )
			.forEach( ( key ) => {
				if ( typeof zone[ key ] !== "function" ) {
					_zone[ key ] = zone[ key ];
				}
			} );
		return JSON.stringify( _zone );
	};
	return zone;
};
