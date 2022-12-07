module.exports = {
  env: {
    node: true,
    es2021: true,
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
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'simple-import-sort',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'import/extensions': [0],
    'class-methods-use-this': [0],
    'prettier/prettier': ['error'],
    'simple-import-sort/exports': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
