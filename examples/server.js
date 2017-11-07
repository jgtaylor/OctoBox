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

	Of course, cfg would need to be defined (see the client.js file).

	Ideally, the schedules will be defined/associated via a browser interface,
	as would the PID controllers. Server starts, devices register via the
	"config" packet, then the user knows what they've got. They define a zone,
	or not, assign the registered devices to the zone they belong to, define
	some schedules for the devices (e.g. light on at 18:00, read temp every 30
	seconds or so, etc.), then define some PID controllers and associate them
	with the devices they'll handle. 
 */
lm.schedules.associate( mySchedule.id, lm.devices.get( "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5" ), cmd );
lm.schedules.start( mySchedule.id );
