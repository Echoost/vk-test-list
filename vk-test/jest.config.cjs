require('@babel/register')({
    extensions: ['.js', '.ts', '.tsx', '.mjs'],
});

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"

    },
    transformIgnorePatterns: [
        '/node_modules/(?!@vkontakte)/',
    ],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@stores/(.*)$': '<rootDir>/src/stores/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
    },
};
