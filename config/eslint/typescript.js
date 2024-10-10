const path = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      // eslint-plugin-deprecation and some of @typescript-eslint rules only work for .ts and .tsx files.
      // So, linting was not working for .js files like postcss.config.js etc.
      // As a solution, we applied the plugin to only .ts and .tsx files.
      // https://github.com/gund/eslint-plugin-deprecation#prerequisites
      // https://stackoverflow.com/a/64488474/10876256
      files: ['*.ts?(x)'],
      parserOptions: {
        project: path.resolve(process.cwd(), 'tsconfig.json'),
      },
      plugins: ['deprecation'],
      // Contains all of recommended, recommended-type-checked, and strict,
      // along with additional strict rules that require type information.
      // https://typescript-eslint.io/linting/configs/#strict-type-checked
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      rules: {
        'deprecation/deprecation': 'warn',
        '@typescript-eslint/prefer-destructuring': 'warn',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-misused-promises': [
          'warn',
          { checksVoidReturn: false },
        ],
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          { allowNumber: true },
        ],
      },
    },
  ],
};
