'use strict';

const path = require( 'path' );

const ProgressPlugin = require( 'webpack/lib/ProgressPlugin' );

/**
 * Verbose Logger (aka "the full truth")
 */
module.exports = function VerboseLogger() {

	const startTime = new Date().getTime();

	// Initial logs
	let logLine;
	console.log( `${ getTimePrefix() } Webpack: Starting ...\n` );

	/**
	 * Use the webpack-internal progress plugin as the base
	 */
	return new ProgressPlugin( ( progress, message, moduleProgress, activeModules, moduleName ) => {

		// STEP 1: COMPILATION
		if ( progress >= 0 && progress < 0.1 ) {
			logLine = 'Compile modules';
		}

		// STEP 2: BUILDING
		if ( progress >= 0.1 && progress <= 0.7 ) {
			logLine = 'Build modules';
			if ( moduleName !== undefined ) {
				logLine += ` (${ moduleName })`;
			}
		}

		// STEP 3: OPTIMIZATION
		if ( progress > 0.7 && progress < 0.95 ) {
			logLine = `Optimize modules (${ message })`;
		}

		// STEP 4: EMIT
		if ( progress >= 0.95 && progress < 1 ) {
			logLine = 'Emit files';
		}

		// STEP 5: FOOTER
		if ( progress === 1 ) {

			// Calculate process time
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
function getTimePrefix() {
	const date = new Date();
	const hours = `0${ date.getHours() }`.slice( -2 );
	const minutes = `0${ date.getMinutes() }`.slice( -2 );
	const seconds = `0${ date.getSeconds() }`.slice( -2 );
	return `[${ hours }:${ minutes }:${ seconds }]`;
}
