// Type definitions for simple-progress-webpack-plugin >=1.1.2
// Project: https://github.com/dominique-mueller/simple-progress-webpack-plugin
// Definitions by: Daniel Zhang <https://github.com/fadezhanger>
// TypeScript Version: 2.9

import {ProgressPlugin} from 'webpack';

interface CreateLogger extends Function {
  new(): ProgressPlugin;
  new(options: Plugin.Options): ProgressPlugin;
}

declare const Plugin: CreateLogger;

declare namespace Plugin {
  type Options = {
    format?: 'minimal' | 'compact' | 'expanded' | 'extended' | 'verbose' | 'debug',
    color?: boolean,
  };
}

export = Plugin;
