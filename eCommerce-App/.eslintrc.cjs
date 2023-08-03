module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:react-hooks/recommended',
    'airbnb', 
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
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
  plugins: ['react', 'import', 'react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    "import/extensions": "off",
  },
  "settings": {
    "import/resolver": {
        "typescript": {
            "alwaysTryTypes": true
        }
    }
  }
}
