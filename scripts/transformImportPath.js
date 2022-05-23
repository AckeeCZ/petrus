function replaceImportPath(originalPath) {
    switch (process.env.BABEL_ENV) {
        case 'lib':
            return originalPath.replace('/es/', '/lib/');
        default:
            return originalPath;
    }
}

module.exports = replaceImportPath;
