module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-uses-vars': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': 'off',
  },
  plugins: ['prettier', 'react', 'import', 'jsx-a11y'],
  settings: {
    react: {
      version: 'latest',
    },
  },
}
