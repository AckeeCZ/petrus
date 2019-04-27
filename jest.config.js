module.exports = {
    testPathIgnorePatterns: ['/node_modules', '/lib', '/es'],
    setupTestFrameworkScriptFile: './configure-jest.js',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
