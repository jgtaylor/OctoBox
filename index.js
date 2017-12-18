"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const WS = require( "ws" ),
	LM = require( "./lib/locationManager.js" );
var devLink = require( "./lib/protoParser.js" ),
	lm = LM(),
	wss = new WS.Server( {
		port: 2800
	} ),
	wssAdmin = new WS.Server( {
		port: 2801
	}, () => {
		// TODO: move this part to a client front end handler stuffy thingy.
		// NOTE: This is the Admin Client stuff... NOT THE DEVICE STUFF!
		wssAdmin.on( "connection", ( ws, req ) => {

			console.log( "Connection from: " + req.connection.remoteAddress );
			this.octoClientIpAddress = req.connection.remoteAddress;

			ws.on( "message", ( msg ) => {
				msg = JSON.parse( msg );
				console.log( "message recieved.", msg );

				switch ( msg[ 0 ] ) {
				case "client":
				{
					switch ( msg[ 1 ].cmd ) {
					case "device-cmd":
					{
						// { cmd: 'device-cmd', details: { device: 'dccbaa81-b2e4-46e4-a2f4-84d398dd86e3', validCmd: 'read' } }
						let details = msg[ 1 ].details;
						// lm.devices.get( msg[ 1 ].details.device )
						// 	.send( JSON.stringify( [ "cmd", {
						// 		device: details.device,
						// 		cmd: details.validCmd
						// 	} ] ) );
						lm.devices.get( msg[ 1 ].details.device )
							.send( [ "cmd", {
								device: details.device,
								cmd: details.validCmd
							} ] );
						console.log( "Trying to send to device client..." );
						// [ "cmd", { "device": "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5", "cmd": "on" } ]
						break;
					}
					case "device-sync":
					{
						// { cmd: "device-sync", _changed: {device} }
						console.log( "Device-Sync called." );
						console.log( msg[ 1 ]._changed );
						lm.devices.update( msg[ 1 ]._changed );
						break;
					}
					case "load":
					{
						ws.send( JSON.stringify( [ "lm-update", lm.toJSON() ] ) );
						break;
					}
					default:
						console.log( msg[ 1 ].cmd );
						break;
					}
					break;
				}
				default:
					console.log( msg[ 0 ] );
					break;
				}
			}, this );
		}, this );
		lm.devices.on( "add", ( msg ) => {
			wssAdmin.clients.forEach( ( client ) => {
				client.send( JSON.stringify( [ "lm-device-add", msg.toJSON() ] ) );
			} );
		} );
		lm.devices.on( "remove", ( msg ) => {
			wssAdmin.clients.forEach( ( client ) => {
				client.send( JSON.stringify( [ "lm-device-remove", msg ] ) );
			} );
		} );

	} );


lm.addAdapter( wss, devLink, {
	name: "WebSocket"
} );