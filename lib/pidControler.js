"use strict";
/* eslint no-console: "off", no-unused-vars: "off" */
const EventEmitter = require( "events" );

module.exports = ( SetPoint, options ) => {
	let pidCtlr = new EventEmitter();
	pidCtlr.last = {
		input: 0,
		sampleTime: new Date(),
		integral: 0
	};

	pidCtlr.sampleTime = new Date();

	pidCtlr.SetPoint = SetPoint;
	pidCtlr.kp = options.kp || 0;
	pidCtlr.ki = options.ki || 0;
	pidCtlr.kd = options.kd || 0;
	pidCtlr.limits = options.limits || {};

	if ( options ) {
		if ( options.integral ) {
			pidCtlr.integral = true;
		}
		if ( options.derivative ) {
			pidCtlr.derivative = true;
		}
		if ( options.iterations ) {
			pidCtlr.iterations = options.iterations;
		}
	}


	pidCtlr.proportional = ( _error ) => {
		return _error + ( _error * pidCtlr.kp );
	};
	pidCtlr.integral = ( _error ) => {
		pidCtlr.last.integral += ( _error * pidCtlr.ki );
		return pidCtlr.last.integral;
	};
	pidCtlr.derivative = () => {};

	pidCtlr.errorState = ( reading, SetPoint ) => {
		return SetPoint - reading;
	};
};