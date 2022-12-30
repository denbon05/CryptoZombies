module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'airbnb', 'airbnb/hooks'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'all',
        singleQuote: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  ignorePatterns: ['migrations/*', 'truffle-config.js', 'build/**'],
};
