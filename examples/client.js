"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
/*
this file is 2 fake "devices" that will connect to a websocket,
send its configuration over.

On the server side, you should see 11 devices added, with GUIDs
*/
const WS = require( "ws" );
var cfg1 = [ "config", [ {
	"device": "dccbaa81-b2e4-46e4-a2f4-84d398dd86e3",
	"type": "virtual",
	"validCmds": [ "read", "readCont" ],
	"meta": {
		"name": "light",
		"metric": "light",
		"unit": "lux"
	}
}, {
	"device": "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay"
	}
}, {
	"device": "c6d2a817-0c3a-4b6f-8478-cd81628a63f5",
	"type": "virtual",
	"validCmds": [ "read" ],
	"meta": {
		"keys": [ {
			"name": "rh",
			"metric": "humidity",
			"unit": "%"
		}, {
			"name": "temp",
			"metric": "temperature",
			"unit": "C",
			"validMax": 85,
			"validMin": -20
		} ],
		"deviceName": "DHT22"
	}
} ] ];

var cfg2 = [ "config", [ {
	"device": "orange-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Orange"
	}
}, {
	"device": "blue-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Blue"
	}
}, {
	"device": "green-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Green"
	}
}, {
	"device": "red-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Red"
	}
}, {
	"device": "yellow-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Yellow"
	}
}, {
	"device": "purple-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Purple"
	}
}, {
	"device": "white-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "White"
	}
}, {
	"device": "black-84d398dd86e3",
	"type": "button",
	"validCmds": [ "on", "off", "getState" ],
	"meta": {
		"usage": "Mains Relay",
		"color": "Black"
	}
} ] ];
var ws1 = new WS( "ws://localhost:2800/devices/josh" );
ws1.on( "open", () => {
	ws1.send( JSON.stringify( cfg1 ) );
} );
ws1.on( "message", ( msg ) => {
	console.log( msg );
} );
var ws2 = new WS( "ws://localhost:2800/devices/josh" );
ws2.on( "open", () => {
	ws2.send( JSON.stringify( cfg2 ) );
} );
ws2.on( "message", ( msg ) => {
	console.log( msg );
} );