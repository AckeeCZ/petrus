const { jestAliases } = require('./config/aliases');

module.exports = {
    testPathIgnorePatterns: ['node_modules', 'lib', 'es'],
    setupFilesAfterEnv: ['./configure-jest.js'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleNameMapper: jestAliases,
};
