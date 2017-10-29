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
	return device;
};
