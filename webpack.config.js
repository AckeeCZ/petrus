const { webpackAliases } = require('./config/aliases');

module.exports = {
    extensions: ['.js', '.jsx'],
    resolve: {
        alias: webpackAliases,
    },
};
