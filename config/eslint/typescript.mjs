import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.Config} */
export const typescriptConfig = [
  ...tseslint.configs.strictTypeChecked,
  // https://typescript-eslint.io/getting-started/typed-linting/
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
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
  // https://typescript-eslint.io/troubleshooting/typed-linting/#how-can-i-disable-type-aware-linting-for-a-set-of-files
  {
    files: ['**/*.{js,mjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
];
