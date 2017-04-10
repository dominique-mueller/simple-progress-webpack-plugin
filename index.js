'use strict';

// Disable the deprecation warning, popping up in the middle of the process
process.noDeprecation = true;

const CompactLogger = require( './logger/compact-logger' );
const MinimalLogger = require( './logger/minimal-logger' );
const VerboseLogger = require( './logger/verbose-logger' );
const ExpandedLogger = require( './logger/expanded-logger' );

/**
 * Simple Progress Plugin for Webpack
 *
 * @param options - Custom options
 */
module.exports = function SimpleProgressWebpackPlugin( options ) {

	// Merge options
	let internalOptions = {
		format: ( options && options.hasOwnProperty( 'format' ) ) ? options.format : 'compact'
	};

	// Return the correct progress plugin
	switch( internalOptions.format ) {
		case 'minimal':
			return MinimalLogger();
		case 'compact':
			return CompactLogger();
		case 'expanded':
		case 'extended':
			return ExpandedLogger();
		case 'verbose':
		case 'debug':
			return VerboseLogger();
		default:
			return CompactLogger();
	}

};
