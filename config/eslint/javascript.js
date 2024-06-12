/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'object-shorthand': 'warn',
    curly: ['warn', 'multi-line'],
    eqeqeq: 'warn',
    'no-param-reassign': 'error',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
  },
};
