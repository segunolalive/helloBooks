module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    './server/test/test',
    './node_modules/',
    'client/__tests__/__mocks__'
  ],
  setupTestFrameworkScriptFile: './client/setupTest.js',
  collectCoverageFrom: [
    'client/**/*.{js,jsx}'
  ],
  moduleFileExtensions: ['js', 'jsx']
};
