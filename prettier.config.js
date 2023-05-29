// We use a fork because the main branch does not respect prettier-ignore:
// https://github.com/trivago/prettier-plugin-sort-imports/issues/112
const pluginSortImports = require('@ianvs/prettier-plugin-sort-imports');
const pluginTailwindcss = require('prettier-plugin-tailwindcss');

// See https://github.com/prettier/prettier/issues/10259
/** @type {import("prettier").Parser}  */
const myParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
};

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: myParser,
  },
};

module.exports = {
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: false,
  singleQuote: true,
  plugins: [myPlugin],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@privy-io/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
