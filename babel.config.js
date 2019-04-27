module.exports = function(api) {
    const plugins = [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-proposal-export-namespace-from'),
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
    ];

    const presets = {
        lib: ['@babel/env', '@babel/react'],
        es: [
            [
                '@babel/env',
                {
                    modules: false,
                },
            ],
            '@babel/react',
        ],
        test: ['@babel/env', '@babel/react'],
    };

    return {
        plugins,
        presets: presets[api.env()],
        ignore: ['**/__tests__/'],
    };
};
