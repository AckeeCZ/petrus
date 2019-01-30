module.exports = function(api) {
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
    ];

    const presets = {
        lib: ['@babel/preset-env', '@babel/preset-react'],
        es: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                },
            ],
            '@babel/preset-react',
        ],
    };

    return {
        plugins,
        presets: presets[api.env()],
    };
};
