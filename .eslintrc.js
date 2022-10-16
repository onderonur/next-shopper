module.exports = {
  plugins: ['prettier', '@typescript-eslint', 'deprecation'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next',
  ],
  parser: '@typescript-eslint/parser',
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
    curly: 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    curly: 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
};
