module.exports = {
  extends: [
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
    'require-await': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  // For eslint-plugin-deprecation:
  // https://github.com/gund/eslint-plugin-deprecation#prerequisites
  // https://stackoverflow.com/a/64488474/10876256
  overrides: [
    {
      // eslint-plugin-deprecation only works for .ts and .tsx files.
      // So, linting was not working for .js files like postcss.config.js etc.
      // As a solution, we applied the plugin to only .ts and .tsx files.
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['deprecation'],
      rules: {
        'deprecation/deprecation': 'warn',
      },
    },
  ],
};
