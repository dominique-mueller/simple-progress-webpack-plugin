import chalk from 'chalk';
import figures from 'figures';
import log from 'log-update';
import * as path from 'path';
import webpack, { Compiler, WebpackPluginInstance } from 'webpack';

import { SimpleProgressWebpackPluginOptions } from '../simple-process-webpack-plugin.interfaces';

/**
 * Compact logger
 */
export class CompactLogger implements WebpackPluginInstance {
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
    const absoluteProjectPath = `${path.resolve('.').toString()}`;
    return new webpack.ProgressPlugin((progress, message, moduleProgress, activeModules, moduleName) => {
      // Initial log
      const logLines = [];

      // pick name of the build
      const name = this.options.name;

      // Reset process variables for this run
      if (previousStep === 0) {
        log(name);
        startTime = new Date();
      }

      // STEP 0: HEADER
      logLines.push(chalk.white(`${name}\n`));

      // STEP 1: COMPILATION
      if (progress >= 0 && progress < 0.1) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 1) {
          return;
        }
        previousStep = 1;

        logLines.push(chalk.white(`  ${figures.pointer} Compile modules`));
      } else if (progress >= 0.1) {
        logLines.push(chalk.green(`  ${figures.tick} Compile modules`));
      }

      // STEP 2: BUILDING
      if (progress >= 0.1 && progress <= 0.7) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 2) {
          return;
        }
        previousStep = 2;

        // Log progress line (with sub-progress indicator)
        const subProgress = Math.round(((progress - 0.1) * 10000) / 60);
        logLines.push(chalk.white(`  ${figures.pointer} Build modules (${subProgress}%)`));

        // Log additional information (if possible)
        if (moduleName !== undefined) {
          let betterModuleName = moduleName;

          // Only show the file that is actually being processed (and remove all details about used loaders)
          if (betterModuleName.indexOf('!') !== -1) {
            const splitModuleName = betterModuleName.split('!');
            betterModuleName = splitModuleName[splitModuleName.length - 1];
          }

          // Transform absolute paths into relative ones (to shorten the so so incredible long path)
          if (betterModuleName.indexOf(absoluteProjectPath) !== -1) {
            betterModuleName = betterModuleName
              .split(`${absoluteProjectPath}`)[1] // Transform absolute path to relative one
              .substring(1); // Remove leading path slash
          }

          // Improve the path presentation further by enforcing style consistency and removing unnecessary details
          betterModuleName = betterModuleName.replace(/\\/g, '/').replace('./', '').replace('multi ', '');

          // Add extra details about whether the currently processed module is an internal or external one
          if (betterModuleName.startsWith('node_modules')) {
            betterModuleName = `${betterModuleName} ~ external`;
          }
          if (betterModuleName.startsWith('src')) {
            betterModuleName = `${betterModuleName} ~ internal`;
          }

          const [betterModulesDone, betterAllModules] = moduleProgress.split('/');
          const moduleDetails = `${betterModulesDone} of ${betterAllModules} :: ${betterModuleName}`;
          logLines.push(chalk.grey(`    ${figures.arrowRight} ${moduleDetails}`));
        }
      } else if (progress > 0.7) {
        logLines.push(chalk.green(`  ${figures.tick} Build modules`));
      }

      // STEP 3: OPTIMIZATION
      if (progress > 0.7 && progress < 0.95) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 3) {
          return;
        }
        previousStep = 3;

        // Log progress line (with sub-progress indicator)
        const subProgress = Math.round(((progress - 0.71) * 10000) / 23);
        logLines.push(chalk.white(`  ${figures.pointer} Optimize modules (${subProgress}%)`));

        const formattedMessage = `${message[0].toUpperCase()}${message.slice(1)}`;
        const formattedMessageExtra = progress === 0.91 ? ' -- may take a while' : ''; // Add some extra info (calming devs down)

        logLines.push(chalk.grey(`    ${figures.arrowRight} ${formattedMessage}${formattedMessageExtra} ...`));
      } else if (progress >= 0.95) {
        logLines.push(chalk.green(`  ${figures.tick} Optimize modules`));
      }

      // STEP 4: EMIT
      if (progress >= 0.95 && progress < 1) {
        // Skip if we jumped back a step, else update the step counter
        if (previousStep > 4) {
          return;
        }
        previousStep = 4;

        logLines.push(chalk.white(`  ${figures.pointer} Emit files`));
      } else if (progress === 1) {
        logLines.push(chalk.green(`  ${figures.tick} Emit files`));
      }

      // STEP 5: FOOTER
      if (progress === 1) {
        // Calculate process time
        previousStep = 0;
        const finishTime = new Date();
        const processTime = ((finishTime.getTime() - startTime.getTime()) / 1000).toFixed(3);

        logLines.push(chalk.white(`\nFinished after ${processTime} seconds.\n`));
      }

      // Finally, let's bring those logs to da screen
      log(logLines.join('\n'));
      if (progress === 1) {
        log.done();
      }
    }).apply(compiler);
  }
}
