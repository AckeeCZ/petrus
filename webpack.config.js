const { webpackAliases } = require('./config/aliases');
const paths = require('./config/paths');

module.exports = {
    modules: [paths.appSrc, 'node_modules'],
    extensions: ['.js', '.jsx'],
    resolve: {
        alias: webpackAliases,
    },
};
