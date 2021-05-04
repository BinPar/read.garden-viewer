module.exports = {
  preset: 'jest-puppeteer',
  globalSetup: './jest/setup.js',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/puppeteer_environment.js',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
