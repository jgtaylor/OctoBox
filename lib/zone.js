"use strict";
const EventEmitter = require( "events" );

module.exports = ( z ) => {
	let zone = new EventEmitter();
	// zone keys should somehow (eventually) be standardized... this ad hoc shit.
	Object.keys( z )
		.forEach( ( key ) => {
			zone[ key ] = z[ key ];
		} );
	zone.toJSON = () => {
		let _zone = {};
		Object.keys( zone )
			.forEach( ( key ) => {
				if ( typeof zone[ key ] !== "function" ) {
					switch ( key ) {
					case "domain":
					case "_events":
					case "_eventsCount":
					case "_maxListeners":
					{
						break;
					}
					default:
						_zone[ key ] = zone[ key ];
					}

				}
			} );
		return _zone;
	};
	return zone;
};