"use strict";
/* eslint no-unused-vars: "off", no-console: "off" */
const Later = require("later"),
	Moment = require("moment"),
	EventEmitter = require("events"),
	Http = require("http"),
	OS = require("os"),
	Devices = require("./lib/devices");
var devices = Devices();
console.log(devices.list());
