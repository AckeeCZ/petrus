const path = require('path');
const paths = require('./paths');

const appPathResolver = dir => path.resolve(paths.appSrc, dir);

const aliases = {
    Src: '',
    Config: 'config',
    Consts: 'constants',
    Modules: 'modules',
    Services: 'services',
};

const createAliasesForJest = () => {
    const resolvedAliases = {};

    for (const [alias, aliasPath] of Object.entries(aliases)) {
        resolvedAliases[`^${alias}(.*)$`] = `<rootDir>/src/${aliasPath}$1`;
    }

    return resolvedAliases;
};

const createAliasesForWebpack = () => {
    const resolvedAliases = {};

    for (const [alias, aliasPath] of Object.entries(aliases)) {
        resolvedAliases[alias] = appPathResolver(aliasPath);
    }

    return resolvedAliases;
};

const createAliasesForBabel = () => {
    const babelAliases = {};

    for (const [alias, aliasPath] of Object.entries(aliases)) {
        babelAliases[alias] = `./src/${aliasPath}`;
    }

    return babelAliases;
};

module.exports = {
    webpackAliases: createAliasesForWebpack(),
    jestAliases: createAliasesForJest(),
    babelAliases: createAliasesForBabel(),
};
