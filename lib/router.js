"use strict";
const WS = require("ws");
var clients = Array();


function verifyClient (info) {
	let routeRE = /^\/devices\/(.*)/;
	let route = routeRE.exec(info.req.url);
	if (route) {
		let routePath = route[1];
		
	}
}
