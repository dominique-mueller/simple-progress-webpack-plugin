'use strict';

import chalk from 'chalk';
import { ProgressPlugin } from 'webpack';
import { InternalOptions } from '..';

/**
 * Verbose Logger (aka "the full truth")
 */
export default function VerboseLogger( options: InternalOptions ) {

	// Variables for the process, reset after each run
	let startTime: number;
	let previousStep: number = 0;

	// Configure color
	chalk.enabled = options.color;

	// Initial logs
	let logLine: string;
	console.log( `${ getTimePrefix() } Webpack: Starting ...\n` );

	/**
	 * Use the webpack-internal progress plugin as the base
	 */
	return new ProgressPlugin( ( progress, message, moduleProgress, activeModules, moduleName ) => {

		// Reset process variables for this run
		if ( previousStep === 0 ) {
			startTime = new Date().getTime();
		}

		// STEP 1: COMPILATION
		if ( progress >= 0 && progress < 0.1 ) {
			logLine = 'Compile modules';
			previousStep = 1;
		}

		// STEP 2: BUILDING
		if ( progress >= 0.1 && progress <= 0.7 ) {
			logLine = 'Build modules';
			if ( moduleName !== undefined ) {
				logLine += ` (${ moduleName })`;
			}
			previousStep = 2;
		}

		// STEP 3: OPTIMIZATION
		if ( progress > 0.7 && progress < 0.95 ) {
			logLine = `Optimize modules (${ message })`;
			previousStep = 3;
		}

		// STEP 4: EMIT
		if ( progress >= 0.95 && progress < 1 ) {
			logLine = 'Emit files';
			previousStep = 4;
		}

		// STEP 5: FOOTER
		if ( progress === 1 ) {

			// Calculate process time
			previousStep = 0;
			const finishTime = new Date().getTime();
			const processTime = ( ( finishTime - startTime ) / 1000 ).toFixed( 3 );

			logLine = `Webpack: Finished after ${ processTime } seconds.\n`;

		}

		// Finally, let's bring those logs to da screen
		if ( progress === 1 ) {
			console.log( `\n${ getTimePrefix() } ${ logLine }` );
		} else {
			console.log( `${ getTimePrefix() } Webpack (${ Math.round( progress * 100 ) }%) - ${ logLine }` );
		}

	} );

};

/**
 * Calculate a time prefix (similar to what gulp does)
 */
function getTimePrefix(): string {
	const date: Date = new Date();
	const hours: string = `0${ date.getHours() }`.slice( -2 );
	const minutes: string = `0${ date.getMinutes() }`.slice( -2 );
	const seconds: string = `0${ date.getSeconds() }`.slice( -2 );
	return `[${ hours }:${ minutes }:${ seconds }]`;
}
