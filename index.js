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
					case "register":
					{
						console.log( "Registring client..." );
						ws.send( JSON.stringify( {
							message: "Registered " + this.octoClientIpAddress,
							models: lm.devices.list()
						} ) );
						break;
					}
					case "get":
					{
						if ( msg[ 1 ].obj ) {
							let toSend = [ "detail", lm.devices.get( msg[ 1 ].obj ) ];
							toSend ? ws.send( JSON.stringify( toSend ) ) :
								ws.send( JSON.stringify( {
									message: "Error: no device"
								} ) );
						}
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

	} );


lm.addAdapter( wss, devLink, {
	name: "WebSocket"
} );