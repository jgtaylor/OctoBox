"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const WS = require( "ws" ),
	LM = require( "../lib/locationManager.js" );
var devLink = require( "../lib/protoParser.js" ),
	lm = LM(),
	wss = new WS.Server( {
		port: 2800
	} );
var schedule = {
	schedules: [ {
		s: [ 0, 30 ]
	} ],
	duration: 0
}; // every 30 seconds.
var mySchedule = lm.schedules.add( schedule );
var cmd = [ "cmd", {
	device: "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5",
	cmd: "on"
} ];
lm.addAdapter( wss, devLink ); // associate the WebSocket w the LocationManager
/*
	assuming the client is trying to connect, no idea if this will work before
	the client is actually able to connect and register its devices. One could
	include a client here via:
	var ws = new WS("ws://localhost:2800/some/path",
		ws.on("open", ws.send(cfg)) );
 */
lm.schedules.associate( mySchedule.id, lm.devices.get( "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5" ), cmd );
lm.schedules.start( mySchedule.id );
