module.exports = {
  preset: 'jest-puppeteer',
  globalSetup: './jest/setup.js',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/puppeteer_environment.js',
};
