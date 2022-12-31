module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    mocha: true,
  },
  globals: {
    contract: 'readonly',
    artifacts: 'readonly',
    assert: 'readonly',
    expect: 'readonly',
    should: 'readonly',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};
