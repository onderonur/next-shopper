module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
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
