module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb', 
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    'project': ['tsconfig.json'],
    'tsconfigRootDir': __dirname,
    'ecmaVersion': 2021,
    'sourceType': 'module',
  },
  plugins: ['react', 'import', 'react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
  },
  'settings': {
    'import/resolver': {
        'typescript': {
            'alwaysTryTypes': true
        }
    }
  }
}
