/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk')
const rimraf = require('rimraf')
const os = require('os')
const path = require('path')

const dir = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async () => {
  console.log(chalk.green('Teardown Puppeteer'))
  // eslint-disable-next-line no-underscore-dangle
  await global.__BROWSER_GLOBAL__.close()
  rimraf.sync(dir)
}