import chalk from 'chalk';
import { ProgressPlugin } from 'webpack';

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
export const SimpleProgressWebpackPlugin = (options: SimpleProgressWebpackPluginOptions): ProgressPlugin => {
  // Disable color if specifically configured
  if (options.color === false) {
    chalk.supportsColor = false;
  }

  // Return the correct progress plugin
  switch (options.format) {
    case 'minimal':
      return MinimalLogger();
    case 'expanded':
      return ExpandedLogger();
    case 'verbose':
      return VerboseLogger();
    case 'compact':
    default:
      return CompactLogger();
  }
};
