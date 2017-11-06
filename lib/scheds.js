"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
/* this is a module, it should return an array of devices */
const EventEmitter = require( "events" ),
	Sched = require( "./sched.js" ),
	guid = require( "./guid.js" );

module.exports = () => {
	let sched = new EventEmitter();
	sched.scheds = {};

	sched.add = ( s ) => {
		let id = guid();
		sched.scheds[ id ] = Sched( s );
		sched.emit( "add", sched.scheds[ id ] );
		return sched;
	};

	sched.remove = ( sID ) => {
		if ( sched.scheds[ sID ] ) {
			sched.emit( "remove", sched.scheds[ sID ] );
			delete sched.scheds[ sID ];
			return sched;
		}
	};

	sched.list = ( sID ) => {
		if ( sID ) {
			return sched.scheds[ sID ];
		}
		return Object.keys( sched.scheds );
	};

	sched.get = ( sID ) => {
		return sched.scheds[ sID ];
	};

	sched.start = ( sID ) => {
		// run the scheduled assocations
	};

	sched.stop = ( sID ) => {
		// stop the schedule from running
	};

	sched.associate = ( sID, devID, cmd ) => {
		// do something to send the device the command at the scheduled time.
	};

	return sched;
};
