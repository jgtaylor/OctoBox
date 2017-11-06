"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const WS = require("ws"),
	LM = require("./lib/locationManager.js");
var devLink = require("./lib/protoParser.js"),
	lm = LM(),
	wss = new WS.Server({
		port: 2800
	});
lm.addAdapter(wss, devLink);