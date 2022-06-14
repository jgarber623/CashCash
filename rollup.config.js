import pkg from './package.json';

import { terser } from 'rollup-plugin-terser';

const preamble = `/*!
 *  ${pkg.config.displayName} v${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) ${pkg.config.licenseYear}-present ${pkg.author.name} (${pkg.author.url})
 *
 *  ${pkg.config.displayName} may be freely distributed under the ${pkg.license} license.
 */
`;

const terserConfig = {
  compress: false,
  mangle: false,
  output: {
    beautify: true,
    indent_level: 2,
    preamble: preamble
  }
};

export default ({ input }) => [
  {
    input: input,
    output: { file: pkg.module, format: 'es' },
    plugins: [terser(terserConfig)]
  },
  {
    input: input,
    output: { file: pkg.main, format: 'umd', name: pkg.config.displayName },
    plugins: [terser(terserConfig)]
  },
  {
    input: input,
    output: { file: pkg.browser, format: 'umd', name: pkg.config.displayName },
    plugins: [terser({ output: { preamble: preamble }})]
  }
];
