"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
/* this is a module, it should return an array of devices */
const EventEmitter = require( "events" ),
	zone = require( "./zone.js" ),
	guid = require( "./guid.js" );

module.exports = ( z ) => {
	let Zones = new EventEmitter();
	if ( !z ) {
		Zones.name = "Default";
		Zones.zones = {};
	} else {
		Zones.name = z.name;
		Zones.zones = {};
	}

	Zones.list = () => {
		return Object.keys( Zones.zones );
	};

	Zones.add = ( z ) => {
		let id = guid();
		Zones.zones[ id ] = zone( z );
		Zones.emit( "add", Zones.zones[ id ] );
	};

	Zones.remove = ( zoneID ) => {
		if ( Zones.zones[ zoneID ] ) {
			Zones.emit( "remove", Zones.zone[ zoneID ] );
			delete Zones.zone[ zoneID ];
		}
	};

	return Zones;
};
