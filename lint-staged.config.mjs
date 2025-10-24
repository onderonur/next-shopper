// https://nextjs.org/docs/app/api-reference/config/eslint#lint-staged
import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `eslint --max-warnings 0 --fix ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')}`;

const config = {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default config;
