module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },
    env: {
        node: true,
        commonjs: true,
        es2022: true,
        jest: true,
    },
    plugins: ['eslint-plugin-prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        'no-void': ['error', { allowAsStatement: true }],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'class-methods-use-this': 'off',
        'no-console': 'off',
    },
};
