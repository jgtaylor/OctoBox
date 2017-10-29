"use strict";
const EventEmitter = require( "events" ),
	moment = require( "moment" );

module.exports = ( s ) => {
	if ( !s ) {
		return new Error( "A schedule object is required." );
	}
	let Schedule = new EventEmitter();
	let {
		duration,
		start
	} = s;

	Schedule.startTime = moment( start );
	Schedule.durationTime = moment.duration( duration );
	Schedule.stopTime = moment( Schedule.startTime )
		.add( Schedule.durationTime );

	return Schedule;
};
