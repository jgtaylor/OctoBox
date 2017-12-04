"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
const EventEmitter = require( "events" ),
	Sched = require( "./sched.js" ),
	guid = require( "./guid.js" ),
	later = require( "later" );

module.exports = () => {
	let Schedules = new EventEmitter();
	Schedules.scheds = {};

	Schedules.add = ( s ) => {
		let sID = guid();
		s.id = sID;
		Schedules.scheds[ sID ] = Sched( s );
		Schedules.emit( "add", Schedules.scheds[ sID ] );
		return Schedules.get( sID );
	};

	Schedules.remove = ( sID ) => {
		if ( Schedules.scheds[ sID ] ) {
			Schedules.emit( "remove", Schedules.scheds[ sID ] );
			delete Schedules.scheds[ sID ];
			return Schedules;
		}
	};

	Schedules.list = ( sID ) => {
		if ( sID ) {
			return Schedules.get( sID );
		}
		return Object.keys( Schedules.scheds );
	};

	Schedules.get = ( sID ) => {
		return Schedules.scheds[ sID ];
	};

	Schedules.start = ( sID ) => {
		// run the scheduled assocations
		let _sched = Schedules.get( sID );
		_sched.enabled = true;
		_sched.timers = later.setInterval( _sched.associated, _sched.definition );
		return _sched.timers;
	};

	Schedules.stop = ( sID ) => {
		// stop the schedule from running
		let _sched = Schedules.get( sID );
		_sched.enabled = false;
		return _sched.timers.clear();
	};

	Schedules.associate = ( sID, device, cmd ) => {
		// do something to send the device the command at the scheduled time.
		// Schedules.get(sID).timers = later.setInterval(devID.conn.send(cmd))
		Schedules.get( sID )
			.associated = () => {
				device.send( cmd );
			};
	};

	Schedules.toJSON = () => {
		let _schedules = [];
		Schedules.list()
			.forEach( ( s ) => {
				_schedules.push( s.toJSON() );
			} );
		return _schedules;
	};

	return Schedules;
};