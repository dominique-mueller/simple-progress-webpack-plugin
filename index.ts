'use strict';

// Disable the deprecation warning, popping up in the middle of the process
(process as any).noDeprecation = true;

import CompactLogger from './logger/compact-logger';
import MinimalLogger from  './logger/minimal-logger';
import VerboseLogger from './logger/verbose-logger';
import ExpandedLogger from './logger/expanded-logger';

export type PluginOptions = {
  format?: 'minimal' | 'compact' | 'expanded' | 'extended' | 'verbose' | 'debug',
  color?: boolean,
};

export type InternalOptions = {
  format: string;
  color: boolean;
}

function getOption( options: PluginOptions, key: string, value: string | boolean ): string | boolean {
	return ( options && options.hasOwnProperty( key ) ) ? options[ key ] : value;
}

/**
 * Simple Progress Plugin for Webpack
 *
 * @param options - Custom options
 */
export default function SimpleProgressWebpackPlugin( options: PluginOptions ) {

	const internalOptions: InternalOptions = {
		format: <string>getOption( options, 'format', 'compact' ),
		color: <boolean>getOption( options, 'color', true )
	};

	// Return the correct progress plugin
	switch ( internalOptions.format ) {
		case 'minimal':
			return MinimalLogger( internalOptions );
		case 'expanded':
		case 'extended':
			return ExpandedLogger( internalOptions );
		case 'verbose':
		case 'debug':
			return VerboseLogger( internalOptions );
		case 'compact':
		default:
			return CompactLogger( internalOptions );
	}

};
