"use strict";
/*
notes required for staying focused.

this should route requests; vocab should be clear.
functions required:
	verifyClient
	registerClient
	sendMessage
	processMessage

*/
const WS = require("ws");
var clients = Array();


function verifyClient (info) {
	let routeRE = /^\/devices\/(.*)/;
	let route = routeRE.exec(info.req.url);
	if (route) {
		let routePath = route[1];

	}
}
