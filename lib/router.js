"use strict";
/*
notes required for staying focused.

this should route requests; vocab should be clear.
functions required:
	verifyClient
	registerClient
	sendMessage
	processMessage

but really those are for a different lib. this should only have RegExps that
call functions based on the path.

Questions: should each client connect to its own path? (/devices/client_id),
or, do they all connect to one path, and a client table lookup is done?

probably have to keep a client table anyway, though it could be part of the
device object.

*/
const WS = require( "ws" );
var clients = [];


function verifyClient( info ) {
	let routeRE = /^\/devices\/(.*)/;
	let route = routeRE.exec( info.req.url );
	if ( route ) {
		let routePath = route[ 1 ];

	}
}
