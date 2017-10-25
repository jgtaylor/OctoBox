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
