import webpack, { Compiler, WebpackPluginInstance } from 'webpack';

import { SimpleProgressWebpackPluginOptions } from '../simple-process-webpack-plugin.interfaces';

/**
 * Verbose Logger (aka "the full truth")
 */
export class VerboseLogger implements WebpackPluginInstance {
  /**
   * Options
   */
  private readonly options: SimpleProgressWebpackPluginOptions;

  /**
   * Constructor
   *
   * @param options Options
   */
  constructor(options: SimpleProgressWebpackPluginOptions) {
    this.options = options;
  }
  /**
   * Apply
   *
   * @param compiler Compiler
   */
  public apply(compiler: Compiler): ReturnType<WebpackPluginInstance['apply']> {
    // Variables for the process, reset after each run
    let startTime = new Date();
    let previousStep = 0;

    /**
     * Use the webpack-internal progress plugin as the base
     */
    return new webpack.ProgressPlugin((progress, message, moduleProgress, activeModules, moduleName) => {
      // Initial logs
      let logLine = this.options.name;

      // Reset process variables for this run
      if (previousStep === 0) {
        console.log(`${this.getTimePrefix()} ${logLine}\n`);
        startTime = new Date();
      }

      // STEP 1: COMPILATION
      if (progress >= 0 && progress < 0.1) {
        logLine = 'Compile modules';
        previousStep = 1;
      }

      // STEP 2: BUILDING
      if (progress >= 0.1 && progress <= 0.7) {
        logLine = 'Build modules';
        if (moduleName !== undefined) {
          logLine += ` (${moduleName})`;
        }
        previousStep = 2;
      }

      // STEP 3: OPTIMIZATION
      if (progress > 0.7 && progress < 0.95) {
        logLine = `Optimize modules (${message})`;
        previousStep = 3;
      }

      // STEP 4: EMIT
      if (progress >= 0.95 && progress < 1) {
        logLine = 'Emit files';
        previousStep = 4;
      }

      // STEP 5: FOOTER
      if (progress === 1) {
        // Calculate process time
        previousStep = 0;
        const finishTime = new Date();
        const processTime = ((finishTime.getTime() - startTime.getTime()) / 1000).toFixed(3);

        logLine = `Finished after ${processTime} seconds.\n`;
      }

      // Finally, let's bring those logs to da screen
      if (progress === 1) {
        console.log(`\n${this.getTimePrefix()} ${logLine}`);
      } else {
        console.log(`${this.getTimePrefix()} Webpack (${Math.round(progress * 100)}%) - ${logLine}`);
      }
    }).apply(compiler);
  }

  /**
   * Calculate a time prefix (similar to what Gulp does)
   */
  private getTimePrefix(): string {
    const date = new Date();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `[${hours}:${minutes}:${seconds}]`;
  }
}
