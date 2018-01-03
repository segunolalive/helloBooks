module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    './server/test/test',
    './node_modules/',
    'client/__tests__/__mocks__',
    'client/__tests__/setupTest.js',
  ],
  setupTestFrameworkScriptFile: './client/__tests__/setupTest.js',
  collectCoverageFrom: [
    'client/**/*.{js,jsx}',
    '!client/index.js',
    '!client/utils/expireSession.js',
    '!client/store/**',
    '!client/sw.js',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/client/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/client/__tests__/__mocks__/styleMock.js'
  },
};
