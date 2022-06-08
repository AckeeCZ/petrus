const path = require('path');

const config = {
    presets: [
        [
            '@babel/typescript',
            {
                onlyRemoveTypeImports: true,
                allowDeclareFields: true,
            },
        ],
        [
            '@babel/react',
            {
                useSpread: true,
                useBuiltIns: true,
                runtime: 'automatic',
            },
        ],
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
            require.resolve('babel-plugin-custom-import-path-transform'),
            {
                transformImportPath: path.resolve(__dirname, 'scripts/transformImportPath.js'),
            },
        ],
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./src'],
            },
        ],
        [require.resolve('babel-plugin-transform-imports')],
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};

module.exports = config;
