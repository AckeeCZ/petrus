/**
 * @type {import('jest').Config}
 */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/*.test.ts'],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    testPathIgnorePatterns: ['codesandboxes'],
};

module.exports = config;
