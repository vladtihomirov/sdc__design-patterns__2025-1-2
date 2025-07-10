module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'linebreak-style': 'off',
    'no-console': 'warn',
    'no-restricted-syntax': 'off',
    'no-restricted-globals': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'warn',
    'eol-last': 'warn',
    'global-require': 'off',
    'max-len': 'warn',
    'max-classes-per-file': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
