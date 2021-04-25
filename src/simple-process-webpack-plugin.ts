import chalk from 'chalk';
import webpack, { WebpackPluginInstance } from 'webpack';

import { CompactLogger } from './loggers/CompactLogger';
import { ExpandedLogger } from './loggers/ExpandedLogger';
import { MinimalLogger } from './loggers/MinimalLogger';
import { VerboseLogger } from './loggers/VerboseLogger';
import { SimpleProgressWebpackPluginOptions } from './simple-process-webpack-plugin.interfaces';

/**
 * Simple Progress Plugin for Webpack
 *
 * @param options - Custom options
 */
export class SimpleProgressWebpackPlugin implements WebpackPluginInstance {
  /**
   * Options
   */
  private options: SimpleProgressWebpackPluginOptions;

  /**
   * Constructor
   *
   * @param options
   */
  constructor(options: Partial<SimpleProgressWebpackPluginOptions>) {
    this.options = {
      color: true,
      format: 'compact',
      name: 'Webpack: Starting ...',
      ...options,
    };
  }

  /**
   * Apply
   */
  public apply(compiler: webpack.Compiler): ReturnType<WebpackPluginInstance['apply']> {
    // Disable color if specifically configured
    if (this.options.color === false) {
      chalk.supportsColor = false;
    }

    // Run the correct plugin, falling back to 'compact' by default
    const progressPlugin =
      this.options.format === 'minimal'
        ? new MinimalLogger(this.options)
        : this.options.format === 'expanded'
        ? new ExpandedLogger(this.options)
        : this.options.format === 'verbose'
        ? new VerboseLogger(this.options)
        : new CompactLogger(this.options);
    return progressPlugin.apply(compiler);
  }
}
