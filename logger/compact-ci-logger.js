'use strict';

const path = require( 'path' );

const chalk = require( 'chalk' );
const figures = require( 'figures' );

const ProgressPlugin = require( 'webpack/lib/ProgressPlugin' );

/**
 * Expanded Logger
 */
module.exports = function CompactCILogger( options ) {

	// Configure color
	chalk.enabled = options.color;

	const absoluteProjectPath = `${ path.resolve( '.' ).toString() }`;

	// Variables for the process, reset after each run
	let startTime;
	let previousStep = 0;

	// Initial log
	console.log( chalk.white( 'Webpack: Starting ...' ) );

	/**
	 * Use the webpack-internal progress plugin as the base of the logger
	 */
	return new ProgressPlugin( ( progress, message, moduleProgress, activeModules, moduleName ) => {

		// Reset process variables for this run
		if ( previousStep === 0 ) {
			startTime = new Date().getTime();
		}

		// STEP 1: COMPILATION
		if ( progress >= 0 && progress < 0.1 ) {

			// Skip if we jumped back a step, else update the step counter
			if ( previousStep > 1 ) {
				return;
			} else if ( previousStep < 1 ) {
				console.log( chalk.white( `  ${ figures.pointer } Compile modules` ) );
			}
			previousStep = 1;

		}

		// STEP 2: BUILDING
		if ( progress >= 0.1 && progress <= 0.7 ) {

			// Skip if we jumped back a step, else update the step counter
			if ( previousStep > 2 ) {
				return;
			} else if ( previousStep < 2 ) {
				console.log( chalk.white( `  ${ figures.pointer } Build modules` ) );
			}
			previousStep = 2;
		}

		// STEP 3: OPTIMIZATION
		if ( progress > 0.7 && progress < 0.95 ) {

			// Skip if we jumped back a step, else update the step counter
			if ( previousStep > 3 ) {
				return;
			} else if ( previousStep < 3 ) {
				console.log( chalk.white( `  ${ figures.pointer } Optimize modules` ) );
			}
			previousStep = 3;

		}

		// STEP 4: EMIT
		if ( progress >= 0.95 && progress < 1 ) {

			// Skip if we jumped back a step, else update the step counter
			if ( previousStep > 4 ) {
				return;
			} else if ( previousStep < 4 ) {
				console.log( chalk.white( `  ${ figures.pointer } Emit files` ) );
			}
			previousStep = 4;

		}

		// STEP 5: FOOTER
		if ( progress === 1 ) {

			// Calculate process time
			previousStep = 0;
			const finishTime = new Date().getTime();
			const processTime = ( ( finishTime - startTime ) / 1000 ).toFixed( 3 );

			console.log( chalk.white( `Webpack: Finished after ${ processTime } seconds.\n` ) );

		}

	} );

};
