module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'linebreak-style': ['error', 'unix'],
        'key-spacing': ['error', { mode: 'strict' }],
        'react/prop-types': 1,
    },
};
