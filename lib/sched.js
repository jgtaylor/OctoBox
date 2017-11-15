"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
const EventEmitter = require( "events" ),
	moment = require( "moment" );
var later = require( "later" );

module.exports = ( s ) => {
	if ( !s ) {
		return new Error( "A schedule object is required." );
	}
	// so, something like a moment(later.schedule(s).next())...
	// if s = { schedules: [ { h: [ 18 ] } ], duration: 'PT18H' }
	let Schedule = new EventEmitter();
	Schedule.id = s.id;
	Schedule.definition = {
		schedules: s.schedules,
		exceptions: s.exceptions || []
	};
	Schedule.occurs = later.schedule( Schedule.definition );
	if ( s.duration ) {
		Schedule.duration = moment.duration( s.duration );
	}
	Schedule.enabled = false; // set to true on schedules.run(schedID)
	Schedule.timers = {}; // a place for timers to go.
	Schedule.associated = {};
	Schedule.toJSON = () => {
		return JSON.stringify( {
			id: Schedule.id,
			schedules: Schedule.definition.schedules,
			exceptions: Schedule.definition.exceptions || [],
			duration: Schedule.duration || null,
			enabled: Schedule.enabled,
			associated: Schedule.associated
		} );
	};
	return Schedule;
};
