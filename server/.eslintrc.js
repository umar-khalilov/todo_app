module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['standard', 'eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'no-void': ['error', { allowAsStatement: true }],
        'class-methods-use-this': 'off',
        'no-loop-func': 'warn',
        'no-await-in-loop': 'off',
        'no-promise-executor-return': 'off',
        'no-console': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
};
