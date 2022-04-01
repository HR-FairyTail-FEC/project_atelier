module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": 0,
    "no-console": 1
  },
};
