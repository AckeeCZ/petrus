const { babelAliases } = require('./config/aliases');

const config = {
    presets: [['@babel/react']],
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
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};

if (process.env.BABEL_ENV === 'es') {
    config.presets.push([
        '@babel/modules',
        {
            loose: true,
        },
    ]);
} else {
    config.presets.push([
        '@babel/env',
        {
            loose: true,
        },
    ]);

    config.plugins.push(
        ...[
            require.resolve('@babel/plugin-proposal-object-rest-spread'),
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-transform-runtime'),
        ],
    );
}

module.exports = config;
