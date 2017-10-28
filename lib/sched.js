"use strict";
const EventEmitter = require( "events" ),
	moment = require( "moment" );

module.exports = ( s ) => {
	if ( !s ) {
		return new Error( "A schedule object is required." );
	}
	let {
		duration,
		start
	} = s;
	let sched = new EventEmitter();
	sched.startTime = moment( start ),
	sched.durationTime = moment.duration( duration ),
	sched.stopTime = moment( sched.startTime )
		.add( sched.durationTime );
	return sched;
};
