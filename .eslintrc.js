module.exports = {
  plugins: ['prettier', '@typescript-eslint', 'deprecation'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  // For eslint-plugin-deprecation:
  // https://stackoverflow.com/a/64488474/10876256
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
    curly: 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-shadow': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
