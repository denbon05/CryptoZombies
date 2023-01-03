module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
      },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  ignorePatterns: ['migrations/*', 'build/**'],
};
