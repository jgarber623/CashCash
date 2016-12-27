#!/usr/bin/env node

let colors = require('colors');
let childProcess = require('child_process');
let pkg = require('../package.json');

let preamble = `/*!
 *  CashCash ${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) 2016-present ${pkg.author.name} (${pkg.author.url})
 *
 *  CashCash may be freely distributed under the ${pkg.license} license.
 */
`;

childProcess.exec(`$(npm bin)/uglifyjs src/cashcash.js --beautify 'indent-level=2' --preamble '${preamble}' --output dist/cashcash.js`);
childProcess.exec(`$(npm bin)/uglifyjs src/cashcash.js --compress --mangle --preamble '${preamble}' --output dist/cashcash.min.js`);

console.log(colors.green(`CashCash ${pkg.version} built successfully!`));
