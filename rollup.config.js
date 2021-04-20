import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import bundleSize from 'rollup-plugin-bundle-size';
import externals from 'rollup-plugin-node-externals';
import typescript from 'rollup-plugin-typescript2';

/**
 * Rollup configuration
 */
export default [
  {
    input: 'index.ts',
    plugins: [
      externals({
        builtins: true,
        deps: true,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
      }),
      resolve(),
      commonjs(),
      typescript(),
      bundleSize(),
    ],
    output: [
      {
        exports: 'default',
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'index.ts',
    plugins: [
      externals({
        builtins: true,
        deps: true,
        devDeps: true,
        peerDeps: true,
        optDeps: true,
      }),
      resolve(),
      commonjs(),
      typescript(),
      bundleSize(),
    ],
    output: [
      {
        exports: 'default',
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
];
