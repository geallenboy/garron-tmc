const reactLint = require('@garron/standard/dist/typescriptLint');

reactLint.rules['@typescript-eslint/no-require-imports'] = 0
module.exports = {
  ...reactLint
};
