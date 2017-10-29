"use strict";
const EventEmitter = require( "events" ),
	moment = require( "moment" );

module.exports = ( s ) => {
	if ( !s ) {
		return new Error( "A schedule object is required." );
	}
	let sched = new EventEmitter();
	let {
		duration,
		start
	} = s;

	sched.startTime = moment( start );
	sched.durationTime = moment.duration( duration );
	sched.stopTime = moment( sched.startTime )
		.add( sched.durationTime );

	return sched;
};
