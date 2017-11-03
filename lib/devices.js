"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
/* this is a module, it should return an array of devices */
const fs = require( "fs" ),
	EventEmitter = require( "events" ),
	Device = require( "./device.js" );

module.exports = ( config ) => {
	const devices = new EventEmitter();
	devices.dev = {};

	devices.add = ( devConfig ) => {
		if ( Array.isArray( devConfig ) ) {
			devConfig.forEach( ( d ) => {
				devices.add( d );
			} );
			return;
		}
		const device = Device( devConfig );
		let devID = device.device;
		if ( !devices.dev[ devID ] ) {
			devices.dev[ devID ] = device;
			devices.emit( "add", device );
			return true;
		} else {
			devices.emit( "error", new Error( "device: " + devID + " already exists." ) );
			return false;
		}
	};

	devices.list = () => {
		return Object.keys( devices.dev );
	};

	devices.query = ( search ) => {
		let searchRe = new RegExp( search );
		return Object.keys( devices.dev )
			.filter(
				( el ) => {
					let found;
					let D = devices.dev[ el ];
					Object.keys( D )
						.forEach(
							( i ) => {
								let DI = D[ i ];
								if ( Array.isArray( DI ) ) {
									if ( DI.includes( search ) ) return found = el;
								} else if ( typeof DI === "string" ) {
									var finding = searchRe.exec( DI );
									if ( finding ) return found = el;
								} else if ( typeof DI === "object" ) {
									if ( Object.values( DI )
										.includes( search ) ) return found = el;
								}
							} );
					if ( found ) return el;
				}
			);
	};

	devices.save = () => {
		let devJSON = [];
		Object.keys( devices.dev )
			.forEach( ( el ) => {
				let j = {};
				Object.keys( devices.dev[ el ] )
					.forEach( ( k ) => {
						switch ( k ) {
						case "domain" || "_events" || "_eventsCount" || "_maxListeners":
						{
							break;
						}
						default:
						{
							j[ k ] = devices.dev[ el ][ k ];
							break;
						}
						}
					} );
				devJSON.push( j );
			} );
		fs.writeFileSync( "devices.json", JSON.stringify( devJSON, null, 4 ), {
			encoding: "utf-8",
			mode: 0o644
		} );
		devices.emit( "saved", devJSON );
	};

	devices.remove = ( deviceID ) => {
		if ( !devices.dev[ deviceID ] ) {
			//nothing to do
			return false;
		}
		delete devices.dev[ deviceID ];
		devices.emit( "remove", deviceID );
		return true;
	};
	devices.get = (deviceID) => {
		return devices.dev[deviceID];
	};
	devices.on( "add", ( msg ) => {
		console.log( "added: %s", msg.device );
	} );
	devices.on( "remove", ( msg ) => {
		console.log( "removed: %s", msg );
	} );
	return Object.freeze( devices );
};
