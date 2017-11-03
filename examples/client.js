"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
/*
this file is a fake "device" that will connect to a websocket,
send its configuration over, then send a "reading".

On the server side, you should see 3 devices added, with GUIDs,
and then you should get a reading object.
*/
const WS = require("ws");
var cfg = ["config", [{
	"device": "dccbaa81-b2e4-46e4-a2f4-84d398dd86e3",
	"type": "virtual",
	"validCmds": ["read", "readCont"],
	"meta": {
		"name": "light",
		"metric": "light",
		"unit": "lux"
	}
}, {
	"device": "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5",
	"type": "button",
	"validCmds": ["on", "off", "getState"],
	"meta": {
		"usage": "Mains Relay"
	}
}, {
	"device": "c6d2a817-0c3a-4b6f-8478-cd81628a63f5",
	"type": "virtual",
	"validCmds": ["read"],
	"meta": {
		"keys": [{
			"name": "rh",
			"metric": "humidity",
			"unit": "%"
		}, {
			"name": "temp",
			"metric": "temperature",
			"unit": "C",
			"validMax": 85,
			"validMin": -20
		}],
		"deviceName": "DHT22"
	}
}]];
var ws = new WS("ws://localhost:2800/devices/josh");
ws.on("open", () => {
	ws.send(JSON.stringify(cfg));
});
var reading = ["reading", {
	"device": "c6d2a817-0c3a-4b6f-8478-cd81628a63f5",
	"value": {
		"raw": "010000001001101011000000001011110100101010",
		"rh": 61.9,
		"temp": 18.9
	}
}];
ws.send(JSON.stringify(reading));