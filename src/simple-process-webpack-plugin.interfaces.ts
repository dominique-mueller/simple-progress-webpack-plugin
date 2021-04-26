/**
 * Simple Progress Webpack Plugin Format
 */
export type SimpleProgressWebpackPluginFormat = 'compact' | 'expanded' | 'minimal' | 'simple' | 'verbose';

/**
 * Simple Progress Webpack Plugin Options
 */
export interface SimpleProgressWebpackPluginOptions {
  color: boolean;
  format: SimpleProgressWebpackPluginFormat;
  name: string;
}
