/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const dir = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async () => {
  console.log(chalk.green('Setup Puppeteer'));
  const browser = await puppeteer.launch({})
  // This global is not available inside tests but only in global teardown
  // eslint-disable-next-line no-underscore-dangle
  global.__BROWSER_GLOBAL__ = browser
  // Instead, we expose the connection details via file system to be used in tests
  console.log(chalk.green('Setup dir'));
  mkdirp.sync(dir)
  fs.writeFileSync(path.join(dir, 'wsEndpoint'), browser.wsEndpoint())
  console.log(chalk.green('Dir done'));
}
