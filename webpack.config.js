const path = require('path');

module.exports = {
    entry: {
        app: './src/tokenAuth.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ReduxTokenAuth',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread'),
                            'transform-runtime',
                        ],
                    }
                }
            }
        ],
    },
    plugins: [],
};