"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const WS = require("ws");
const LM = require("./lib/locationManager.js");
const devLink = require("./lib/protoParser.js");

var lm = LM();
var wss = new WS.Server({port: 2800});


lm.addAdapter(wss, devLink);

