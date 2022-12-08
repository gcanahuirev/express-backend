module.exports = {
  env: {
    node: true,
    es2017: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'simple-import-sort',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'prettier',
  ],
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/exports': 'error',
    /* 'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ], */
  },
};
