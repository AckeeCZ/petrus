const { babelAliases } = require('./config/aliases');

const config = {
    presets: [
        '@babel/react',
        [
            '@babel/env',
            {
                useBuiltIns: false,
                loose: true,
                modules: process.env.BABEL_ENV === 'es' ? false : 'commonjs',
                bugfixes: true,
            },
        ],
    ],
    plugins: [
        [
            require.resolve('babel-plugin-transform-imports'),
            {
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
            },
        ],
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: babelAliases,
            },
        ],
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-transform-runtime'),
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};

module.exports = config;
