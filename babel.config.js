const { babelAliases } = require('./config/aliases');

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
                targets: {
                    esmodules: true,
                },
            },
        ],
        '@babel/react',
    ],
    plugins: [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-transform-runtime'),
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
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};
