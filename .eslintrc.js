module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['deprecation'],
  // For eslint-plugin-deprecation:
  // https://github.com/gund/eslint-plugin-deprecation#prerequisites
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        // for eslint-plugin-deprecation
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
    'deprecation/deprecation': 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
  },
};
