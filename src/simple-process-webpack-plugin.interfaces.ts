/**
 * Simple Progress Webpack Plugin Format
 */
export type SimpleProgressWebpackPluginFormat = 'minimal' | 'compact' | 'expanded' | 'verbose';

/**
 * Simple Progress Webpack Plugin Options
 */
export interface SimpleProgressWebpackPluginOptions {
  color?: boolean;
  format?: SimpleProgressWebpackPluginFormat;
}
