import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import 'eslint-plugin-only-warn';
import { defineConfig, globalIgnores } from 'eslint/config';
import { importConfig } from './config/eslint/import.mjs';
import { javascriptConfig } from './config/eslint/javascript.mjs';
import { prettierConfig } from './config/eslint/prettier.mjs';
import { typescriptConfig } from './config/eslint/typescript.mjs';
import { unicornConfig } from './config/eslint/unicorn.mjs';

const eslintConfig = defineConfig([
  ...javascriptConfig,
  ...typescriptConfig,
  ...importConfig,
  ...unicornConfig,
  ...prettierConfig,
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Ignore generated Prisma files
    'src/generated/**',
  ]),
]);

export default eslintConfig;
