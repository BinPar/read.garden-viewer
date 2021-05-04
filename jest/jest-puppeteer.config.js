const jestPuppeteerConf = {
  launch: {
    timeout: 30000,
    dumpio: true, // Whether to pipe the browser process stdout and stderr
  },
};

const isDebugMode =
  typeof v8debug === 'object' ||
  /--debug|--inspect/.test(process.execArgv.join(' '));

if (isDebugMode) {
  jestPuppeteerConf.launch.headless = false; // for debug:  to see what the browser is displaying
  jestPuppeteerConf.launch.slowMo = 250; // slow down by 250ms for each step
  jestPuppeteerConf.launch.devtools = true; // This lets you debug code in the application code browser
  jestPuppeteerConf.launch.args = ['--start-maximized']; // maximise the screen
}

module.exports = jestPuppeteerConf;
