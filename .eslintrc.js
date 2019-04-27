const path = require('path');

const pathToSrc = path.resolve(__dirname, './src');

module.exports = {
    env: {
        browser: true,
        'jest/globals': true,
    },
    extends: ['ackee', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['jest', 'import'],
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js',
            },
        },
    },
};
