const { webpackAliases } = require('./config/aliases');
const paths = require('./config/paths');

module.exports = {
    extensions: ['.js', '.jsx'],
    resolve: {
        alias: webpackAliases,
    },
};
