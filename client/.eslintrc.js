module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'linebreak-style': ['error', 'unix'],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react/prop-types': 1,
    },
};
