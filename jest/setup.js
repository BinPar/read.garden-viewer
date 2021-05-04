// setup.js
const fs = require('fs');
const os = require('os');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const mkdirp = require('mkdirp');
// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async () => {
  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  // eslint-disable-next-line no-underscore-dangle
  global.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};