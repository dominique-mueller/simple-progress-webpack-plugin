import chalk from 'chalk';
import figures from 'figures';
import webpack, { Compiler, WebpackPluginInstance } from 'webpack';

import { SimpleProgressWebpackPluginOptions } from '../simple-process-webpack-plugin.interfaces';

/**
 * Simple Logger
 */
export class SimpleLogger implements WebpackPluginInstance {
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
     * Use the webpack-internal progress plugin as the base of the logger
     */
    return new webpack.ProgressPlugin((progress) => {
      // Reset process variables for this run
      if (previousStep === 0) {
        console.log(chalk.white(this.options.name));
        startTime = new Date();
      }

      // STEP 1: COMPILATION
      if (progress >= 0 && progress < 0.1) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 1) {
          return;
        } else if (previousStep < 1) {
          console.log(chalk.white(`\n  ${figures.pointer} Compile modules`));
        }
        previousStep = 1;
      }

      // STEP 2: BUILDING
      if (progress >= 0.1 && progress <= 0.7) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 2) {
          return;
        } else if (previousStep < 2) {
          console.log(chalk.white(`  ${figures.pointer} Build modules`));
        }
        previousStep = 2;
      }

      // STEP 3: OPTIMIZATION
      if (progress > 0.7 && progress < 0.95) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 3) {
          return;
        } else if (previousStep < 3) {
          console.log(chalk.white(`  ${figures.pointer} Optimize modules`));
        }
        previousStep = 3;
      }

      // STEP 4: EMIT
      if (progress >= 0.95 && progress < 1) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 4) {
          return;
        } else if (previousStep < 4) {
          console.log(chalk.white(`  ${figures.pointer} Emit files`));
        }
        previousStep = 4;
      }

      // STEP 5: FOOTER
      if (progress === 1) {
        // Calculate process time
        previousStep = 0;
        const finishTime = new Date();
        const processTime = ((finishTime.getTime() - startTime.getTime()) / 1000).toFixed(3);

        console.log(chalk.white(`\nFinished after ${processTime} seconds.\n`));
      }
    }).apply(compiler);
  }
}
