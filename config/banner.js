import pkg from '../package.json';

export default `/*!
 *  CashCash v${pkg.version}
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
