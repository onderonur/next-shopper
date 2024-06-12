/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    './config/eslint/javascript',
    './config/eslint/typescript',
    './config/eslint/import',
    './config/eslint/unicorn',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['only-warn'],
  reportUnusedDisableDirectives: true,
  // Files starting with . are ignored by default.
  // This was causing a warning for lint-staged
  // and since we have --max-warnings 0, the check was failing.
  // So, we removed these files by using "!" from ignoredPatterns.
  ignorePatterns: ['!.*.{js,ts}'],
  rules: {
    // TODO: `curly` rule is not working even if it is in `./config/eslint/javascript`.
    // The reason is, it conflicts with `eslint-config-prettier` and gets overriden
    // when it comes after this config file in the `extends` field of the root config file.
    // So, we add it here to make it work.
    // The one in the extended config is stale.
    curly: ['warn', 'multi-line'],
  },
};
