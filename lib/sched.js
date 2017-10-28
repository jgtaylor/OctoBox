"use strict";
const EventEmitter = require( "events" ),
	moment = require( "moment" );

module.exports = ( s ) => {
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
