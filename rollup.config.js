import pkg from './package.json';

import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

const packageName = 'CashCash';
const releaseYear = 2016;
const srcFilePath = 'src/cashcash.js';

const filesizePluginOptions = {
  format: {
    exponent: 0,
    fullform: true
  },
  theme: 'light'
};

const preamble = `/*!
 *  ${packageName} v${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) ${releaseYear}-present ${pkg.author.name} (${pkg.author.url})
 *
 *  ${packageName} may be freely distributed under the ${pkg.license} license.
 */
`;

export default [
  // cashcash.mjs and cashcash.js
  {
    input: srcFilePath,
    output: [
      {
        file: pkg.module,
        format: 'es'
      },
      {
        file: pkg.main,
        format: 'umd',
        name: packageName
      }
    ],
    plugins: [
      filesize(filesizePluginOptions),
      terser({
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          indent_level: 2,
          preamble: preamble
        }
      })
    ]
  },

  // cashcash.min.js
  {
    input: srcFilePath,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: packageName
    },
    plugins: [
      filesize(filesizePluginOptions),
      terser({
        output: {
          preamble: preamble
        }
      })
    ]
  }
];
