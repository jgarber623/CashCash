#!/usr/bin/env node

const colors = require('colors');
const exec = require('child_process').exec;
const pkg = require('../package.json');

const preamble = `/*!
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

exec(`$(npm bin)/uglifyjs src/cashcash.js --beautify 'indent-level=2' --preamble '${preamble}' --output dist/cashcash.js`);
exec(`$(npm bin)/uglifyjs src/cashcash.js --compress --mangle --preamble '${preamble}' --output dist/cashcash.min.js`);

console.log(colors.green(`CashCash ${pkg.version} built successfully!`));
